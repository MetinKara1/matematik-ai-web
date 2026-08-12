// API Base URL - environment variable'dan al veya default kullan
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.matematik-ai.com';

function clearExpiredSession() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('isAuthenticated');
  window.dispatchEvent(new CustomEvent('unauthorized'));

  if (window.location.pathname !== '/malcolmX/login') {
    window.location.replace('/malcolmX/login');
  }
}

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('authToken');
  const skipAuth = options.skipAuth || false;
  
  // Build full URL
  const fullUrl = `${API_BASE_URL}${endpoint}`;
  
  console.log('API Call:', {
    endpoint,
    fullUrl,
    hasToken: !!token,
    skipAuth,
    tokenPreview: token ? `${token.substring(0, 20)}...` : 'No token'
  });
  
  // Prepare headers
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && !skipAuth && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  
  const config = {
    method: options.method || 'GET',
    headers,
    mode: 'cors', // Explicitly set CORS mode
    credentials: 'omit', // Don't send cookies
    ...options,
  };
  
  // Remove skipAuth from config as it's not a fetch option
  delete config.skipAuth;
  
  // Remove body for GET requests
  if ((config.method === 'GET' || !config.method) && !options.body) {
    delete config.body;
  }
  
  console.log('API Call Config:', {
    url: fullUrl,
    method: config.method,
    headers: Object.keys(headers),
    hasAuth: !!(token && !skipAuth),
    mode: config.mode,
  });

  try {
    const response = await fetch(fullUrl, config);
    
    // Log response details for debugging CORS issues
    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      type: response.type,
      url: response.url,
      ok: response.ok,
      headers: {
        'content-type': response.headers.get('content-type'),
        'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
        'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
        'access-control-allow-headers': response.headers.get('access-control-allow-headers'),
      },
    });
    
    // Check for CORS issues (status 0 usually means CORS blocked)
    if (response.status === 0 || response.type === 'opaque') {
      const corsError = new Error(
        `CORS hatası tespit edildi! Backend (${API_BASE_URL}) CORS ayarlarını kontrol edin.\n\n` +
        `Response status: ${response.status}, type: ${response.type}\n` +
        `Frontend origin: ${window.location.origin}\n\n` +
        `Backend'de şu header'ların olması gerekiyor:\n` +
        `- Access-Control-Allow-Origin: ${window.location.origin} (veya *)\n` +
        `- Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\n` +
        `- Access-Control-Allow-Headers: Content-Type, Authorization, Accept\n` +
        `- Access-Control-Allow-Credentials: true (eğer cookie kullanılıyorsa)`
      );
      corsError.name = 'CORSError';
      corsError.isCorsError = true;
      throw corsError;
    }
    
    if (!response.ok) {
      // Try to parse error response
      let error;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          error = await response.json();
        } else {
          const text = await response.text();
          error = { message: text || `HTTP error! status: ${response.status}` };
        }
      } catch (parseError) {
        error = { message: `HTTP error! status: ${response.status}` };
      }
      
      const errorMessage = error.message || error.error || `HTTP error! status: ${response.status}`;
      
      // Log error details for debugging
      console.error('API Error Details:', {
        endpoint,
        fullUrl,
        status: response.status,
        statusText: response.statusText,
        error: errorMessage,
        errorObject: error,
        hasToken: !!token,
        skipAuth,
      });
      
      // Handle 401 Unauthorized
      if (response.status === 401) {
        clearExpiredSession();
        throw new Error(errorMessage || 'Yetkilendirme hatası. Lütfen tekrar giriş yapın.');
      }
      
      throw new Error(errorMessage);
    }
    
    // Check response content type before parsing
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // If not JSON, return text
      const text = await response.text();
      console.warn('Non-JSON response:', text);
      try {
        return JSON.parse(text);
      } catch {
        return { message: text || 'Beklenmeyen yanıt formatı' };
      }
    }
  } catch (error) {
    console.error('API Error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      isCorsError: error.isCorsError,
    });
    
    // Check if it's a CORS error
    if (error.name === 'TypeError' && (
      error.message.includes('fetch') || 
      error.message.includes('Failed to fetch') ||
      error.message.includes('NetworkError') ||
      error.message.includes('CORS') ||
      error.message.includes('network')
    )) {
      const corsError = new Error(
        `CORS/Ağ Hatası: Backend sunucusu (${API_BASE_URL}) ile iletişim kurulamıyor.\n\n` +
        `Lütfen backend CORS ayarlarını kontrol edin. Backend'de şu header'ların olması gerekiyor:\n` +
        `- Access-Control-Allow-Origin: ${window.location.origin} (veya *)\n` +
        `- Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\n` +
        `- Access-Control-Allow-Headers: Content-Type, Authorization, Accept\n` +
        `- Access-Control-Allow-Credentials: true (eğer cookie kullanılıyorsa)\n\n` +
        `Ayrıca OPTIONS (preflight) request'lerinin de handle edildiğinden emin olun.`
      );
      corsError.name = 'CORSError';
      corsError.isCorsError = true;
      throw corsError;
    }
    
    // Re-throw the error so components can handle it
    throw error;
  }
}

// Auth API
export const authAPI = {
  login: async (emailOrPhone, password) => {
    const response = await apiCall('/api/auth/login', {
      method: 'POST',
      skipAuth: true, // Don't send token for login
      body: JSON.stringify({
        EmailOrPhone: emailOrPhone,
        Password: password,
      }),
    });
    
    // Log full response for debugging
    console.log('Login Response:', response);
    
    // Check multiple possible token field names (AccessToken is the primary one)
    const token = response.AccessToken
      || response.accessToken
      || response.token 
      || response.data?.AccessToken
      || response.data?.accessToken
      || response.data?.token
      || response.access_token
      || response.Data?.Token
      || response.Data?.AccessToken;
    
    console.log('Extracted Token:', token ? 'Token found' : 'No token found');
    
    if (token) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('isAuthenticated', 'true');
      console.log('Token saved to localStorage');
      
      // Verify it was saved
      const savedToken = localStorage.getItem('authToken');
      console.log('Token verification - saved:', savedToken ? 'Yes' : 'No');
    } else {
      console.error('Login response did not contain a token. Full response:', response);
      console.error('Available keys in response:', Object.keys(response));
    }
    
    return response;
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
  },
  
  getCurrentUser: async () => {
    return apiCall('/api/auth/me');
  },
};

// Users API
export const usersAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiCall(`/api/admin/users${queryParams ? `?${queryParams}` : ''}`);
  },
  
  getById: async (id) => {
    return apiCall(`/api/admin/users/${id}`);
  },
  
  create: async (userData) => {
    return apiCall('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  update: async (id, userData) => {
    return apiCall(`/api/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
  
  delete: async (id) => {
    return apiCall(`/api/admin/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Subscribers API
export const subscribersAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiCall(`/api/admin/subscriptions${queryParams ? `?${queryParams}` : ''}`);
  },
  
  getById: async (id) => {
    return apiCall(`/api/admin/subscriptions/${id}`);
  },
  
  create: async (subscriberData) => {
    return apiCall('/api/admin/subscriptions', {
      method: 'POST',
      body: JSON.stringify(subscriberData),
    });
  },
  
  update: async (id, subscriberData) => {
    return apiCall(`/api/admin/subscriptions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(subscriberData),
    });
  },
  
  cancel: async (id) => {
    return apiCall(`/api/admin/subscriptions/${id}/cancel`, {
      method: 'POST',
    });
  },
};

// Solved Questions API
export const solvedQuestionsAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiCall(`/api/admin/solved-questions${queryParams ? `?${queryParams}` : ''}`);
  },
  
  getById: async (id) => {
    return apiCall(`/api/admin/solved-questions/${id}`);
  },
  
  // Public endpoint - no auth required
  getPublicById: async (id) => {
    return apiCall(`/api/questions/solved/${id}`, {
      skipAuth: true,
    });
  },
  
  getStatistics: async () => {
    return apiCall('/api/admin/solved-questions/statistics');
  },
  
  delete: async (id) => {
    return apiCall(`/api/admin/solved-questions/${id}`, {
      method: 'DELETE',
    });
  },
};

// Feedback API
export const feedbackAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiCall(`/api/admin/feedbacks${queryParams ? `?${queryParams}` : ''}`);
  },
  
  getById: async (id) => {
    return apiCall(`/api/admin/feedbacks/${id}`);
  },
  
  reply: async (id, replyData) => {
    return apiCall(`/api/admin/feedbacks/${id}/reply`, {
      method: 'POST',
      body: JSON.stringify(replyData),
    });
  },
  
  delete: async (id) => {
    return apiCall(`/api/admin/feedbacks/${id}`, {
      method: 'DELETE',
    });
  },
  
  markAsRead: async (id) => {
    return apiCall(`/api/admin/feedbacks/${id}/read`, {
      method: 'POST',
    });
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    return apiCall('/api/admin/dashboard/stats');
  },
  
  getWeeklyActivity: async () => {
    return apiCall('/api/admin/dashboard/weekly-activity');
  },
  
  getUserDistribution: async () => {
    return apiCall('/api/admin/dashboard/user-distribution');
  },
  
  getRecentActivity: async () => {
    return apiCall('/api/admin/dashboard/recent-activity');
  },
  
  checkVersion: async () => {
    return apiCall(`/api/admin/version-settings/ios`);
  },
};

export default {
  auth: authAPI,
  users: usersAPI,
  subscribers: subscribersAPI,
  solvedQuestions: solvedQuestionsAPI,
  feedback: feedbackAPI,
  dashboard: dashboardAPI,
};


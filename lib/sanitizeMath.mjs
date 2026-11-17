/**
 * Strict Input Sanitization & Privacy Protection for MatAI Math Solver
 * - Defends against XSS, script injection, HTML tags, and SQL injection patterns.
 * - Enforces Zero-PII (detects and blocks emails, phone numbers, credit card patterns, TC/SSN IDs).
 * - Normalizes unicode math characters to standard ASCII/LaTeX representation.
 * - Bounded input length to prevent denial of service or regex backtracking.
 */

const MAX_QUERY_LENGTH = 250;

// High-risk HTML / Script / Template injection patterns
const DANGEROUS_PATTERNS = [
  /<[^>]*>/i,                    // HTML tags
  /javascript:/i,               // URI schemes
  /data:/i,                     // Data URIs
  /vbscript:/i,
  /onload\s*=/i,
  /onerror\s*=/i,
  /onclick\s*=/i,
  /<script/i,
  /eval\s*\(/i,
  /document\./i,
  /window\./i,
  /__proto__/i,
  /constructor/i
];

// SQL injection patterns
const SQLI_PATTERNS = [
  /(\bselect\b|\binsert\b|\bupdate\b|\bdelete\b|\bdrop\b|\bunion\b|\balter\b)\s+[a-z0-9_*]/i,
  /--\s*$/,
  /;\s*drop\s+table/i,
  /'\s*or\s+'1'='1/i,
  /"\s*or\s+"1"="1/i
];

// PII Detection patterns (Zero-PII Compliance under GDPR, CCPA & KVKK)
const PII_PATTERNS = [
  { type: 'email', regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/ },
  { type: 'phone', regex: /(?:\+?90|0)?\s*[5][0-9]{2}[\s.-]*[0-9]{3}[\s.-]*[0-9]{2}[\s.-]*[0-9]{2}/ },
  { type: 'international_phone', regex: /\+(?:[0-9]\s?){9,14}[0-9]/ },
  { type: 'credit_card', regex: /\b(?:\d[ -]*?){13,16}\b/ },
  { type: 'tc_kimlik', regex: /\b[1-9][0-9]{10}\b/ }
];

export function sanitizeMathQuery(input) {
  if (typeof input !== 'string') {
    return { valid: false, sanitized: '', error: 'Geçersiz girdi türü.' };
  }

  const trimmed = input.trim();

  if (!trimmed) {
    return { valid: false, sanitized: '', error: 'Lütfen bir matematik sorusu veya formül yazın.' };
  }

  if (trimmed.length > MAX_QUERY_LENGTH) {
    return {
      valid: false,
      sanitized: trimmed.slice(0, MAX_QUERY_LENGTH),
      error: `Soru en fazla ${MAX_QUERY_LENGTH} karakter olabilir.`
    };
  }

  // Check for dangerous injection patterns
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        valid: false,
        sanitized: '',
        error: 'Güvenlik ihlali tespit edildi. Kod veya etiket girdisi kabul edilmez.'
      };
    }
  }

  // Check for SQL injection patterns
  for (const pattern of SQLI_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        valid: false,
        sanitized: '',
        error: 'Geçersiz karakter dizisi veya veritabanı komutu tespit edildi.'
      };
    }
  }

  // Check for PII (Zero-PII guarantee)
  for (const { type, regex } of PII_PATTERNS) {
    if (regex.test(trimmed)) {
      return {
        valid: false,
        sanitized: '',
        error: 'Kişisel veri (telefon, e-posta, kimlik veya kart no) girişi tespit edildi. KVKK ve GDPR gereği kişisel veri kabul edilmez.'
      };
    }
  }

  // Normalize Unicode characters to standard math symbols
  let normalized = trimmed
    .replace(/[−–—]/g, '-')
    .replace(/[×·]/g, '*')
    .replace(/÷/g, '/')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/√/g, '\\sqrt')
    .replace(/π/g, '\\pi')
    .replace(/θ/g, '\\theta')
    .replace(/∞/g, '\\infty')
    .replace(/\s+/g, ' ');

  // Allow list: only math characters, numbers, letters, LaTeX commands, and common math punctuation
  // Reject non-whitelisted characters like backticks, shell tokens, control chars
  const mathWhitelistRegex = /^[a-zA-Z0-9\s+\-*\/^=().,{}\\_\[\]!<>|:?]+$/;
  if (!mathWhitelistRegex.test(normalized)) {
    return {
      valid: false,
      sanitized: '',
      error: 'İfadede desteklenmeyen özel karakterler bulundu. Yalnızca matematiksel semboller ve harfler kullanın.'
    };
  }

  return {
    valid: true,
    sanitized: normalized
  };
}

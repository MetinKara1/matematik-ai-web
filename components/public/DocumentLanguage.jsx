'use client';

import { useEffect } from 'react';

export default function DocumentLanguage({ lang }) {
  useEffect(() => {
    const previousLang = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => { document.documentElement.lang = previousLang; };
  }, [lang]);
  return null;
}

'use client';

import { useEffect } from 'react';
import ErrorState from '../components/public/ErrorState';
import './globals.css';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <html lang="tr"><body><ErrorState status={500} reset={reset} /></body></html>;
}

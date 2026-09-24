'use client';

import { useEffect } from 'react';
import ErrorState from '../components/public/ErrorState';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorState status={500} reset={reset} />;
}

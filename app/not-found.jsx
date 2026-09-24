import ErrorState from '../components/public/ErrorState';

export const metadata = {
  title: 'Sayfa Bulunamadı',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <ErrorState status={404} />;
}

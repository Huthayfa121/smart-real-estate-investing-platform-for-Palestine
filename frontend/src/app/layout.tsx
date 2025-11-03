import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'منصة الاستثمار العقاري الذكية - فلسطين',
  description: 'Smart Real Estate Investment Platform for Palestine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: {
    default: 'dobbymin’s 개발 블로그',
    template: '%s | dobbymin',
  },
  description: '개발 경험을 기록합니다.',
  icons: {
    apple: '/logo.png',
    icon: '/logo.png',
    shortcut: '/logo.png',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='ko' className={pretendard.variable} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const saved = localStorage.getItem('dobbymin-color-theme'); const theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); document.documentElement.classList.toggle('dark', theme === 'dark'); } catch {} })()`,
          }}
        />
        {children}
      </body>
    </html>
  );
}

// src/app/layout.tsx
import localFont from 'next/font/local';
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: '../../fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={satoshi.variable}>
        {children}
      </body>
    </html>
  );
}

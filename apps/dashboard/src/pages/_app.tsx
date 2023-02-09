import '@styles/global.css';

import { Inter } from '@next/font/google';
import type { AppProps } from 'next/app';
import React from 'react';

const InterFont = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const GardentifyApp: React.FC<AppProps> = ({ Component, ...rest }) => {
  return (
    <main className={`${InterFont.variable} relative scroll-smooth font-sans antialiased`}>
      <Component {...rest.pageProps} />

      <style jsx global>{`
        :root {
          --font-sans: ${InterFont.style.fontFamily};
        }
      `}</style>
    </main>
  );
};

export default GardentifyApp;

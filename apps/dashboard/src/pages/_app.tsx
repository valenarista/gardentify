import '@styles/global.css';

import { ApolloProvider } from '@apollo/client';
import client from '@modules/apollo/apollo-client';
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
    <ApolloProvider client={client}>
      <main className={`${InterFont.variable} relative scroll-smooth font-sans antialiased`}>
        <Component {...rest.pageProps} />

        <style jsx global>{`
          :root {
            --font-sans: ${InterFont.style.fontFamily};
          }
        `}</style>
      </main>
    </ApolloProvider>
  );
};

export default GardentifyApp;

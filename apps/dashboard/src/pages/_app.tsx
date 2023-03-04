import '@styles/global.css';

import { ApolloProvider } from '@apollo/client';
import { ToastProvider, ToastsContainer } from '@gardentify/ui';
import { createApolloClient } from '@modules/apollo/apollo-client';
import AuthProvider from '@modules/auth/context/auth-context';
import ThemeProvider from '@modules/theme/context/theme-context';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import React from 'react';

export const InterFont = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const GardentifyApp: React.FC<AppProps> = ({ Component, ...rest }) => {
  const apolloClient = createApolloClient();
  return (
    <ApolloProvider client={apolloClient}>
      <ToastProvider>
        <ThemeProvider>
          <AuthProvider>
            <main className={`${InterFont.variable} relative scroll-smooth font-sans antialiased`}>
              <Component {...rest.pageProps} />
              <style jsx global>{`
                :root {
                  --font-sans: ${InterFont.style.fontFamily};
                }
              `}</style>
            </main>
            <ToastsContainer />
          </AuthProvider>
        </ThemeProvider>
      </ToastProvider>
    </ApolloProvider>
  );
};

export default GardentifyApp;

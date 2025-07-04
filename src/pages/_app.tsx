import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/context/ThemeContext';
import { LearningProvider } from '@/store/LearningContext';
import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // Add font class to body
  useEffect(() => {
    document.body.classList.add('font-sans');
    
    // Remove server-side injected CSS for Material-UI
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider>
      <LearningProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LearningProvider>
    </ThemeProvider>
  );
}

export default MyApp;

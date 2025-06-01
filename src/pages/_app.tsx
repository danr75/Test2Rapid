import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout/Layout';
import { LearningProvider } from '@/store/LearningContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LearningProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LearningProvider>
  );
}

export default MyApp;

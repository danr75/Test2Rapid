import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to learning-coach page
    router.replace('/learning-coach');
  }, [router]);

  // Return null since this page will redirect
  return null;
};

export default HomePage;

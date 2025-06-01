import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isHomePage = router.pathname === '/' || router.pathname === '/index';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {!isHomePage && (
            <h1 className="text-xl font-bold">Interactive Learning Hub</h1>
          )}
          {/* Future navigation items can be added here */}
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-100 p-4 text-center text-gray-600 text-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Interactive Learning Hub</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

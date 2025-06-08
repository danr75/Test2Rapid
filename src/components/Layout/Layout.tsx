import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header removed to prevent duplication with the new Header component */}
      
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

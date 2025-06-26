import React from 'react';
import Navigation, { NavigationTab } from './Navigation';

interface HeaderProps {
  activeTab: NavigationTab;
}

const Header: React.FC<HeaderProps> = React.memo(({ activeTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* App Header */}
      <div className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">AI skills builder</h1>
            <p className="text-sm text-blue-200">Personal learning hub</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="font-medium">John Director</p>
              <p className="text-xs text-blue-200">Chief Digital Officer</p>
            </div>
            <div 
              className="h-10 w-10 bg-blue-700 rounded-full flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-lg font-semibold">JD</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <Navigation activeTab={activeTab} />
    </header>
  );
});

Header.displayName = 'Header';

export default Header;

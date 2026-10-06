import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppShell({ children }) {
  const location = useLocation();

  const lightThemeRoutes = [
    '/incidents',
    '/identity-risk',
    '/network-topology',
    '/simulation-lab',
    '/analytics',
    '/ai-analyst',
    '/reports',
    '/system-health',
    '/settings'
  ];

  const isLightTheme = lightThemeRoutes.some(path =>
    location.pathname === path || (path !== '/overview' && location.pathname.startsWith(path))
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#07111D] text-[#F5F7FA]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar isLightTheme={isLightTheme} />
        <main
          className={`flex-1 overflow-y-auto overflow-x-hidden transition-colors ${
            isLightTheme ? 'bg-[#F5F8FC] text-[#152033]' : 'bg-[#07111D] text-[#F5F7FA]'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

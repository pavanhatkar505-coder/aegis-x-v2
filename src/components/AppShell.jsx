import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppShell({ children, onOpenDecisionLayer }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#070e1a] text-[#F5F7FA] font-sans antialiased">
      {/* Fixed Left Sidebar */}
      <Sidebar onOpenDecisionLayer={onOpenDecisionLayer} />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Full-width TopBar */}
        <TopBar isLightTheme={false} />

        {/* Scrollable Main Area filling full width and height */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#070e1a] text-[#F5F7FA] w-full">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main layout container */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Subtle footer */}
        <footer className="py-4 px-6 border-t border-slate-200/60 text-center text-xs text-slate-400">
          DocuMind — 2-Week Academic Document Intelligence Project &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;

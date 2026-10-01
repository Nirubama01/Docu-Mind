import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Files,
  UploadCloud,
  MessageSquareCode,
  GitCompare,
  Settings,
  LogOut,
  Brain,
  HardDrive,
  X,
} from 'lucide-react';
import { useDocuments } from '../../context/DocumentContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { logout, stats } = useDocuments();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Documents', path: '/documents', icon: Files },
    { label: 'Upload', path: '/upload', icon: UploadCloud },
    { label: 'Ask AI', path: '/ask-ai', icon: MessageSquareCode, badge: 'RAG' },
    { label: 'Compare', path: '/compare', icon: GitCompare },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                DocuMind
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  AI
                </span>
              </span>
            </div>
          </NavLink>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
          <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Main Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => {
                  if (onClose) onClose();
                }}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Storage / System Status Widget */}
        <div className="px-4 py-3 mx-3 mb-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-400">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <HardDrive className="w-3.5 h-3.5 text-brand-400" />
              Document Storage
            </span>
            <span className="font-semibold text-slate-200">
              {stats.storageUsed || '42.8 MB'}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="w-[18%] h-full bg-brand-500 rounded-full" />
          </div>
          <p className="mt-1 text-[10px] text-slate-400">12 of 100 documents used</p>
        </div>

        {/* Footer Logout */}
        <div className="p-3 border-t border-slate-800">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

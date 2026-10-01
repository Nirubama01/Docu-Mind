import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Upload,
  User,
  LogOut,
  Settings,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useDocuments } from '../../context/DocumentContext';
import Button from '../common/Button';

export const Navbar = ({ onOpenSidebar }) => {
  const { user, logout, documents } = useDocuments();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/documents?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'Invoice.pdf processed',
      time: '10 mins ago',
      desc: '15 entities extracted with 98.5% confidence',
    },
    {
      id: 2,
      title: 'Contract_Agreement.pdf',
      time: '1 hour ago',
      desc: 'Text chunking and vector index created',
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile hamburger & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents, invoices, certificates... (Ctrl + K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs md:text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 placeholder:text-slate-400"
          />
        </form>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Academic Project Tag */}
        <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-brand-700 bg-brand-50 rounded-full border border-brand-200">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          Academic Prototype v1.0
        </span>

        {/* Quick Upload CTA */}
        <Link to="/upload">
          <Button
            variant="primary"
            size="sm"
            icon={Upload}
            className="hidden sm:inline-flex"
          >
            Upload
          </Button>
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-slate-500">
                  Notifications
                </span>
                <span className="text-[11px] text-brand-600 font-medium cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                    <p className="text-xs font-medium text-slate-800">{n.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
            />
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight">
                {user?.name || 'Arun Kumar'}
              </p>
              <p className="text-[10px] text-slate-500 leading-tight">
                {user?.role || 'Project Lead'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-800">{user?.name || 'Arun Kumar'}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || 'arun.kumar@documind.ai'}</p>
              </div>
              <Link
                to="/settings"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                Account Settings
              </Link>
              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(false);
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, MessageCircle, Leaf, Menu, X, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { label: 'Log Habit', path: '/log', icon: <PlusCircle size={20} /> },
    { label: 'Community', path: '/community', icon: <MessageCircle size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-emerald-900 text-white fixed h-full z-10">
        <div className="p-6 flex items-center gap-2 border-b border-emerald-800">
          <Leaf className="text-emerald-400" size={28} />
          <h1 className="text-xl font-bold tracking-tight">GreenConnect</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-emerald-800">
           <div className="flex items-center gap-3 px-4 py-3 text-emerald-200">
              <Settings size={20} />
              <span>Settings</span>
           </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-emerald-900 text-white z-20 flex justify-between items-center p-4 shadow-md">
        <div className="flex items-center gap-2">
          <Leaf className="text-emerald-400" size={24} />
          <span className="font-bold text-lg">GreenConnect</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-900/50 z-10 pt-16" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white p-4 space-y-2 shadow-xl border-t border-slate-200">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive(item.path) ? 'bg-emerald-100 text-emerald-900' : 'text-slate-600'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
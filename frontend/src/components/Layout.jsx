import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, BookOpen, Mic2, User, Sparkles } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home', color: 'blue' },
    { path: '/live-conversation', icon: MessageCircle, label: 'Live Chat', color: 'blue' },
    { path: '/guided-lesson', icon: BookOpen, label: 'Lessons', color: 'amber' },
    { path: '/pronunciation-coach', icon: Mic2, label: 'Pronunciation', color: 'purple' },
    { path: '/profile', icon: User, label: 'Profile', color: 'green' },
  ];

  const isActive = (path) => location.pathname === path;

  const getColorClasses = (color, active) => {
    if (active) {
      const colors = {
        blue: 'bg-blue-500/20 text-blue-600 border-blue-500/50 shadow-lg shadow-blue-500/20',
        amber: 'bg-amber-500/20 text-amber-600 border-amber-500/50 shadow-lg shadow-amber-500/20',
        purple: 'bg-purple-500/20 text-purple-600 border-purple-500/50 shadow-lg shadow-purple-500/20',
        green: 'bg-green-500/20 text-green-600 border-green-500/50 shadow-lg shadow-green-500/20',
      };
      return colors[color];
    }
    return 'text-slate-600 hover:bg-slate-100 hover:text-slate-900';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modern Sidebar with Glass Effect */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200 p-6 shadow-xl">
        {/* Brand Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center shadow-lg">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                EngMate
              </h1>
            </div>
          </div>
          <p className="font-body text-sm text-slate-500 ml-15">Your AI English Buddy</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 border ${
                  getColorClasses(item.color, active)
                } ${active ? 'border-2' : 'border-transparent'}`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-body font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Card - Pro Tip */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-xl">
            <div className="flex items-start gap-3 mb-3">
              <Sparkles className="h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-heading font-semibold text-sm mb-1">Pro Tip!</h3>
                <p className="font-body text-xs text-blue-100 leading-relaxed">
                  Practice 15 minutes daily for best results
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content with better spacing */}
      <main className="ml-72 p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-amber-50/30 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

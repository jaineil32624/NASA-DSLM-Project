
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeToggle';
import { useMusicVisibility } from '../../hooks/useMusicVisibility';
import { useAgentVisibility } from '../../hooks/useAgentVisibility';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: 'ri-home-4-line' },
  { path: '/gallery', label: 'Gallery', icon: 'ri-gallery-line' },
  { path: '/hunch', label: 'HUNCH', icon: 'ri-rocket-line' },
  { path: '/videos', label: 'Videos', icon: 'ri-video-line' },
  { path: '/upload', label: 'Upload', icon: 'ri-upload-cloud-line' },
  { path: '/resources', label: 'Resources', icon: 'ri-book-open-line' },
  { path: '/about', label: 'About', icon: 'ri-information-line' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NavItem[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { hide: hideMusic, show: showMusic } = useMusicVisibility();
  const { hide: hideAgent, show: showAgent } = useAgentVisibility();

  const isActive = (path: string) => location.pathname === path;

  // Hide music and AI when menu opens, show when closes
  useEffect(() => {
    if (isOpen) {
      hideMusic();
      hideAgent();
    } else {
      showMusic();
      showAgent();
    }
  }, [isOpen, hideMusic, showMusic, hideAgent, showAgent]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  // Focus search input when menu opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Filter nav items based on search
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = navItems.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(searchResults[0].path);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const displayItems = searchQuery.trim() ? searchResults : navItems;

  return (
    <>
      {/* Mobile Menu Button - Fixed top right, always visible on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden fixed top-3 right-3 z-[10000] w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-lg active:scale-90 ${
          isOpen
            ? 'bg-teal-500 border-teal-400 text-white shadow-teal-500/40'
            : theme === 'light'
              ? 'bg-white/95 border-slate-200 text-slate-700 shadow-slate-200/50'
              : 'bg-slate-900/95 border-slate-700 text-white shadow-black/30'
        }`}
        style={{ minWidth: '48px', minHeight: '48px', touchAction: 'manipulation' }}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <i className={`${isOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
      </button>

      {/* Full Screen Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[9999]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Menu Panel - Slide from right */}
          <div 
            className={`absolute top-0 right-0 w-[85%] max-w-xs h-full shadow-2xl animate-slideIn overflow-hidden flex flex-col ${
              theme === 'light' 
                ? 'bg-white' 
                : 'bg-slate-900'
            }`}
          >
            {/* Header */}
            <div className={`px-5 pt-20 pb-4 ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-900/80'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <i className="ri-rocket-2-fill text-2xl text-teal-400"></i>
                  <span className={`text-lg font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>NASA DSLM</span>
                </div>
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                    theme === 'light'
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? (
                    <i className="ri-sun-line text-lg"></i>
                  ) : (
                    <i className="ri-moon-line text-lg"></i>
                  )}
                </button>
              </div>
              
              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Quick search..."
                  className={`w-full h-11 pl-10 pr-10 rounded-lg border text-sm transition-all ${
                    theme === 'light'
                      ? 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20'
                      : 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20'
                  }`}
                  style={{ fontSize: '16px', touchAction: 'manipulation' }}
                />
                <i className={`ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-lg ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}></i>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <i className="ri-close-circle-fill"></i>
                  </button>
                )}
              </form>
              
              {searchQuery && (
                <p className={`mt-2 text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                  {searchResults.length > 0 
                    ? `${searchResults.length} found`
                    : 'No results'
                  }
                </p>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
              <div className="space-y-1">
                {displayItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium transition-all active:scale-98 ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md shadow-teal-500/30'
                        : theme === 'light'
                          ? 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
                          : 'text-slate-300 hover:bg-slate-800 active:bg-slate-700'
                    }`}
                    style={{ touchAction: 'manipulation', minHeight: '48px' }}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                      isActive(item.path) 
                        ? 'bg-white/20' 
                        : theme === 'light' ? 'bg-slate-100' : 'bg-slate-800'
                    }`}>
                      <i className={`${item.icon} text-lg ${isActive(item.path) ? 'text-white' : 'text-teal-400'}`}></i>
                    </div>
                    <span className="flex-1">{item.label}</span>
                    {isActive(item.path) && (
                      <i className="ri-check-line text-white"></i>
                    )}
                  </Link>
                ))}
              </div>

              {/* Admin Button */}
              <div className={`mt-4 pt-4 border-t ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}>
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                    theme === 'light'
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  style={{ touchAction: 'manipulation', minHeight: '48px' }}
                >
                  <i className="ri-shield-user-line text-lg"></i>
                  Admin
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className={`px-4 py-3 border-t ${theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-slate-900/50'}`}>
              <p className={`text-xs text-center ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>
                Tap outside to close
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Inline CSS for animations */}
      <style>{`
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateX(100%); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.25s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}

import { Link } from 'react-router-dom';
import StarField from '../../components/base/StarField';
import ThemeToggle, { useTheme } from '../../components/feature/ThemeToggle';

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'light' ? 'bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100' : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'}`}>
      {/* Star Field Animation */}
      <StarField />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-slate-950/80 border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <i className="ri-rocket-2-line text-2xl sm:text-3xl text-teal-400 group-hover:animate-bounce"></i>
                <div className="absolute inset-0 bg-teal-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className={`text-lg sm:text-xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>NASA DSLM</span>
            </div>
            
            {/* Spacer for mobile hamburger menu (handled globally) */}
            <div className="lg:hidden w-14 h-14"></div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link to="/" className={`text-sm ${theme === 'light' ? 'text-teal-600' : 'text-white'} transition-colors whitespace-nowrap`}>Home</Link>
              <Link to="/gallery" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>Gallery</Link>
              <Link to="/hunch" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>HUNCH Projects</Link>
              <Link to="/videos" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>Space Videos</Link>
              <Link to="/upload" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>Upload</Link>
              <Link to="/resources" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>Resources</Link>
              <Link to="/about" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>About</Link>
              <ThemeToggle />
              <Link to="/admin" className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg shadow-teal-500/20 whitespace-nowrap">Admin</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 z-10 min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://readdy.ai/api/search-image?query=deep%20space%20nebula%20with%20stars%20and%20cosmic%20dust%20clouds%20in%20dark%20blue%20and%20teal%20tones%20creating%20an%20ethereal%20atmosphere%20perfect%20for%20a%20space%20exploration%20website%20background%20with%20distant%20galaxies%20and%20stellar%20formations%20visible%20throughout%20the%20cosmic%20landscape%20high%20quality%20cinematic&width=1920&height=1080&seq=hero-bg-002&orientation=landscape"
            alt="Space Background"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-b from-sky-100/90 via-sky-50/80 to-sky-100' : 'bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950'}`}></div>
        </div>

        {/* Animated Nebula Overlays */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 -left-1/4 w-[800px] h-[800px] ${theme === 'light' ? 'bg-teal-300/20' : 'bg-teal-500/10'} rounded-full blur-[150px] animate-pulse`}></div>
          <div className={`absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] ${theme === 'light' ? 'bg-cyan-300/20' : 'bg-cyan-500/10'} rounded-full blur-[120px] animate-pulse`} style={{ animationDelay: '1s' }}></div>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ${theme === 'light' ? 'bg-emerald-300/10' : 'bg-emerald-500/5'} rounded-full blur-[100px] animate-pulse`} style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center w-full">
          <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full text-teal-400 text-sm mb-8 ${theme === 'light' ? 'bg-teal-500/10 border-teal-500/30' : 'bg-teal-500/10 border-teal-500/30'}`}>
            <i className="ri-rocket-line animate-pulse"></i>
            <span>Explore the Universe in 3D</span>
          </div>
          <h1 className={`text-5xl sm:text-7xl font-bold mb-6 leading-tight ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>
            NASA DSLM<br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">3D Modeling</span>
          </h1>
          <p className={`text-lg sm:text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
            Explore and contribute to our collection of space-related 3D models. Upload your creations and discover innovative designs from the community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link 
              to="/upload" 
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-lg font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all hover:scale-105 whitespace-nowrap shadow-2xl shadow-teal-500/30 flex items-center justify-center gap-2"
            >
              <i className="ri-upload-cloud-line"></i>
              Upload Model
            </Link>
            <Link 
              to="/gallery" 
              className={`w-full sm:w-auto px-8 py-4 backdrop-blur-sm border text-lg font-semibold rounded-xl transition-all hover:scale-105 whitespace-nowrap flex items-center justify-center gap-2 ${theme === 'light' ? 'bg-white/80 border-slate-300 text-slate-800 hover:bg-white' : 'bg-slate-800/80 border-slate-700 text-white hover:bg-slate-700'}`}
            >
              <i className="ri-gallery-line"></i>
              View Gallery
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
            <i className={`ri-arrow-down-line text-2xl ${theme === 'light' ? 'text-slate-400' : 'text-slate-400'}`}></i>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-wider">Features</span>
            <h2 className={`text-4xl font-bold mt-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Platform Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`backdrop-blur-xl border rounded-2xl p-8 hover:border-teal-500/50 transition-all group shadow-xl ${theme === 'light' ? 'bg-white/60 border-slate-200' : 'bg-slate-900/60 border-slate-700/50 shadow-black/10'}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i className="ri-upload-cloud-line text-3xl text-teal-400"></i>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Easy Upload</h3>
              <p className={theme === 'light' ? 'text-slate-600 leading-relaxed' : 'text-slate-400 leading-relaxed'}>Upload your 3D models with images, names, and descriptions. Share your space-related creations with the community.</p>
            </div>
            
            <div className={`backdrop-blur-xl border rounded-2xl p-8 hover:border-teal-500/50 transition-all group shadow-xl ${theme === 'light' ? 'bg-white/60 border-slate-200' : 'bg-slate-900/60 border-slate-700/50 shadow-black/10'}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i className="ri-gallery-line text-3xl text-teal-400"></i>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Model Gallery</h3>
              <p className={theme === 'light' ? 'text-slate-600 leading-relaxed' : 'text-slate-400 leading-relaxed'}>Browse through an extensive collection of 3D models. View detailed information and images for each model.</p>
            </div>
            
            <div className={`backdrop-blur-xl border rounded-2xl p-8 hover:border-teal-500/50 transition-all group shadow-xl ${theme === 'light' ? 'bg-white/60 border-slate-200' : 'bg-slate-900/60 border-slate-700/50 shadow-black/10'}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i className="ri-shield-check-line text-3xl text-teal-400"></i>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Admin Control</h3>
              <p className={theme === 'light' ? 'text-slate-600 leading-relaxed' : 'text-slate-400 leading-relaxed'}>Secure admin authentication with full control over model management and deletion capabilities.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className={`backdrop-blur-xl border rounded-3xl p-12 shadow-2xl ${theme === 'light' ? 'bg-white/60 border-slate-200' : 'bg-slate-900/60 border-slate-700/50 shadow-black/20'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">500+</div>
                <div className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>3D Models</div>
              </div>
              <div className="group">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">1,200+</div>
                <div className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>Contributors</div>
              </div>
              <div className="group">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">50+</div>
                <div className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>Categories</div>
              </div>
              <div className="group">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">24/7</div>
                <div className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>Availability</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-3xl rounded-full"></div>
            <div className={`relative backdrop-blur-xl border rounded-3xl p-12 shadow-2xl ${theme === 'light' ? 'bg-white/60 border-slate-200' : 'bg-slate-900/60 border-slate-700/50 shadow-black/20'}`}>
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Ready to Share Your Models?</h2>
              <p className={`text-xl mb-8 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                Join our community of space enthusiasts and contribute to the NASA DSLM 3D modeling project.
              </p>
              <Link 
                to="/upload" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-lg font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all hover:scale-105 whitespace-nowrap shadow-2xl shadow-teal-500/30"
              >
                <i className="ri-rocket-line"></i>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`backdrop-blur-md border-t py-12 px-6 relative z-10 ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-slate-950/80 border-slate-800'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <i className="ri-rocket-2-line text-2xl text-teal-400"></i>
                <span className={`text-lg font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>NASA DSLM</span>
              </div>
              <p className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Advancing space exploration through 3D modeling innovation.</p>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Platform</h4>
              <div className="space-y-2">
                <Link to="/gallery" className={`block text-sm hover:text-teal-400 transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Gallery</Link>
                <Link to="/upload" className={`block text-sm hover:text-teal-400 transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Upload</Link>
                <Link to="/about" className={`block text-sm hover:text-teal-400 transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>About</Link>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Resources</h4>
              <div className="space-y-2">
                <a href="#" className={`block text-sm hover:text-teal-400 transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Documentation</a>
                <a href="#" className={`block text-sm hover:text-teal-400 transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Guidelines</a>
                <a href="#" className={`block text-sm hover:text-teal-400 transition-colors ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Support</a>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Connect</h4>
              <div className="flex gap-4 mb-4">
                <a href="#" className={`w-10 h-10 rounded-lg flex items-center justify-center hover:text-teal-400 transition-all ${theme === 'light' ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'}`}>
                  <i className="ri-twitter-x-line"></i>
                </a>
                <a href="#" className={`w-10 h-10 rounded-lg flex items-center justify-center hover:text-teal-400 transition-all ${theme === 'light' ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'}`}>
                  <i className="ri-github-line"></i>
                </a>
                <a href="#" className={`w-10 h-10 rounded-lg flex items-center justify-center hover:text-teal-400 transition-all ${theme === 'light' ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'}`}>
                  <i className="ri-linkedin-line"></i>
                </a>
              </div>
              <a href="mailto:jaineil32624@gmail.com" className={`text-sm hover:text-teal-400 transition-colors flex items-center gap-2 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                <i className="ri-mail-line"></i>
                jaineil32624@gmail.com
              </a>
            </div>
          </div>
          <div className={`pt-8 border-t text-center text-sm ${theme === 'light' ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-400'}`}>
            <p>© 2024 NASA DSLM 3D Modeling Project. All rights reserved. <a href="https://readdy.ai/?ref=logo" className="hover:text-teal-400 transition-colors">Powered by Readdy</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

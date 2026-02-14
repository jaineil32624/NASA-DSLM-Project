import { Link } from 'react-router-dom';
import StarField from '../../components/base/StarField';
import ThemeToggle, { useTheme } from '../../components/feature/ThemeToggle';

export default function About() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen relative ${
        theme === 'light'
          ? 'bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100'
          : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
      }`}
    >
      {/* Star Field Animation */}
      <StarField />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${
          theme === 'light'
            ? 'bg-white/80 border-slate-200'
            : 'bg-slate-950/80 border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <i className="ri-rocket-2-line text-2xl sm:text-3xl text-teal-400"></i>
              <span
                className={`text-lg sm:text-xl font-bold ${
                  theme === 'light' ? 'text-slate-800' : 'text-white'
                }`}
              >
                NASA DSLM
              </span>
            </Link>

            {/* Spacer for mobile hamburger menu (handled globally) */}
            <div className="lg:hidden w-14 h-14"></div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm ${
                  theme === 'light'
                    ? 'text-slate-600 hover:text-teal-600'
                    : 'text-slate-300 hover:text-teal-400'
                } transition-colors whitespace-nowrap`}
              >
                Home
              </Link>
              <Link
                to="/gallery"
                className={`text-sm ${
                  theme === 'light'
                    ? 'text-slate-600 hover:text-teal-600'
                    : 'text-slate-300 hover:text-teal-400'
                } transition-colors whitespace-nowrap`}
              >
                Gallery
              </Link>
              <Link
                to="/hunch"
                className={`text-sm ${
                  theme === 'light'
                    ? 'text-slate-600 hover:text-teal-600'
                    : 'text-slate-300 hover:text-teal-400'
                } transition-colors whitespace-nowrap`}
              >
                HUNCH Projects
              </Link>
              <Link
                to="/videos"
                className={`text-sm ${
                  theme === 'light'
                    ? 'text-slate-600 hover:text-teal-600'
                    : 'text-slate-300 hover:text-teal-400'
                } transition-colors whitespace-nowrap`}
              >
                Space Videos
              </Link>
              <Link
                to="/upload"
                className={`text-sm ${
                  theme === 'light'
                    ? 'text-slate-600 hover:text-teal-600'
                    : 'text-slate-300 hover:text-teal-400'
                } transition-colors whitespace-nowrap`}
              >
                Upload
              </Link>
              <Link
                to="/resources"
                className={`text-sm ${
                  theme === 'light'
                    ? 'text-slate-600 hover:text-teal-600'
                    : 'text-slate-300 hover:text-teal-400'
                } transition-colors whitespace-nowrap`}
              >
                Resources
              </Link>
              <Link
                to="/about"
                className="text-sm text-teal-400 transition-colors whitespace-nowrap"
              >
                About
              </Link>
              <ThemeToggle />
              <Link
                to="/admin"
                className="px-4 py-2 bg-teal-500 text-white text-sm rounded-lg hover:bg-teal-600 transition-colors whitespace-nowrap"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* About Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1
              className={`text-4xl sm:text-5xl font-bold mb-4 ${
                theme === 'light' ? 'text-slate-800' : 'text-white'
              }`}
            >
              About NASA DSLM
            </h1>
            <p
              className={`text-lg ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              Advancing space exploration through 3D modeling innovation
            </p>
          </div>

          <div className="space-y-12">
            {/* Mission Section */}
            <div
              className={`backdrop-blur-sm border rounded-xl p-6 sm:p-8 ${
                theme === 'light'
                  ? 'bg-white/50 border-slate-200'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-rocket-line text-3xl text-teal-400"></i>
                </div>
                <div>
                  <h2
                    className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-slate-800' : 'text-white'
                    }`}
                  >
                    Our Mission
                  </h2>
                  <p
                    className={`leading-relaxed ${
                      theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    The NASA DSLM (Deep Space Logistics Modeling) project is
                    dedicated to creating and sharing high-quality 3D models for
                    space exploration missions. Our platform enables researchers,
                    engineers, and space enthusiasts to collaborate on modeling
                    spacecraft, habitats, equipment, and other space-related
                    assets.
                  </p>
                </div>
              </div>
            </div>

            {/* Technology Section */}
            <div
              className={`backdrop-blur-sm border rounded-xl p-6 sm:p-8 ${
                theme === 'light'
                  ? 'bg-white/50 border-slate-200'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-cpu-line text-3xl text-teal-400"></i>
                </div>
                <div>
                  <h2
                    className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-slate-800' : 'text-white'
                    }`}
                  >
                    Technology Stack
                  </h2>
                  <p
                    className={`leading-relaxed mb-4 ${
                      theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    Our platform is built with cutting‑edge web technologies to
                    ensure a seamless experience for all users. We utilize modern
                    frameworks and secure database solutions to handle model
                    uploads, storage, and management efficiently.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      <i className="ri-checkbox-circle-line text-teal-400"></i>
                      <span>Secure Authentication</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      <i className="ri-checkbox-circle-line text-teal-400"></i>
                      <span>Real-time Database</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      <i className="ri-checkbox-circle-line text-teal-400"></i>
                      <span>Image Preview</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      <i className="ri-checkbox-circle-line text-teal-400"></i>
                      <span>Admin Controls</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div
              className={`backdrop-blur-sm border rounded-xl p-6 sm:p-8 ${
                theme === 'light'
                  ? 'bg-white/50 border-slate-200'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-star-line text-3xl text-teal-400"></i>
                </div>
                <div>
                  <h2
                    className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-slate-800' : 'text-white'
                    }`}
                  >
                    Key Features
                  </h2>
                  <ul
                    className={`space-y-3 ${
                      theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    <li className="flex items-start gap-3">
                      <i className="ri-arrow-right-s-line text-teal-400 mt-1"></i>
                      <span>
                        <strong
                          className={
                            theme === 'light' ? 'text-slate-800' : 'text-white'
                          }
                        >
                          Easy Upload:
                        </strong>{' '}
                        Simple form interface for uploading models with images,
                        names, and descriptions
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="ri-arrow-right-s-line text-teal-400 mt-1"></i>
                      <span>
                        <strong
                          className={
                            theme === 'light' ? 'text-slate-800' : 'text-white'
                          }
                        >
                          Image Preview:
                        </strong>{' '}
                        Real-time preview of uploaded images before submission
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="ri-arrow-right-s-line text-teal-400 mt-1"></i>
                      <span>
                        <strong
                          className={
                            theme === 'light' ? 'text-slate-800' : 'text-white'
                          }
                        >
                          Validation:
                        </strong>{' '}
                        Comprehensive form validation to ensure data quality
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="ri-arrow-right-s-line text-teal-400 mt-1"></i>
                      <span>
                        <strong
                          className={
                            theme === 'light' ? 'text-slate-800' : 'text-white'
                          }
                        >
                          Admin Authentication:
                        </strong>{' '}
                        Secure login system for authorized administrators
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="ri-arrow-right-s-line text-teal-400 mt-1"></i>
                      <span>
                        <strong
                          className={
                            theme === 'light' ? 'text-slate-800' : 'text-white'
                          }
                        >
                          Confirmation Dialogs:
                        </strong>{' '}
                        Safety measures before deleting any model
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div
              className={`backdrop-blur-sm border rounded-xl p-6 sm:p-8 ${
                theme === 'light'
                  ? 'bg-white/50 border-slate-200'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line text-3xl text-teal-400"></i>
                </div>
                <div>
                  <h2
                    className={`text-2xl font-bold mb-4 ${
                      theme === 'light' ? 'text-slate-800' : 'text-white'
                    }`}
                  >
                    Get Involved
                  </h2>
                  <p
                    className={`leading-relaxed mb-4 ${
                      theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    We welcome contributions from the space community. Whether
                    you are a professional engineer, student, or enthusiast,
                    your 3D models can help advance space exploration research
                    and education.
                  </p>
                  <p
                    className={`text-sm mb-6 ${
                      theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Contact us at:{' '}
                    <a
                      href="mailto:jaineil32624@gmail.com"
                      className="text-teal-400 hover:text-teal-500 transition-colors"
                    >
                      jaineil32624@gmail.com
                    </a>
                  </p>
                  <Link
                    to="/upload"
                    className="inline-block px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors whitespace-nowrap"
                  >
                    Start Contributing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

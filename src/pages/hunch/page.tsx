import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarField from '../../components/base/StarField';
import Slideshow from '../../components/feature/Slideshow';
import Presentation from '../../components/feature/Presentation';
import ThemeToggle, { useTheme } from '../../components/feature/ThemeToggle';
import { useMusicVisibility } from '../../hooks/useMusicVisibility';
import { useAgentVisibility } from '../../hooks/useAgentVisibility';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  school: string;
  year: string;
  status: 'completed' | 'in-progress' | 'flight-ready';
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
}

export default function HunchProjects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);
  const { theme } = useTheme();
  const { hide: hideMusic, show: showMusic } = useMusicVisibility();
  const { hide: hideAgent, show: showAgent } = useAgentVisibility();

  const categories: Category[] = [
    { id: 'all', name: 'All Projects', icon: 'ri-apps-line', color: 'text-white', bgColor: 'bg-slate-600', description: 'View all HUNCH projects' },
    { id: 'design', name: 'Design & Prototyping', icon: 'ri-pencil-ruler-line', color: 'text-teal-400', bgColor: 'bg-teal-500/20', description: 'CAD designs and 3D prototypes' },
    { id: 'hardware', name: 'Hardware', icon: 'ri-tools-line', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20', description: 'Flight-ready hardware manufacturing' },
    { id: 'softgoods', name: 'Softgoods', icon: 'ri-t-shirt-line', color: 'text-purple-400', bgColor: 'bg-purple-500/20', description: 'Textiles and fabric projects' },
    { id: 'culinary', name: 'Culinary', icon: 'ri-restaurant-line', color: 'text-orange-400', bgColor: 'bg-orange-500/20', description: 'Space food development' },
    { id: 'video', name: 'Video & Media', icon: 'ri-film-line', color: 'text-pink-400', bgColor: 'bg-pink-500/20', description: 'Media production and outreach' },
    { id: 'software', name: 'Software', icon: 'ri-code-s-slash-line', color: 'text-green-400', bgColor: 'bg-green-500/20', description: 'Software development projects' },
  ];

  const projects: Project[] = [
    // Design & Prototyping
    { id: '1', title: 'ISS Storage Container', category: 'design', description: 'Modular storage solution for International Space Station crew quarters with optimized space utilization', imageUrl: 'https://readdy.ai/api/search-image?query=futuristic%20white%20modular%20storage%20container%20with%20NASA%20logo%20designed%20for%20International%20Space%20Station%20with%20clean%20geometric%20shapes%20and%20mounting%20brackets%20against%20simple%20gray%20background%20technical%20product%20photography&width=800&height=600&seq=hunch1&orientation=landscape', school: 'Johnson Space Center HUNCH', year: '2024', status: 'flight-ready' },
    { id: '2', title: 'Crew Quarters Organizer', category: 'design', description: 'Custom organizational system for astronaut personal items with velcro mounting system', imageUrl: 'https://readdy.ai/api/search-image?query=sleek%20white%20astronaut%20personal%20organizer%20with%20multiple%20compartments%20and%20velcro%20strips%20designed%20for%20zero%20gravity%20use%20simple%20clean%20background%20product%20design%20photography&width=800&height=600&seq=hunch2&orientation=landscape', school: 'Kennedy Space Center HUNCH', year: '2024', status: 'completed' },
    { id: '3', title: 'Tool Caddy Prototype', category: 'design', description: 'Ergonomic tool storage for EVA maintenance operations with quick-release mechanisms', imageUrl: 'https://readdy.ai/api/search-image?query=white%20and%20gray%20tool%20storage%20caddy%20with%20quick%20release%20clips%20and%20ergonomic%20handles%20designed%20for%20space%20station%20maintenance%20simple%20studio%20background%20technical%20photography&width=800&height=600&seq=hunch3&orientation=landscape', school: 'Glenn Research Center HUNCH', year: '2023', status: 'in-progress' },
    { id: '4', title: 'Laptop Mount System', category: 'design', description: 'Adjustable mounting bracket for crew laptops in microgravity environment', imageUrl: 'https://readdy.ai/api/search-image?query=adjustable%20white%20laptop%20mounting%20bracket%20with%20articulating%20arms%20and%20secure%20clamps%20designed%20for%20space%20station%20use%20clean%20minimal%20background%20product%20photography&width=800&height=600&seq=hunch4&orientation=landscape', school: 'Marshall Space Flight Center HUNCH', year: '2024', status: 'completed' },
    { id: '5', title: 'Cable Management System', category: 'design', description: 'Innovative cable routing solution for ISS laboratory modules', imageUrl: 'https://readdy.ai/api/search-image?query=white%20cable%20management%20system%20with%20organized%20routing%20channels%20and%20secure%20fasteners%20designed%20for%20space%20station%20laboratory%20simple%20background%20technical%20product%20shot&width=800&height=600&seq=hunch5&orientation=landscape', school: 'Ames Research Center HUNCH', year: '2023', status: 'flight-ready' },

    // Hardware
    { id: '6', title: 'Crew Preference Kit', category: 'hardware', description: 'Personal storage containers for astronaut comfort items manufactured to flight specifications', imageUrl: 'https://readdy.ai/api/search-image?query=white%20rectangular%20storage%20box%20with%20secure%20latches%20and%20NASA%20branding%20manufactured%20for%20astronaut%20personal%20items%20clean%20studio%20background%20product%20photography&width=800&height=600&seq=hunch6&orientation=landscape', school: 'Johnson Space Center HUNCH', year: '2024', status: 'flight-ready' },
    { id: '7', title: 'Handrail Covers', category: 'hardware', description: 'Protective covers for ISS handrails with improved grip and thermal properties', imageUrl: 'https://readdy.ai/api/search-image?query=white%20cylindrical%20handrail%20covers%20with%20textured%20grip%20surface%20and%20thermal%20insulation%20designed%20for%20space%20station%20use%20simple%20background%20technical%20photography&width=800&height=600&seq=hunch7&orientation=landscape', school: 'Kennedy Space Center HUNCH', year: '2023', status: 'completed' },
    { id: '8', title: 'Stowage Bags', category: 'hardware', description: 'Durable fabric bags for equipment storage with reinforced stitching', imageUrl: 'https://readdy.ai/api/search-image?query=white%20fabric%20storage%20bag%20with%20reinforced%20stitching%20and%20velcro%20closures%20designed%20for%20space%20station%20equipment%20storage%20clean%20background%20product%20shot&width=800&height=600&seq=hunch8&orientation=landscape', school: 'Marshall Space Flight Center HUNCH', year: '2024', status: 'flight-ready' },
    { id: '9', title: 'Velcro Mounting Strips', category: 'hardware', description: 'Custom-cut velcro strips for securing items in microgravity', imageUrl: 'https://readdy.ai/api/search-image?query=white%20velcro%20mounting%20strips%20with%20strong%20adhesive%20backing%20arranged%20neatly%20for%20space%20station%20use%20simple%20clean%20background%20product%20photography&width=800&height=600&seq=hunch9&orientation=landscape', school: 'Glenn Research Center HUNCH', year: '2023', status: 'completed' },
    { id: '10', title: 'Equipment Tethers', category: 'hardware', description: 'Safety tethers for tools and equipment during EVA operations', imageUrl: 'https://readdy.ai/api/search-image?query=white%20and%20gray%20equipment%20tethers%20with%20carabiners%20and%20retractable%20cables%20designed%20for%20spacewalk%20safety%20simple%20background%20technical%20product%20photography&width=800&height=600&seq=hunch10&orientation=landscape', school: 'Johnson Space Center HUNCH', year: '2024', status: 'flight-ready' },

    // Softgoods
    { id: '11', title: 'Sleep Station Curtains', category: 'softgoods', description: 'Fire-retardant privacy curtains for crew sleeping quarters', imageUrl: 'https://readdy.ai/api/search-image?query=white%20fire%20retardant%20fabric%20curtain%20with%20velcro%20edges%20designed%20for%20astronaut%20sleeping%20quarters%20clean%20studio%20background%20textile%20photography&width=800&height=600&seq=hunch11&orientation=landscape', school: 'Johnson Space Center HUNCH', year: '2024', status: 'flight-ready' },
    { id: '12', title: 'Equipment Covers', category: 'softgoods', description: 'Protective fabric covers for sensitive equipment with anti-static properties', imageUrl: 'https://readdy.ai/api/search-image?query=white%20protective%20fabric%20cover%20with%20anti%20static%20properties%20and%20secure%20closures%20designed%20for%20space%20station%20equipment%20simple%20background%20product%20shot&width=800&height=600&seq=hunch12&orientation=landscape', school: 'Kennedy Space Center HUNCH', year: '2023', status: 'completed' },
    { id: '13', title: 'Cargo Transfer Bags', category: 'softgoods', description: 'Heavy-duty bags for moving supplies between spacecraft modules', imageUrl: 'https://readdy.ai/api/search-image?query=silver%20space%20food%20pouch%20with%20colorful%20meal%20contents%20visible%20designed%20for%20astronaut%20dinner%20simple%20white%20background%20food%20packaging%20photography&width=800&height=600&seq=hunch18&orientation=landscape', school: 'Marshall Space Flight Center HUNCH', year: '2024', status: 'in-progress' },
    { id: '19', title: 'Beverage Powder Mix', category: 'culinary', description: 'Vitamin-enriched drink mixes for crew hydration and morale', imageUrl: 'https://readdy.ai/api/search-image?query=colorful%20beverage%20powder%20in%20clear%20space%20food%20container%20with%20NASA%20branding%20designed%20for%20astronaut%20drinks%20simple%20background%20product%20photography&width=800&height=600&seq=hunch19&orientation=landscape', school: 'Glenn Research Center HUNCH', year: '2023', status: 'flight-ready' },
    { id: '20', title: 'Dessert Innovation', category: 'culinary', description: 'Space-stable desserts to improve crew morale during missions', imageUrl: 'https://readdy.ai/api/search-image?query=chocolate%20dessert%20in%20space%20food%20packaging%20with%20appetizing%20appearance%20designed%20for%20astronaut%20treats%20simple%20clean%20background%20food%20photography&width=800&height=600&seq=hunch20&orientation=landscape', school: 'Johnson Space Center HUNCH', year: '2024', status: 'completed' },

    // Video & Media
    { id: '21', title: 'Mission Highlight Reel', category: 'video', description: 'Documentary-style video showcasing ISS operations and crew activities', imageUrl: 'https://readdy.ai/api/search-image?query=video%20editing%20timeline%20showing%20space%20station%20footage%20with%20professional%20color%20grading%20on%20computer%20screen%20simple%20studio%20background%20media%20production%20photography&width=800&height=600&seq=hunch21&orientation=landscape', school: 'Johnson Space Center HUNCH', year: '2024', status: 'completed' },
    { id: '22', title: 'STEM Outreach Series', category: 'video', description: 'Educational video series explaining space science to students', imageUrl: 'https://readdy.ai/api/search-image?query=educational%20video%20production%20setup%20with%20camera%20lights%20and%20space%20themed%20backdrop%20for%20STEM%20content%20creation%20simple%20studio%20background%20photography&width=800&height=600&seq=hunch22&orientation=landscape', school: 'Kennedy Space Center HUNCH', year: '2023', status: 'in-progress' },
    { id: '23', title: 'Launch Coverage', category: 'video', description: 'Live broadcast production for rocket launch events', imageUrl: 'https://readdy.ai/api/search-image?query=broadcast%20control%20room%20with%20multiple%20monitors%20showing%20rocket%20launch%20footage%20professional%20media%20production%20setup%20simple%20background%20photography&width=800&height=600&seq=hunch23&orientation=landscape', school: 'Marshall Space Flight Center HUNCH', year: '2024', status: 'completed' },
    { id: '24', title: 'Astronaut Interview Series', category: 'video', description: 'Professional interviews with NASA astronauts and engineers', imageUrl: 'https://readdy.ai/api/search-image?query=professional%20interview%20setup%20with%20two%20chairs%20and%20space%20themed%20background%20for%20astronaut%20interviews%20simple%20studio%20lighting%20photography&width=800&height=600&seq=hunch24&orientation=landscape', school: 'Glenn Research Center HUNCH', year: '2023', status: 'completed' },
    { id: '25', title: 'Social Media Content', category: 'video', description: 'Short-form videos for NASA social media platforms', imageUrl: 'https://readdy.ai/api/search-image?query=smartphone%20showing%20social%20media%20video%20editing%20app%20with%20space%20content%20vertical%20format%20simple%20clean%20background%20media%20photography&width=800&height=600&seq=hunch25&orientation=landscape', school: 'Ames Research Center HUNCH', year: '2024', status: 'in-progress' },

    // Software
    { id: '26', title: 'Inventory Tracking App', category: 'software', description: 'Mobile application for tracking ISS supplies and equipment', imageUrl: 'https://readdy.ai/api/search-image?query=tablet%20displaying%20inventory%20management%20software%20interface%20with%20space%20station%20equipment%20list%20clean%20modern%20UI%20design%20simple%20background%20technology%20photography&width=800&height=600&seq=hunch26&orientation=landscape', school: 'Johnson Space Center HUNCH', year: '2024', status: 'in-progress' },
    { id: '27', title: 'Crew Schedule Manager', category: 'software', description: 'Scheduling software for coordinating astronaut activities and tasks', imageUrl: 'https://readdy.ai/api/search-image?query=computer%20screen%20showing%20calendar%20scheduling%20software%20with%20astronaut%20task%20timeline%20modern%20interface%20design%20simple%20background%20technology%20photography&width=800&height=600&seq=hunch27&orientation=landscape', school: 'Kennedy Space Center HUNCH', year: '2023', status: 'completed' },
    { id: '28', title: 'Exercise Data Logger', category: 'software', description: 'Application for recording crew exercise metrics and health data', imageUrl: 'https://readdy.ai/api/search-image?query=fitness%20tracking%20app%20interface%20showing%20exercise%20data%20graphs%20and%20health%20metrics%20on%20tablet%20screen%20clean%20UI%20design%20simple%20background%20technology%20photography&width=800&height=600&seq=hunch28&orientation=landscape', school: 'Marshall Space Flight Center HUNCH', year: '2024', status: 'completed' },
    { id: '29', title: 'Experiment Procedure Guide', category: 'software', description: 'Interactive digital manual for conducting science experiments', imageUrl: 'https://readdy.ai/api/search-image?query=digital%20manual%20interface%20showing%20step%20by%20step%20science%20experiment%20instructions%20with%20diagrams%20on%20computer%20screen%20modern%20design%20simple%20background%20technology%20photography&width=800&height=600&seq=hunch29&orientation=landscape', school: 'Glenn Research Center HUNCH', year: '2023', status: 'in-progress' },
    { id: '30', title: 'Communication Portal', category: 'software', description: 'Web platform for crew communication with ground control', imageUrl: 'https://readdy.ai/api/search-image?query=communication%20software%20interface%20showing%20video%20chat%20and%20messaging%20features%20on%20laptop%20screen%20professional%20design%20simple%20background%20technology%20photography&width=800&height=600&seq=hunch30&orientation=landscape', school: 'Johnson Space Center HUNCH', year: '2024', status: 'completed' },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.school.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Convert projects to Model format for Slideshow/Presentation
  const projectsAsModels = filteredProjects.map(project => ({
    id: project.id,
    name: project.title,
    description: project.description,
    imageUrl: project.imageUrl,
    createdAt: project.year,
    category: project.category,
    fileUrl: '',
    userId: '',
    likes: 0,
    downloads: 0
  }));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'flight-ready':
        return { text: 'Flight Ready', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
      case 'in-progress':
        return { text: 'In Progress', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
      case 'completed':
        return { text: 'Completed', color: 'bg-teal-500/20 text-teal-400 border-teal-500/30' };
      default:
        return { text: status, color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' };
    }
  };

  // Hide/show music and AI agent based on slideshow/presentation state
  useEffect(() => {
    if (showSlideshow || showPresentation) {
      hideMusic();
      hideAgent();
    } else {
      showMusic();
      showAgent();
    }
  }, [showSlideshow, showPresentation, hideMusic, showMusic, hideAgent, showAgent]);

  // Cleanup: show music and agent when leaving the page
  useEffect(() => {
    return () => {
      showMusic();
      showAgent();
    };
  }, [showMusic, showAgent]);

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'light' ? 'bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100' : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'}`}>
      <StarField />

      {/* Slideshow Modal */}
      {showSlideshow && (
        <Slideshow
          models={projectsAsModels}
          onClose={() => setShowSlideshow(false)}
          initialIndex={0}
        />
      )}

      {/* Presentation Modal */}
      {showPresentation && (
        <Presentation
          models={projectsAsModels}
          onClose={() => setShowPresentation(false)}
          initialIndex={0}
        />
      )}

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 -left-1/4 w-[600px] h-[600px] ${theme === 'light' ? 'bg-teal-300/20' : 'bg-teal-500/5'} rounded-full blur-[120px] animate-pulse`}></div>
        <div className={`absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] ${theme === 'light' ? 'bg-cyan-300/20' : 'bg-cyan-500/5'} rounded-full blur-[100px] animate-pulse`} style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-slate-950/80 border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <i className="ri-rocket-2-line text-2xl sm:text-3xl text-teal-400 group-hover:animate-bounce"></i>
                <div className="absolute inset-0 bg-teal-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className={`text-lg sm:text-xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>NASA DSLM</span>
            </Link>
            
            {/* Spacer for mobile hamburger menu (handled globally) */}
            <div className="lg:hidden w-14 h-14"></div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link to="/" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>Home</Link>
              <Link to="/gallery" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>Gallery</Link>
              <Link to="/hunch" className="text-sm text-teal-400 transition-colors whitespace-nowrap">HUNCH Projects</Link>
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

      {/* Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-wider">High School Students United with NASA</span>
            <h1 className={`text-4xl sm:text-5xl font-bold mt-2 mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>NASA HUNCH Projects</h1>
            <p className={`text-lg max-w-3xl mx-auto ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
              Explore student-created projects that fly to space! HUNCH students design, prototype, and manufacture real hardware for NASA missions.
            </p>
          </div>

          {/* Program Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className={`bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-xl border rounded-2xl p-6 ${theme === 'light' ? 'border-teal-300/50' : 'border-teal-500/30'}`}>
              <div className="w-14 h-14 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-rocket-line text-3xl text-teal-400"></i>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Flight Hardware</h3>
              <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>Student projects that actually fly to the International Space Station</p>
            </div>
            <div className={`bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border rounded-2xl p-6 ${theme === 'light' ? 'border-purple-300/50' : 'border-purple-500/30'}`}>
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-team-line text-3xl text-purple-400"></i>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Real Experience</h3>
              <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>Hands-on learning with NASA engineers and astronauts</p>
            </div>
            <div className={`bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-xl border rounded-2xl p-6 ${theme === 'light' ? 'border-orange-300/50' : 'border-orange-500/30'}`}>
              <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-star-line text-3xl text-orange-400"></i>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Career Pathways</h3>
              <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>Direct pipeline to STEM careers and NASA opportunities</p>
            </div>
          </div>

          {/* View Mode Controls */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowSlideshow(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-teal-500/25 cursor-pointer whitespace-nowrap active:scale-95"
            >
              <i className="ri-slideshow-line text-xl"></i>
              <span>Slideshow Mode</span>
            </button>
            <button
              onClick={() => setShowPresentation(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/25 cursor-pointer whitespace-nowrap active:scale-95"
            >
              <i className="ri-presentation-line text-xl"></i>
              <span>Presentation Mode</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-0 bg-teal-500/10 blur-xl rounded-full"></div>
              <div className="relative">
                <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects by name, description, or school..."
                  className={`w-full pl-14 pr-6 py-4 backdrop-blur-xl border rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-xl ${theme === 'light' ? 'bg-white/60 border-slate-300 text-slate-800' : 'bg-slate-900/60 border-slate-700/50 text-white'}`}
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                    activeCategory === cat.id
                      ? `${cat.bgColor} ${cat.color} border border-${cat.color.replace('text-', '')}/30`
                      : theme === 'light' 
                        ? 'bg-white/60 text-slate-600 border border-slate-300 hover:border-slate-400'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  <i className={cat.icon}></i>
                  <span>{cat.name}</span>
                  {activeCategory === cat.id && (
                    <span className="ml-1 px-2 py-0.5 bg-white/10 rounded-full text-xs">
                      {cat.id === 'all' ? projects.length : projects.filter(p => p.category === cat.id).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Project Count */}
          <div className="text-center mb-8">
            <p className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
              Showing <span className="text-teal-400 font-semibold">{filteredProjects.length}</span> projects
              {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const category = categories.find(c => c.id === project.category);
              const statusBadge = getStatusBadge(project.status);
              
              return (
                <div
                  key={project.id}
                  className={`backdrop-blur-xl border rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all group shadow-xl ${theme === 'light' ? 'bg-white/60 border-slate-200' : 'bg-slate-900/60 border-slate-700/50'}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative w-full h-48 bg-slate-800 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <span className={`px-3 py-1 ${statusBadge.color} text-xs font-semibold rounded-full border backdrop-blur-sm`}>
                        {statusBadge.text}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 flex items-center justify-center ${category?.bgColor} rounded-lg`}>
                        <i className={`${category?.icon} text-sm ${category?.color}`}></i>
                      </div>
                      <span className={`text-xs font-semibold ${category?.color}`}>{category?.name}</span>
                    </div>
                    <h3 className={`text-lg font-bold mb-2 group-hover:text-teal-400 transition-colors ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>{project.title}</h3>
                    <p className={`text-sm mb-4 line-clamp-2 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>{project.description}</p>
                    <div className={`flex items-center justify-between text-xs ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>
                      <div className="flex items-center gap-1">
                        <i className="ri-building-line"></i>
                        <span className="truncate">{project.school}</span>
                      </div>
                      <span className="flex items-center gap-1">
                        <i className="ri-calendar-line"></i>
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className={`bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-xl border rounded-2xl p-8 max-w-3xl mx-auto ${theme === 'light' ? 'border-teal-300/50' : 'border-teal-500/30'}`}>
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Join NASA HUNCH</h2>
              <p className={`mb-6 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                Are you a high school student interested in space exploration? Join the HUNCH program and create real hardware for NASA missions!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://nasahunch.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg shadow-teal-500/25 whitespace-nowrap cursor-pointer active:scale-95"
                >
                  <i className="ri-external-link-line"></i>
                  Visit HUNCH Website
                </a>
                <Link
                  to="/resources"
                  className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all border whitespace-nowrap active:scale-95 ${theme === 'light' ? 'bg-white/80 text-slate-800 border-slate-300 hover:bg-white' : 'bg-slate-800/80 text-white border-slate-700 hover:bg-slate-700'}`}
                >
                  <i className="ri-links-line"></i>
                  More Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

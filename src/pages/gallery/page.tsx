
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApprovedModels, uploadImage, saveModel } from '../../lib/storage';
import type { Model } from '../../lib/storage';
import StarField from '../../components/base/StarField';
import Slideshow from '../../components/feature/Slideshow';
import Presentation from '../../components/feature/Presentation';
import ThemeToggle, { useTheme } from '../../components/feature/ThemeToggle';
import { useFavorites } from '../../hooks/useFavorites';
import { useMusicVisibility } from '../../hooks/useMusicVisibility';
import { useAgentVisibility } from '../../hooks/useAgentVisibility';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'ri-apps-line' },
  { id: 'Planets', label: 'Planets', icon: 'ri-earth-line' },
  { id: 'Moons', label: 'Moons', icon: 'ri-moon-line' },
  { id: 'Spacecraft', label: 'Spacecraft', icon: 'ri-space-ship-line' },
  { id: 'Rockets', label: 'Rockets', icon: 'ri-rocket-line' },
  { id: 'Nebulae & Galaxies', label: 'Nebulae & Galaxies', icon: 'ri-sparkling-line' },
  { id: 'Astronauts', label: 'Astronauts', icon: 'ri-user-star-line' },
  { id: 'Satellites', label: 'Satellites', icon: 'ri-satellite-line' },
  { id: 'Crewed Vehicles', label: 'Crewed Vehicles', icon: 'ri-capsule-line' },
  { id: 'Asteroids & Comets', label: 'Asteroids & Comets', icon: 'ri-meteor-line' },
  { id: 'Stars & Sun', label: 'Stars & Sun', icon: 'ri-sun-line' },
  { id: 'Other', label: 'Other', icon: 'ri-more-line' },
];

const MODEL_CATEGORIES = CATEGORIES.filter(c => c.id !== 'all');

export default function Gallery() {
  
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'newest' | 'oldest'>('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [downloading, setDownloading] = useState(false);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [activeTab, setActiveTab] = useState<'browse' | 'upload'>('browse');

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    name: '',
    description: '',
    category: 'Other'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const { theme } = useTheme();
  const { toggleFavorite, isFavorite, favoritesCount } = useFavorites();
  const { hide: hideMusic, show: showMusic } = useMusicVisibility();
  const { hide: hideAgent, show: showAgent } = useAgentVisibility();

  useEffect(() => {
    fetchModels();
  }, []);

  // Hide/show music and AI agent based on modal/slideshow/presentation state
  useEffect(() => {
    if (selectedModel !== null || showSlideshow || showPresentation) {
      hideMusic();
      hideAgent();
    } else {
      showMusic();
      showAgent();
    }
  }, [selectedModel, showSlideshow, showPresentation, hideMusic, showMusic, hideAgent, showAgent]);

  // Cleanup: show music and agent when leaving the page
  useEffect(() => {
    return () => {
      showMusic();
      showAgent();
    };
  }, [showMusic, showAgent]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedModel(null);
        resetZoom();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Reset zoom when model changes
  useEffect(() => {
    if (selectedModel) {
      resetZoom();
    }
  }, [selectedModel]);

  const fetchModels = async () => {
    try {
      setLoading(true);
      const storedModels = await getApprovedModels();
      setModels(storedModels);
    } catch (error) {
      console.error('Error fetching models:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get category counts
  const getCategoryCounts = () => {
    const counts: Record<string, number> = { all: models.length };
    models.forEach(model => {
      const cat = model.category || 'Other';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  // Filter and sort models
  const filteredModels = models
    .filter(model => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFavorites = showFavoritesOnly ? isFavorite(model.id) : true;
      
      const matchesCategory = selectedCategory === 'all' || model.category === selectedCategory;

      return matchesSearch && matchesFavorites && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return 0;
    });

  const navigateModel = (direction: 'prev' | 'next') => {
    if (!selectedModel) return;
    const currentIndex = filteredModels.findIndex(m => m.id === selectedModel.id);
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedModel(filteredModels[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < filteredModels.length - 1) {
      setSelectedModel(filteredModels[currentIndex + 1]);
    }
  };

  // Zoom functions
  const resetZoom = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setImagePosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - imagePosition.x,
        y: e.touches[0].clientY - imagePosition.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoomLevel > 1 && e.touches.length === 1) {
      setImagePosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Download function
  const handleDownload = async () => {
    if (!selectedModel?.imageUrl) return;

    setDownloading(true);
    try {
      const response = await fetch(selectedModel.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedModel.name.replace(/\s+/g, '_')}_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const cat = CATEGORIES.find(c => c.id === category);
    return cat?.icon || 'ri-more-line';
  };

  // Upload form handlers
  const validateUploadForm = () => {
    const errors: Record<string, string> = {};

    if (!uploadForm.name.trim()) {
      errors.name = 'Model name is required';
    } else if (uploadForm.name.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }

    if (!uploadForm.description.trim()) {
      errors.description = 'Description is required';
    } else if (uploadForm.description.length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }

    if (!selectedFile && !imagePreview) {
      errors.image = 'Please select an image file';
    }

    setUploadErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadErrors({ ...uploadErrors, image: 'Please upload an IMAGE file (JPG, PNG, GIF, or WebP). 3D model files are not supported.' });
      return;
    }

    setSelectedFile(file);
    setUploadErrors({ ...uploadErrors, image: '' });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUploadForm()) {
      return;
    }

    if (!selectedFile) {
      setUploadErrors({ ...uploadErrors, image: 'Please select an image file' });
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const imageUrl = await uploadImage(selectedFile);

      await saveModel({
        name: uploadForm.name.trim(),
        description: uploadForm.description.trim(),
        imageUrl,
        category: uploadForm.category
      });

      setUploadSuccess(true);
      setUploadForm({ name: '', description: '', category: 'Other' });
      setSelectedFile(null);
      setImagePreview('');
      
      setTimeout(() => {
        setActiveTab('browse');
        fetchModels();
      }, 3000);
    } catch (error) {
      console.error('Error uploading model:', error);
      setUploadErrors({ submit: 'Failed to upload model. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'light' ? 'bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100' : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'}`}>
      {/* Star Field Animation */}
      <StarField />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/3 -left-1/4 w-[500px] h-[500px] ${theme === 'light' ? 'bg-teal-300/20' : 'bg-teal-500/5'} rounded-full blur-[100px] animate-pulse`}></div>
        <div className={`absolute bottom-1/3 -right-1/4 w-[400px] h-[400px] ${theme === 'light' ? 'bg-cyan-300/20' : 'bg-cyan-500/5'} rounded-full blur-[80px] animate-pulse`} style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-slate-950/80 border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group min-h-[44px]">
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
              <Link to="/gallery" className="text-sm text-teal-400 transition-colors whitespace-nowrap">Gallery</Link>
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

      {/* Gallery Content */}
      <div className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-teal-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">Collection</span>
            <h1 className={`text-3xl sm:text-5xl font-bold mt-2 mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Space Gallery</h1>
            <p className={`text-base sm:text-lg mb-4 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>Explore {models.length}+ stunning space images from planets to spacecraft</p>
            
            {/* Sharing tip message */}
            <div className={`inline-flex items-center gap-2 px-5 py-3 rounded-full ${theme === 'light' ? 'bg-teal-50 border border-teal-200' : 'bg-teal-500/10 border border-teal-500/30'}`}>
              <i className={`ri-share-forward-line ${theme === 'light' ? 'text-teal-600' : 'text-teal-400'}`}></i>
              <span className={`text-sm ${theme === 'light' ? 'text-teal-700' : 'text-teal-300'}`}>
                Share any image you love! <span className="font-semibold">3D models & NASA space-related content</span> works best for our community.
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-3 mb-8 justify-center">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[44px] ${
                activeTab === 'browse'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/50'
                  : theme === 'light' ? 'bg-white/60 text-slate-600 hover:bg-white/80' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800/70'
              }`}
            >
              <i className="ri-gallery-line mr-2"></i>
              Browse Gallery
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[44px] ${
                activeTab === 'upload'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/50'
                  : theme === 'light' ? 'bg-white/60 text-slate-600 hover:bg-white/80' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800/70'
              }`}
            >
              <i className="ri-upload-cloud-line mr-2"></i>
              Upload Model
            </button>
          </div>

          {/* Browse Gallery Tab */}
          {activeTab === 'browse' && (
            <>
              {/* Search Bar and Controls */}
              <div className="mb-6 sm:mb-8">
                <div className="max-w-4xl mx-auto relative">
                  <div className="absolute inset-0 bg-teal-500/10 blur-xl rounded-full"></div>
                  <div className="relative flex flex-col gap-3">
                    <div className="flex-1 relative">
                      <i className="ri-search-line absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name or description..."
                        className={`w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 backdrop-blur-xl border rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-xl min-h-[44px] ${theme === 'light' ? 'bg-white/60 border-slate-300 text-slate-800' : 'bg-slate-900/60 border-slate-700/50 text-white shadow-black/10'}`}
                      />
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'name' | 'newest' | 'oldest')}
                        className={`flex-1 min-w-[140px] px-4 py-3 sm:py-4 backdrop-blur-xl border rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-xl cursor-pointer min-h-[44px] ${theme === 'light' ? 'bg-white/60 border-slate-300 text-slate-800' : 'bg-slate-900/60 border-slate-700/50 text-white shadow-black/10'}`}
                      >
                        <option value="newest">Sort by Newest</option>
                        <option value="oldest">Sort by Oldest</option>
                        <option value="name">Sort by Name</option>
                      </select>
                      {filteredModels.length > 0 && (
                        <>
                          <button
                            onClick={() => setShowSlideshow(true)}
                            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all shadow-xl shadow-teal-500/30 whitespace-nowrap cursor-pointer min-h-[44px]"
                          >
                            <i className="ri-play-circle-line text-xl"></i>
                            <span className="hidden sm:inline">Slideshow</span>
                          </button>
                          <button
                            onClick={() => setShowPresentation(true)}
                            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl transition-all shadow-xl shadow-pink-500/30 whitespace-nowrap cursor-pointer min-h-[44px]"
                          >
                            <i className="ri-slideshow-line text-xl"></i>
                            <span className="hidden sm:inline">Presentation</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {CATEGORIES.filter(cat => cat.id === 'all' || (categoryCounts[cat.id] && categoryCounts[cat.id] > 0)).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap min-h-[40px] flex items-center gap-1.5 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30'
                          : theme === 'light'
                            ? 'bg-white/60 text-slate-600 border border-slate-300 hover:border-teal-500/50 hover:text-teal-600'
                            : 'bg-slate-900/60 text-slate-300 border border-slate-700/50 hover:border-teal-500/50 hover:text-teal-400'
                      }`}
                    >
                      <i className={`${category.icon} text-sm`}></i>
                      <span>{category.label}</span>
                      <span className="text-xs opacity-75">({categoryCounts[category.id] || 0})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Favorites Filter */}
              <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <button
                  onClick={() => setShowFavoritesOnly(false)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center ${
                    !showFavoritesOnly
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30'
                      : theme === 'light'
                        ? 'bg-white/60 text-slate-600 border border-slate-300 hover:border-teal-500/50 hover:text-teal-600'
                        : 'bg-slate-900/60 text-slate-300 border border-slate-700/50 hover:border-teal-500/50 hover:text-teal-400'
                  }`}
                >
                  All Models
                  <span className="ml-2 text-xs opacity-75">({models.length})</span>
                </button>
                <button
                  onClick={() => setShowFavoritesOnly(true)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center ${
                    showFavoritesOnly
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30'
                      : theme === 'light'
                        ? 'bg-white/60 text-slate-600 border border-slate-300 hover:border-rose-500/50 hover:text-rose-600'
                        : 'bg-slate-900/60 text-slate-300 border border-slate-700/50 hover:border-rose-500/50 hover:text-rose-400'
                  }`}
                >
                  <i className="ri-heart-fill mr-1.5 text-rose-400"></i>
                  Favorites
                  <span className="ml-2 text-xs opacity-75">({favoritesCount})</span>
                </button>
              </div>

              {/* Results Count */}
              <div className="mb-6 text-center">
                <p className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                  Showing <span className="text-teal-400 font-semibold">{filteredModels.length}</span> models
                  {searchTerm && <span> matching "<span className={theme === 'light' ? 'text-slate-800' : 'text-white'}>{searchTerm}</span>"</span>}
                  {selectedCategory !== 'all' && <span> in <span className={theme === 'light' ? 'text-slate-800' : 'text-white'}>{selectedCategory}</span></span>}
                </p>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-20">
                  <div className="relative inline-block">
                    <i className="ri-loader-4-line text-5xl text-teal-400 animate-spin"></i>
                    <div className="absolute inset-0 bg-teal-400/20 blur-xl rounded-full"></div>
                  </div>
                  <p className={`mt-4 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Loading models from database...</p>
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredModels.length === 0 && (
                <div className={`text-center py-20 backdrop-blur-sm border rounded-2xl ${theme === 'light' ? 'bg-white/30 border-slate-200' : 'bg-slate-900/30 border-slate-800'}`}>
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-slate-200/50' : 'bg-slate-800/50'}`}>
                    <i className={`ri-search-line text-5xl ${theme === 'light' ? 'text-slate-400' : 'text-slate-600'}`}></i>
                  </div>
                  <p className={`text-xl mb-2 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                    {showFavoritesOnly ? 'No favorites yet' : 'No models found'}
                  </p>
                  <p className={`text-sm ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {showFavoritesOnly ? 'Click the heart icon on models to add them to favorites' : 'Try adjusting your search or category filter'}
                  </p>
                  {!showFavoritesOnly && selectedCategory !== 'all' && (
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all cursor-pointer"
                    >
                      <i className="ri-apps-line"></i>
                      View All Categories
                    </button>
                  )}
                </div>
              )}

              {/* Models Grid */}
              {!loading && filteredModels.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredModels.map((model, index) => (
                    <div
                      key={model.id}
                      className={`backdrop-blur-xl border rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all group shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 cursor-pointer animate-fadeIn ${theme === 'light' ? 'bg-white/60 border-slate-200 shadow-slate-200/50' : 'bg-slate-900/60 border-slate-700/50 shadow-black/10'}`}
                      style={{ animationDelay: `${(index % 20) * 0.05}s` }}
                    >
                      <div
                        className="relative w-full h-48 bg-slate-800 overflow-hidden"
                        onClick={() => setSelectedModel(model)}
                      >
                        <img
                          src={model.imageUrl}
                          alt={model.name}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(model.id);
                          }}
                          className={`absolute top-2 left-2 w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-sm transition-all cursor-pointer hover:scale-110 active:scale-90 ${
                            isFavorite(model.id)
                              ? 'bg-rose-500 text-white'
                              : theme === 'light' ? 'bg-white/80 text-slate-400 hover:text-rose-500' : 'bg-slate-900/80 text-slate-400 hover:text-rose-500'
                          }`}
                        >
                          <i className={`${isFavorite(model.id) ? 'ri-heart-fill' : 'ri-heart-line'} text-lg`}></i>
                        </button>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="w-12 h-12 flex items-center justify-center bg-teal-500/90 rounded-full backdrop-blur-sm">
                            <i className="ri-zoom-in-line text-xl text-white"></i>
                          </div>
                        </div>
                      </div>
                      <div className="p-4" onClick={() => setSelectedModel(model)}>
                        <h3 className={`text-base font-bold mb-1.5 group-hover:text-teal-400 transition-colors line-clamp-1 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>{model.name}</h3>
                        <p className={`text-xs mb-3 line-clamp-2 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>{model.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className={`px-2 py-0.5 rounded flex items-center gap-1 ${theme === 'light' ? 'bg-teal-100 text-teal-700' : 'bg-teal-500/20 text-teal-400'}`}>
                            <i className={`${getCategoryIcon(model.category)} text-xs`}></i>
                            {model.category || 'Other'}
                          </span>
                          <span className={theme === 'light' ? 'text-slate-400' : 'text-slate-500'}>
                            {new Date(model.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Upload Model Tab */}
          {activeTab === 'upload' && (
            <div className="max-w-4xl mx-auto">
              <div className={`backdrop-blur-xl border rounded-2xl p-6 sm:p-8 shadow-2xl ${theme === 'light' ? 'bg-white/60 border-slate-200 shadow-slate-200/50' : 'bg-slate-900/60 border-slate-700/50 shadow-black/20'}`}>
                <div className="mb-6">
                  <h2 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Upload 3D Model Image</h2>
                  <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    Share your 3D model images with the community. Your submission will be reviewed by an admin before appearing in the gallery.
                  </p>
                </div>

                {/* Helpful tip box */}
                <div className={`mb-6 p-4 rounded-xl border ${theme === 'light' ? 'bg-teal-50 border-teal-200' : 'bg-teal-500/10 border-teal-500/30'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'light' ? 'bg-teal-100' : 'bg-teal-500/20'}`}>
                      <i className={`ri-lightbulb-flash-line text-xl ${theme === 'light' ? 'text-teal-600' : 'text-teal-400'}`}></i>
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${theme === 'light' ? 'text-teal-800' : 'text-teal-300'}`}>Upload anything you want!</h3>
                      <p className={`text-sm ${theme === 'light' ? 'text-teal-700' : 'text-teal-400/80'}`}>
                        Feel free to share any image, but <strong>3D model renders, NASA imagery, space exploration photos, and astronomy content</strong> are greatly appreciated! Screenshots, renders, and artistic space visualizations are all welcome.
                      </p>
                    </div>
                  </div>
                </div>

                {uploadSuccess && (
                  <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/50 rounded-lg text-teal-400 flex items-center gap-3">
                    <i className="ri-checkbox-circle-line text-xl"></i>
                    <span>Model uploaded successfully! Your submission is pending admin approval.</span>
                  </div>
                )}

                {uploadErrors.submit && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 flex items-center gap-3">
                    <i className="ri-error-warning-line text-xl"></i>
                    <span>{uploadErrors.submit}</span>
                  </div>
                )}

                <form onSubmit={handleUploadSubmit} className="space-y-6">
                  {/* Model Name */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                      Model Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <i className={`ri-cube-line absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'light' ? 'text-slate-400' : 'text-slate-400'}`}></i>
                      <input
                        type="text"
                        value={uploadForm.name}
                        onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all min-h-[44px] ${theme === 'light' ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-800/50 border-slate-700 text-white'}`}
                        placeholder="Enter model name (e.g., Mars Rover, Space Station)"
                      />
                    </div>
                    {uploadErrors.name && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <i className="ri-error-warning-line"></i>
                        {uploadErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                      Category <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {MODEL_CATEGORIES.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setUploadForm({ ...uploadForm, category: category.id })}
                          className={`px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 min-h-[44px] ${
                            uploadForm.category === category.id
                              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30'
                              : theme === 'light'
                                ? 'bg-slate-100 text-slate-600 border border-slate-200 hover:border-teal-500/50 hover:text-teal-600'
                                : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover-border-teal-500/50 hover:text-teal-400'
                          }`}
                        >
                          <i className={`${category.icon} text-base`}></i>
                          <span className="truncate">{category.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                      Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                      rows={4}
                      maxLength={500}
                      className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all resize-none ${theme === 'light' ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-800/50 border-slate-700 text-white'}`}
                      placeholder="Describe your 3D model - what it represents, how it was created, etc."
                    />
                    <div className="flex justify-between mt-2">
                      {uploadErrors.description ? (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <i className="ri-error-warning-line"></i>
                          {uploadErrors.description}
                        </p>
                      ) : (
                        <span></span>
                      )}
                      <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>{uploadForm.description.length}/500</span>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                      Model Image <span className="text-red-400">*</span>
                    </label>
                    <p className={`text-xs mb-3 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                      <i className="ri-lightbulb-line text-amber-400 mr-1"></i>
                      Upload a <strong>screenshot, render, or photo</strong> of your 3D model. Actual 3D files are not supported.
                    </p>
                    <div 
                      className="relative"
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                        id="gallery-file-upload"
                      />
                      <label
                        htmlFor="gallery-file-upload"
                        className={`flex items-center justify-center w-full px-4 py-10 border-2 border-dashed rounded-xl cursor-pointer transition-all group ${
                          isDragOver
                            ? 'border-teal-500 bg-teal-500/10 scale-[1.02]'
                            : theme === 'light' 
                              ? 'bg-slate-50 border-slate-300 hover:border-teal-500 hover:bg-slate-100' 
                              : 'bg-slate-800/50 border-slate-700 hover:border-teal-500 hover:bg-slate-800/70'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors ${
                            isDragOver
                              ? 'bg-teal-500/20'
                              : theme === 'light' 
                                ? 'bg-slate-200 group-hover:bg-teal-500/20' 
                                : 'bg-slate-700/50 group-hover:bg-teal-500/20'
                          }`}>
                            <i className={`text-3xl transition-colors ${
                              isDragOver
                                ? 'ri-download-2-line text-teal-400 animate-bounce'
                                : 'ri-image-add-line group-hover:text-teal-400 ' + (theme === 'light' ? 'text-slate-400' : 'text-slate-400')
                            }`}></i>
                          </div>
                          <p className={`text-sm mb-1 font-semibold ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                            {isDragOver 
                              ? 'Drop your image here!' 
                              : selectedFile 
                                ? selectedFile.name 
                                : 'Drag & drop an image or click to browse'}
                          </p>
                          <p className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>
                            Supported formats: JPG, PNG, GIF, WebP
                          </p>
                        </div>
                      </label>
                    </div>
                    {uploadErrors.image && (
                      <p className="mt-2 text-sm text-red-400 flex items-start gap-1">
                        <i className="ri-error-warning-line mt-0.5"></i>
                        <span>{uploadErrors.image}</span>
                      </p>
                    )}
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                        Image Preview
                      </label>
                      <div className={`relative w-full h-64 sm:h-80 border rounded-xl overflow-hidden ${theme === 'light' ? 'bg-slate-100 border-slate-300' : 'bg-slate-800 border-slate-700'}`}>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover object-top"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setImagePreview('');
                          }}
                          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-red-500/90 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg cursor-pointer min-h-[44px] min-w-[44px]"
                        >
                          <i className="ri-close-line text-xl"></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="w-full sm:flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] min-h-[44px] cursor-pointer"
                    >
                      {isUploading ? (
                        <span className="flex items-center justify-center gap-2">
                          <i className="ri-loader-4-line animate-spin"></i>
                          Uploading...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <i className="ri-upload-cloud-line"></i>
                          Upload Model
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('browse')}
                      className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-lg transition-colors whitespace-nowrap text-center min-h-[44px] flex items-center justify-center cursor-pointer ${theme === 'light' ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slideshow Mode */}
      {showSlideshow && (
        <Slideshow
          models={filteredModels.map(m => ({
            id: m.id,
            name: m.name,
            description: m.description,
            imageUrl: m.imageUrl,
            createdAt: m.createdAt
          }))}
          onClose={() => setShowSlideshow(false)}
          initialIndex={0}
        />
      )}

      {/* Presentation Mode */}
      {showPresentation && (
        <Presentation
          models={filteredModels.map(m => ({
            id: m.id,
            name: m.name,
            description: m.description,
            imageUrl: m.imageUrl,
            createdAt: m.createdAt
          }))}
          onClose={() => setShowPresentation(false)}
          initialIndex={0}
        />
      )}

      {/* Image Detail Modal with Zoom */}
      {selectedModel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => {
              setSelectedModel(null);
              resetZoom();
            }}
          ></div>

          {/* Navigation Arrows */}
          {filteredModels.findIndex(m => m.id === selectedModel.id) > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigateModel('prev'); }}
              className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-slate-800/80 hover:bg-teal-500/80 border border-slate-700 hover:border-teal-400 rounded-full text-white transition-all cursor-pointer active:scale-90 min-h-[44px] min-w-[44px]"
            >
              <i className="ri-arrow-left-s-line text-2xl"></i>
            </button>
          )}
          {filteredModels.findIndex(m => m.id === selectedModel.id) < filteredModels.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigateModel('next'); }}
              className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-slate-800/80 hover:bg-teal-500/80 border border-slate-700 hover:border-teal-400 rounded-full text-white transition-all cursor-pointer active:scale-90 min-h-[44px] min-w-[44px]"
            >
              <i className="ri-arrow-right-s-line text-2xl"></i>
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={() => {
              setSelectedModel(null);
              resetZoom();
            }}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 z-10 w-11 h-11 flex items-center justify-center bg-slate-800/80 hover:bg-red-500/80 border border-slate-700 hover:border-red-400 rounded-full text-white transition-all cursor-pointer active:scale-90 min-h-[44px] min-w-[44px]"
          >
            <i className="ri-close-line text-xl"></i>
          </button>

          {/* Favorite Button in Modal */}
          <button
            onClick={() => toggleFavorite(selectedModel.id)}
            className={`absolute top-2 right-16 sm:top-4 sm:right-20 md:top-6 md:right-24 z-10 w-11 h-11 flex items-center justify-center rounded-full border transition-all cursor-pointer active:scale-90 min-h-[44px] min-w-[44px] ${
              isFavorite(selectedModel.id)
                ? 'bg-rose-500 border-rose-400 text-white'
                : 'bg-slate-800/80 border-slate-700 text-white hover:bg-rose-500/80 hover:border-rose-400'
            }`}
          >
            <i className={`${isFavorite(selectedModel.id) ? 'ri-heart-fill' : 'ri-heart-line'} text-xl`}></i>
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-16 sm:top-20 right-2 sm:right-4 md:right-6 z-10 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 4}
              className="w-11 h-11 flex items-center justify-center bg-slate-800/80 hover:bg-teal-500/80 border border-slate-700 hover:border-teal-400 rounded-full text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800/80 active:scale-90 min-h-[44px] min-w-[44px]"
            >
              <i className="ri-zoom-in-line text-xl"></i>
            </button>
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="w-11 h-11 flex items-center justify-center bg-slate-800/80 hover:bg-teal-500/80 border border-slate-700 hover:border-teal-400 rounded-full text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800/80 active:scale-90 min-h-[44px] min-w-[44px]"
            >
              <i className="ri-zoom-out-line text-xl"></i>
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={resetZoom}
                className="w-11 h-11 flex items-center justify-center bg-slate-800/80 hover:bg-teal-500/80 border border-slate-700 hover:border-teal-400 rounded-full text-white transition-all cursor-pointer active:scale-90 min-h-[44px] min-w-[44px]"
              >
                <i className="ri-refresh-line text-xl"></i>
              </button>
            )}
            <div className="w-11 h-11 flex items-center justify-center bg-slate-800/80 border border-slate-700 rounded-full text-white text-xs min-h-[44px] min-w-[44px]">
              {Math.round(zoomLevel * 100)}%
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-6 z-10 flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800/80 hover:bg-teal-500/80 border border-slate-700 hover:border-teal-400 rounded-full text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap active:scale-95 min-h-[44px]"
          >
            {downloading ? (
              <>
                <i className="ri-loader-4-line text-lg animate-spin"></i>
                <span className="text-sm hidden md:inline">Downloading...</span>
              </>
            ) : (
              <>
                <i className="ri-download-line text-lg"></i>
                <span className="text-sm hidden md:inline">Download</span>
              </>
            )}
          </button>

          {/* Modal Content */}
          <div
            className="relative z-10 w-full max-w-6xl mx-2 sm:mx-4 max-h-[90vh] overflow-hidden flex flex-col lg:flex-row bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section with Zoom */}
            <div
              className="lg:w-2/3 relative bg-slate-950 flex items-center justify-center min-h-[300px] lg:min-h-[500px] overflow-hidden touch-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
              <img
                src={selectedModel.imageUrl}
                alt={selectedModel.name}
                className="max-w-full max-h-[50vh] lg:max-h-[80vh] object-contain transition-transform duration-300 select-none"
                style={{
                  transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                  transformOrigin: 'center center'
                }}
                draggable={false}
              />

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-slate-900/80 backdrop-blur-sm rounded-full text-xs text-slate-300">
                {filteredModels.findIndex(m => m.id === selectedModel.id) + 1} / {filteredModels.length}
              </div>

              {/* Zoom Hint */}
              {zoomLevel > 1 && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-teal-500/80 backdrop-blur-sm rounded-full text-xs text-white">
                  <i className="ri-drag-move-line mr-1"></i>
                  Drag to pan
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="lg:w-1/3 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[40vh] lg:max-h-[80vh] bg-slate-900/50">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${theme === 'light' ? 'bg-teal-100 text-teal-700' : 'bg-teal-500/20 text-teal-400'}`}>
                    <i className={`${getCategoryIcon(selectedModel.category)} text-xs`}></i>
                    {selectedModel.category || 'Other'}
                  </span>
                  {isFavorite(selectedModel.id) && (
                    <span className="inline-block px-3 py-1 bg-rose-500/20 text-rose-400 text-xs font-semibold rounded-full">
                      <i className="ri-heart-fill mr-1"></i>Favorited
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3">{selectedModel.name}</h2>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <i className="ri-calendar-line"></i>
                  <span>Added {new Date(selectedModel.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-3">Description</h3>
                <p className="text-slate-300 leading-relaxed text-sm">{selectedModel.description}</p>
              </div>

              <div className="pt-6 border-t border-slate-700/50 space-y-3">
                <button
                  onClick={() => toggleFavorite(selectedModel.id)}
                  className={`w-full px-5 py-2.5 text-sm font-semibold rounded-lg transition-all shadow-lg whitespace-nowrap cursor-pointer active:scale-95 min-h-[44px] ${
                    isFavorite(selectedModel.id)
                      ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/25'
                      : 'bg-slate-800 text-white hover:bg-rose-500 border border-slate-700'
                  }`}
                >
                  <i className={`${isFavorite(selectedModel.id) ? 'ri-heart-fill' : 'ri-heart-line'} mr-2`}></i>
                  {isFavorite(selectedModel.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <button
                  onClick={() => {
                    setSelectedModel(null);
                    resetZoom();
                  }}
                  className="w-full px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg shadow-teal-500/25 whitespace-nowrap cursor-pointer active:scale-95 min-h-[44px]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          {/* Keyboard Hint - Hidden on mobile */}
          <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-400">←</kbd>
              <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-400">→</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-400">ESC</kbd>
              Close
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle, { useTheme } from '../../components/feature/ThemeToggle';
import { useMusicVisibility } from '../../hooks/useMusicVisibility';
import { useAgentVisibility } from '../../hooks/useAgentVisibility';
import { getApprovedVideos, saveVideo } from '../../lib/storage';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'gif' | 'animation';
  category: string;
  thumbnail: string;
  url: string;
  duration?: string;
  source: string;
}

const CATEGORIES = [
  'NASA Videos',
  'Space Documentaries',
  'Animations',
  'GIFs',
  'Educational',
  'Other'
];

export default function VideosPage() {
  const [activeTab, setActiveTab] = useState<'browse' | 'submit'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const { hide: hideMusic, show: showMusic } = useMusicVisibility();
  const { hide: hideAgent, show: showAgent } = useAgentVisibility();

  // Submit form state
  const [submitForm, setSubmitForm] = useState({
    youtubeUrl: '',
    title: '',
    description: '',
    category: 'NASA Videos',
    source: ''
  });
  const [submitErrors, setSubmitErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = ['All', ...CATEGORIES];

  // Load videos from database
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setIsLoading(true);
      const approvedVideos = await getApprovedVideos();
      
      // Convert database videos to VideoItem format
      const videoItems: VideoItem[] = approvedVideos.map(video => {
        // Extract YouTube video ID from URL
        const videoId = extractYouTubeId(video.youtubeUrl);
        const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : video.youtubeUrl;
        
        // Determine type based on category
        let type: 'video' | 'gif' | 'animation' = 'video';
        if (video.category === 'GIFs') type = 'gif';
        else if (video.category === 'Animations') type = 'animation';
        
        return {
          id: video.id,
          title: video.title,
          description: video.description,
          type,
          category: video.category,
          thumbnail: video.thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          url: embedUrl,
          duration: video.duration || '',
          source: video.source || 'Community'
        };
      });
      
      setVideos(videoItems);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract YouTube video ID from various URL formats
  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  };

  // Hide/show music and AI agent based on video modal state
  useEffect(() => {
    if (selectedVideo !== null) {
      hideMusic();
      hideAgent();
    } else {
      showMusic();
      showAgent();
    }
  }, [selectedVideo, hideMusic, showMusic, hideAgent, showAgent]);

  // Cleanup: show music and agent when leaving the page
  useEffect(() => {
    return () => {
      showMusic();
      showAgent();
    };
  }, [showMusic, showAgent]);

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Validate submit form
  const validateSubmitForm = () => {
    const errors: Record<string, string> = {};
    
    if (!submitForm.youtubeUrl.trim()) {
      errors.youtubeUrl = 'YouTube URL is required';
    } else {
      const videoId = extractYouTubeId(submitForm.youtubeUrl);
      if (!videoId) {
        errors.youtubeUrl = 'Please enter a valid YouTube URL or video ID';
      }
    }
    
    if (!submitForm.title.trim()) {
      errors.title = 'Video title is required';
    } else if (submitForm.title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
    }
    
    if (!submitForm.description.trim()) {
      errors.description = 'Description is required';
    } else if (submitForm.description.length < 20) {
      errors.description = 'Description must be at least 20 characters';
    }
    
    setSubmitErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle video submission
  const handleSubmitVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSubmitForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitSuccess(false);
    
    try {
      const videoId = extractYouTubeId(submitForm.youtubeUrl);
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      await saveVideo({
        title: submitForm.title.trim(),
        description: submitForm.description.trim(),
        youtubeUrl: submitForm.youtubeUrl.trim(),
        thumbnail,
        category: submitForm.category,
        source: submitForm.source.trim() || 'Community Submission'
      });
      
      setSubmitSuccess(true);
      setSubmitForm({
        youtubeUrl: '',
        title: '',
        description: '',
        category: 'NASA Videos',
        source: ''
      });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting video:', error);
      setSubmitErrors({ submit: 'Failed to submit video. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100' : 'bg-gradient-to-b from-gray-900 via-purple-900 to-black'}`}>
      {/* Header */}
      <header className={`backdrop-blur-md border-b sticky top-0 z-40 ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-black/50 border-purple-500/30'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <i className="ri-rocket-2-fill text-2xl sm:text-3xl text-purple-400"></i>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                NASA DSLM
              </span>
            </Link>
            
            {/* Spacer for mobile hamburger menu (handled globally) */}
            <div className="lg:hidden w-14 h-14"></div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-5">
              <Link to="/" className={`hover:text-purple-400 transition-colors whitespace-nowrap text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>Home</Link>
              <Link to="/gallery" className={`hover:text-purple-400 transition-colors whitespace-nowrap text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>Gallery</Link>
              <Link to="/hunch" className={`hover:text-purple-400 transition-colors whitespace-nowrap text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>HUNCH Projects</Link>
              <Link to="/videos" className="text-purple-400 font-semibold whitespace-nowrap text-sm">Space Videos</Link>
              <Link to="/upload" className={`hover:text-purple-400 transition-colors whitespace-nowrap text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>Upload</Link>
              <Link to="/resources" className={`hover:text-purple-400 transition-colors whitespace-nowrap text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>Resources</Link>
              <Link to="/about" className={`hover:text-purple-400 transition-colors whitespace-nowrap text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>About</Link>
              <ThemeToggle />
              <Link to="/admin" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all whitespace-nowrap">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Space Videos & Animations
          </h1>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto mb-6 ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>
            Explore stunning space videos, GIFs, and animations from NASA and space agencies around the world
          </p>
          
          {/* Sharing tip message */}
          <div className={`inline-flex items-center gap-2 px-5 py-3 rounded-full ${theme === 'light' ? 'bg-teal-50 border border-teal-200' : 'bg-teal-500/10 border border-teal-500/30'}`}>
            <i className={`ri-share-forward-line ${theme === 'light' ? 'text-teal-600' : 'text-teal-400'}`}></i>
            <span className={`text-sm ${theme === 'light' ? 'text-teal-700' : 'text-teal-300'}`}>
              Share any video you love! <span className="font-semibold">3D models, NASA & space-related content</span> works best for our community.
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[44px] ${
              activeTab === 'browse'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : theme === 'light' ? 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200' : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <i className="ri-play-circle-line mr-2"></i>
            Browse Videos
          </button>
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[44px] ${
              activeTab === 'submit'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : theme === 'light' ? 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200' : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <i className="ri-upload-cloud-line mr-2"></i>
            Submit Video
          </button>
        </div>
      </div>

      {/* Browse Videos Tab */}
      {activeTab === 'browse' && (
        <>
          {/* Search and Filter */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className={`backdrop-blur-md rounded-2xl p-6 border ${theme === 'light' ? 'bg-white/70 border-slate-200' : 'bg-white/5 border-purple-500/30'}`}>
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <i className={`ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-xl ${theme === 'light' ? 'text-slate-400' : 'text-gray-400'}`}></i>
                  <input
                    type="text"
                    placeholder="Search videos, animations, GIFs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme === 'light' ? 'bg-white border-slate-300 text-slate-800 placeholder-slate-400' : 'bg-white/10 border-purple-500/30 text-white placeholder-gray-400'}`}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer min-h-[44px] ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                        : theme === 'light' ? 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Results Count */}
              <div className={`mt-4 ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                Showing {filteredVideos.length} {filteredVideos.length === 1 ? 'item' : 'items'}
              </div>
            </div>
          </div>

          {/* Video Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            {isLoading ? (
              <div className="text-center py-20">
                <i className="ri-loader-4-line text-6xl text-purple-400 animate-spin mb-4"></i>
                <p className={`text-xl ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>Loading videos...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map(video => (
                  <div
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`backdrop-blur-md rounded-2xl overflow-hidden border transition-all hover:shadow-xl hover:shadow-purple-500/30 cursor-pointer group ${theme === 'light' ? 'bg-white/80 border-slate-200 hover:border-purple-400' : 'bg-white/5 border-purple-500/30 hover:border-purple-500'}`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full h-48 overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      
                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                          video.type === 'video' ? 'bg-red-500/80' :
                          video.type === 'gif' ? 'bg-green-500/80' :
                          'bg-blue-500/80'
                        }`}>
                          {video.type.toUpperCase()}
                        </span>
                      </div>

                      {/* Duration */}
                      {video.duration && (
                        <div className="absolute bottom-3 right-3">
                          <span className="px-2 py-1 bg-black/80 rounded text-xs text-white">
                            {video.duration}
                          </span>
                        </div>
                      )}

                      {/* Play Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-purple-500/80 rounded-full flex items-center justify-center">
                          <i className="ri-play-fill text-3xl text-white"></i>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className={`text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>
                        {video.title}
                      </h3>
                      <p className={`text-sm mb-3 line-clamp-2 ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                        {video.description}
                      </p>
                      <div className={`flex items-center justify-between text-xs ${theme === 'light' ? 'text-slate-400' : 'text-gray-500'}`}>
                        <span className="flex items-center">
                          <i className="ri-folder-line mr-1"></i>
                          {video.category}
                        </span>
                        <span className="flex items-center">
                          <i className="ri-link mr-1"></i>
                          {video.source}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && filteredVideos.length === 0 && (
              <div className="text-center py-20">
                <i className={`ri-film-line text-6xl mb-4 ${theme === 'light' ? 'text-slate-400' : 'text-gray-600'}`}></i>
                <p className={`text-xl ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>No videos found matching your search</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Submit Video Tab */}
      {activeTab === 'submit' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className={`backdrop-blur-md rounded-2xl p-6 sm:p-8 border ${theme === 'light' ? 'bg-white/70 border-slate-200' : 'bg-white/5 border-purple-500/30'}`}>
            <div className="mb-6">
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Submit a YouTube Video</h2>
              <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-gray-400'}`}>
                Share space-related videos with the community. Your submission will be reviewed by an admin before appearing in the gallery.
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
                    Feel free to share any video, but content related to <strong>3D models, NASA, space exploration, astronomy, and science</strong> works best for our community. Educational content, documentaries, animations, and stunning space footage are always welcome!
                  </p>
                </div>
              </div>
            </div>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 flex items-center gap-3">
                <i className="ri-checkbox-circle-line text-xl"></i>
                <span>Video submitted successfully! Your submission is pending admin approval.</span>
              </div>
            )}

            {submitErrors.submit && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 flex items-center gap-3">
                <i className="ri-error-warning-line text-xl"></i>
                <span>{submitErrors.submit}</span>
              </div>
            )}

            <form onSubmit={handleSubmitVideo} className="space-y-6">
              {/* YouTube URL */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                  YouTube URL <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <i className={`ri-youtube-line absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'light' ? 'text-slate-400' : 'text-slate-400'}`}></i>
                  <input
                    type="text"
                    value={submitForm.youtubeUrl}
                    onChange={(e) => setSubmitForm({ ...submitForm, youtubeUrl: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[44px] ${theme === 'light' ? 'bg-white border-slate-300 text-slate-800 placeholder-slate-400' : 'bg-white/10 border-purple-500/30 text-white placeholder-slate-500'}`}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                {submitErrors.youtubeUrl && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <i className="ri-error-warning-line"></i>
                    {submitErrors.youtubeUrl}
                  </p>
                )}
              </div>

              {/* Video Title */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                  Video Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={submitForm.title}
                  onChange={(e) => setSubmitForm({ ...submitForm, title: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[44px] ${theme === 'light' ? 'bg-white border-slate-300 text-slate-800 placeholder-slate-400' : 'bg-white/10 border-purple-500/30 text-white placeholder-slate-500'}`}
                  placeholder="Enter video title"
                />
                {submitErrors.title && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <i className="ri-error-warning-line"></i>
                    {submitErrors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={submitForm.description}
                  onChange={(e) => setSubmitForm({ ...submitForm, description: e.target.value })}
                  rows={4}
                  maxLength={500}
                  className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none ${theme === 'light' ? 'bg-white border-slate-300 text-slate-800 placeholder-slate-400' : 'bg-white/10 border-purple-500/30 text-white placeholder-slate-500'}`}
                  placeholder="Describe the video content..."
                />
                <div className="flex justify-between mt-2">
                  {submitErrors.description ? (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      <i className="ri-error-warning-line"></i>
                      {submitErrors.description}
                    </p>
                  ) : (
                    <span></span>
                  )}
                  <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>{submitForm.description.length}/500</span>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                  Category <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSubmitForm({ ...submitForm, category })}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer min-h-[44px] ${
                        submitForm.category === category
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                          : theme === 'light'
                            ? 'bg-white text-slate-600 border border-slate-200 hover:border-purple-400'
                            : 'bg-white/10 text-gray-300 border border-purple-500/30 hover:border-purple-500/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Source/Credit */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                  Source/Credit <span className={`text-xs font-normal ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>(Optional)</span>
                </label>
                <input
                  type="text"
                  value={submitForm.source}
                  onChange={(e) => setSubmitForm({ ...submitForm, source: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[44px] ${theme === 'light' ? 'bg-white border-slate-300 text-slate-800 placeholder-slate-400' : 'bg-white/10 border-purple-500/30 text-white placeholder-slate-500'}`}
                  placeholder="e.g., NASA, ESA, SpaceX"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25 cursor-pointer min-h-[44px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin"></i>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-send-plane-fill"></i>
                      Submit Video
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className={`rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-gray-900 border-purple-500/30'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b ${theme === 'light' ? 'border-slate-200' : 'border-purple-500/30'}`}>
              <div>
                <h2 className={`text-2xl font-bold mb-1 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>{selectedVideo.title}</h2>
                <div className={`flex items-center space-x-4 text-sm ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                  <span className="flex items-center">
                    <i className="ri-folder-line mr-1"></i>
                    {selectedVideo.category}
                  </span>
                  {selectedVideo.duration && (
                    <span className="flex items-center">
                      <i className="ri-time-line mr-1"></i>
                      {selectedVideo.duration}
                    </span>
                  )}
                  <span className="flex items-center">
                    <i className="ri-link mr-1"></i>
                    {selectedVideo.source}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer min-h-[44px] min-w-[44px] ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-white/10 hover:bg-white/20 text-white'}`}
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Description */}
            <div className="p-6">
              <h3 className={`text-lg font-semibold mb-3 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Description</h3>
              <p className={`leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

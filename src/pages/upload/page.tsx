import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { uploadImage, saveModel, saveVideo } from '../../lib/storage';
import StarField from '../../components/base/StarField';
import ThemeToggle, { useTheme } from '../../components/feature/ThemeToggle';

const MODEL_CATEGORIES = [
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

const VIDEO_CATEGORIES = [
  'NASA Videos',
  'Space Documentaries',
  'Animations',
  'GIFs',
  'Educational',
  'Other'
];

export default function Upload() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'model' | 'video'>('model');
  
  // Model form state
  const [modelFormData, setModelFormData] = useState({
    name: '',
    description: '',
    category: 'Other'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [modelErrors, setModelErrors] = useState<Record<string, string>>({});
  const [isSubmittingModel, setIsSubmittingModel] = useState(false);
  const [modelSuccessMessage, setModelSuccessMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  // Video form state
  const [videoFormData, setVideoFormData] = useState({
    youtubeUrl: '',
    title: '',
    description: '',
    category: 'NASA Videos',
    source: ''
  });
  const [videoErrors, setVideoErrors] = useState<Record<string, string>>({});
  const [isSubmittingVideo, setIsSubmittingVideo] = useState(false);
  const [videoSuccessMessage, setVideoSuccessMessage] = useState('');

  const { theme } = useTheme();

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

  // Model form validation
  const validateModelForm = () => {
    const newErrors: Record<string, string> = {};

    if (!modelFormData.name.trim()) {
      newErrors.name = 'Model name is required';
    } else if (modelFormData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!modelFormData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (modelFormData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!selectedFile && !imagePreview) {
      newErrors.image = 'Please select an image file';
    }

    setModelErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Video form validation
  const validateVideoForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!videoFormData.youtubeUrl.trim()) {
      newErrors.youtubeUrl = 'YouTube URL is required';
    } else {
      const videoId = extractYouTubeId(videoFormData.youtubeUrl);
      if (!videoId) {
        newErrors.youtubeUrl = 'Please enter a valid YouTube URL or video ID';
      }
    }
    
    if (!videoFormData.title.trim()) {
      newErrors.title = 'Video title is required';
    } else if (videoFormData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!videoFormData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (videoFormData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setVideoErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    // Validate file type - only image files allowed
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setModelErrors({ ...modelErrors, image: 'Please upload an IMAGE file (JPG, PNG, GIF, or WebP). 3D model files (.obj, .fbx, .stl, etc.) are not supported. Upload a screenshot or render of your 3D model instead.' });
      return;
    }

    setSelectedFile(file);
    setModelErrors({ ...modelErrors, image: '' });

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Drag and Drop handlers
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

  const handleModelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateModelForm()) {
      return;
    }

    if (!selectedFile) {
      setModelErrors({ ...modelErrors, image: 'Please select an image file' });
      return;
    }

    setIsSubmittingModel(true);
    setModelSuccessMessage('');
    setUploadProgress(0);

    try {
      setUploadProgress(30);

      // Upload image to Supabase Storage
      const imageUrl = await uploadImage(selectedFile);

      setUploadProgress(60);

      // Save model data to Supabase database
      await saveModel({
        name: modelFormData.name.trim(),
        description: modelFormData.description.trim(),
        imageUrl,
        category: modelFormData.category
      });

      setUploadProgress(100);
      setModelSuccessMessage('Model uploaded successfully! Your submission is now pending admin approval. Once approved, it will appear in the gallery.');
      setModelFormData({ name: '', description: '', category: 'Other' });
      setSelectedFile(null);
      setImagePreview('');
      
      setTimeout(() => {
        navigate('/gallery');
      }, 4000);
    } catch (error) {
      console.error('Error uploading model:', error);
      setModelErrors({ submit: 'Failed to upload model. Please try again.' });
    } finally {
      setIsSubmittingModel(false);
      setUploadProgress(0);
    }
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateVideoForm()) {
      return;
    }
    
    setIsSubmittingVideo(true);
    setVideoSuccessMessage('');
    
    try {
      const videoId = extractYouTubeId(videoFormData.youtubeUrl);
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      await saveVideo({
        title: videoFormData.title.trim(),
        description: videoFormData.description.trim(),
        youtubeUrl: videoFormData.youtubeUrl.trim(),
        thumbnail,
        category: videoFormData.category,
        source: videoFormData.source.trim() || 'Community Submission'
      });
      
      setVideoSuccessMessage('Video submitted successfully! Your submission is now pending admin approval. Once approved, it will appear in the videos gallery.');
      setVideoFormData({
        youtubeUrl: '',
        title: '',
        description: '',
        category: 'NASA Videos',
        source: ''
      });
      
      setTimeout(() => {
        navigate('/videos');
      }, 4000);
    } catch (error) {
      console.error('Error submitting video:', error);
      setVideoErrors({ submit: 'Failed to submit video. Please try again.' });
    } finally {
      setIsSubmittingVideo(false);
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
              <Link to="/hunch" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>HUNCH Projects</Link>
              <Link to="/videos" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>Space Videos</Link>
              <Link to="/upload" className="text-sm text-teal-400 transition-colors whitespace-nowrap">Upload</Link>
              <Link to="/resources" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>Resources</Link>
              <Link to="/about" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>About</Link>
              <ThemeToggle />
              <Link to="/admin" className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg shadow-teal-500/20 whitespace-nowrap">Admin</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Upload Content */}
      <div className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className={`text-3xl sm:text-5xl font-bold mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Share Your Content</h1>
            <p className={`text-base sm:text-lg ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>Upload 3D model images or share YouTube videos with the community</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-3 mb-8 justify-center">
            <button
              onClick={() => setActiveTab('model')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[44px] ${
                activeTab === 'model'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/50'
                  : theme === 'light' ? 'bg-white/60 text-slate-600 hover:bg-white/80' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800/70'
              }`}
            >
              <i className="ri-image-line mr-2"></i>
              Upload 3D Model Image
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[44px] ${
                activeTab === 'video'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/50'
                  : theme === 'light' ? 'bg-white/60 text-slate-600 hover:bg-white/80' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800/70'
              }`}
            >
              <i className="ri-youtube-line mr-2"></i>
              Submit YouTube Video
            </button>
          </div>

          {/* 3D Model Upload Tab */}
          {activeTab === 'model' && (
            <div className={`backdrop-blur-xl border rounded-2xl p-6 sm:p-8 shadow-2xl ${theme === 'light' ? 'bg-white/60 border-slate-200 shadow-slate-200/50' : 'bg-slate-900/60 border-slate-700/50 shadow-black/20'}`}>
              <div className="mb-6">
                <h2 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Upload 3D Model Image</h2>
                <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm ${theme === 'light' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
                  <i className="ri-information-line"></i>
                  <span>Upload a <strong>screenshot or render</strong> of your 3D model (not the actual 3D file)</span>
                </div>
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
                      Feel free to share any image, but <strong>3D space-related models, NASA spacecraft, planets, and astronomy renders</strong> are especially appreciated by our community. Show off your creative work!
                    </p>
                  </div>
                </div>
              </div>

              {modelSuccessMessage && (
                <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/50 rounded-lg text-teal-400 flex items-center gap-3">
                  <i className="ri-checkbox-circle-line text-xl"></i>
                  <span>{modelSuccessMessage}</span>
                </div>
              )}

              {modelErrors.submit && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 flex items-center gap-3">
                  <i className="ri-error-warning-line text-xl"></i>
                  <span>{modelErrors.submit}</span>
                </div>
              )}

              <form onSubmit={handleModelSubmit} className="space-y-6">
                {/* Model Name */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                    Model Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <i className={`ri-cube-line absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'light' ? 'text-slate-400' : 'text-slate-400'}`}></i>
                    <input
                      type="text"
                      value={modelFormData.name}
                      onChange={(e) => setModelFormData({ ...modelFormData, name: e.target.value })}
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all min-h-[44px] ${theme === 'light' ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-800/50 border-slate-700 text-white'}`}
                      placeholder="Enter model name (e.g., Mars Rover, Space Station)"
                    />
                  </div>
                  {modelErrors.name && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <i className="ri-error-warning-line"></i>
                      {modelErrors.name}
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
                        onClick={() => setModelFormData({ ...modelFormData, category: category.id })}
                        className={`px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 min-h-[44px] ${
                          modelFormData.category === category.id
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30'
                            : theme === 'light'
                              ? 'bg-slate-100 text-slate-600 border border-slate-200 hover:border-teal-500/50 hover:text-teal-600'
                              : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-teal-500/50 hover:text-teal-400'
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
                    value={modelFormData.description}
                    onChange={(e) => setModelFormData({ ...modelFormData, description: e.target.value })}
                    rows={5}
                    maxLength={500}
                    className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all resize-none ${theme === 'light' ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-800/50 border-slate-700 text-white'}`}
                    placeholder="Describe your 3D model - what it represents, how it was created, etc."
                  />
                  <div className="flex justify-between mt-2">
                    {modelErrors.description ? (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <i className="ri-error-warning-line"></i>
                        {modelErrors.description}
                      </p>
                    ) : (
                      <span></span>
                    )}
                    <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>{modelFormData.description.length}/500</span>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                    Model Image <span className="text-red-400">*</span>
                  </label>
                  <p className={`text-xs mb-3 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                    <i className="ri-lightbulb-line text-amber-400 mr-1"></i>
                    Upload a <strong>screenshot, render, or photo</strong> of your 3D model. Actual 3D files (.obj, .fbx, .stl, .blend) are not supported.
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
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className={`flex items-center justify-center w-full px-4 py-10 border-2 border-dashed rounded-xl cursor-pointer transition-all group ${
                        isDragOver
                          ? 'border-teal-500 bg-teal-500/10 scale-[1.02]'
                          : theme === 'light' 
                            ? 'bg-slate-50 border-slate-300 hover:border-teal-500/50 hover:bg-slate-100' 
                            : 'bg-slate-800/50 border-slate-700 hover:border-teal-500/50 hover:bg-slate-800/70'
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
                          Supported formats: JPG, PNG, GIF, WebP (Any size)
                        </p>
                        <p className="text-xs text-amber-400 mt-2">
                          <i className="ri-alert-line mr-1"></i>
                          3D model files are NOT supported - upload an image only
                        </p>
                      </div>
                    </label>
                  </div>
                  {modelErrors.image && (
                    <p className="mt-2 text-sm text-red-400 flex items-start gap-1">
                      <i className="ri-error-warning-line mt-0.5"></i>
                      <span>{modelErrors.image}</span>
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

                {/* Upload Progress */}
                {isSubmittingModel && uploadProgress > 0 && (
                  <div className={`rounded-lg p-4 ${theme === 'light' ? 'bg-slate-100' : 'bg-slate-800/50'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm flex items-center gap-2 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        <i className="ri-upload-cloud-line animate-pulse"></i>
                        Uploading...
                      </span>
                      <span className="text-sm text-teal-400 font-semibold">{uploadProgress}%</span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-700'}`}>
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmittingModel}
                    className="w-full sm:flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] min-h-[44px] cursor-pointer"
                  >
                    {isSubmittingModel ? (
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
                  <Link
                    to="/gallery"
                    className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-lg transition-colors whitespace-nowrap text-center min-h-[44px] flex items-center justify-center ${theme === 'light' ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          )}

          {/* Video Upload Tab */}
          {activeTab === 'video' && (
            <div className={`backdrop-blur-xl border rounded-2xl p-6 sm:p-8 shadow-2xl ${theme === 'light' ? 'bg-white/60 border-slate-200 shadow-slate-200/50' : 'bg-slate-900/60 border-slate-700/50 shadow-black/20'}`}>
              <div className="mb-6">
                <h2 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Submit YouTube Video</h2>
                <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  Share space-related YouTube videos with the community. Your submission will be reviewed by an admin before appearing in the videos gallery.
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

              {videoSuccessMessage && (
                <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/50 rounded-lg text-teal-400 flex items-center gap-3">
                  <i className="ri-checkbox-circle-line text-xl"></i>
                  <span>{videoSuccessMessage}</span>
                </div>
              )}

              {videoErrors.submit && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 flex items-center gap-3">
                  <i className="ri-error-warning-line text-xl"></i>
                  <span>{videoErrors.submit}</span>
                </div>
              )}

              <form onSubmit={handleVideoSubmit} className="space-y-6">
                {/* YouTube URL */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                    YouTube URL <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <i className={`ri-youtube-line absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'light' ? 'text-slate-400' : 'text-slate-400'}`}></i>
                    <input
                      type="text"
                      value={videoFormData.youtubeUrl}
                      onChange={(e) => setVideoFormData({ ...videoFormData, youtubeUrl: e.target.value })}
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all min-h-[44px] ${theme === 'light' ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-800/50 border-slate-700 text-white'}`}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                  {videoErrors.youtubeUrl && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <i className="ri-error-warning-line"></i>
                      {videoErrors.youtubeUrl}
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
                    value={videoFormData.title}
                    onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all min-h-[44px] ${theme === 'light' ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-800/50 border-slate-700 text-white'}`}
                    placeholder="Enter video title"
                  />
                  {videoErrors.title && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <i className="ri-error-warning-line"></i>
                      {videoErrors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={videoFormData.description}
                    onChange={(e) => setVideoFormData({ ...videoFormData, description: e.target.value })}
                    rows={4}
                    maxLength={500}
                    className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all resize-none ${theme === 'light' ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-800/50 border-slate-700 text-white'}`}
                    placeholder="Describe the video content..."
                  />
                  <div className="flex justify-between mt-2">
                    {videoErrors.description ? (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <i className="ri-error-warning-line"></i>
                        {videoErrors.description}
                      </p>
                    ) : (
                      <span></span>
                    )}
                    <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>{videoFormData.description.length}/500</span>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`}>
                    Category <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {VIDEO_CATEGORIES.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setVideoFormData({ ...videoFormData, category })}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer min-h-[44px] ${
                          videoFormData.category === category
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30'
                            : theme === 'light'
                              ? 'bg-white text-slate-600 border border-slate-200 hover:border-teal-500/50'
                              : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-teal-500/50'
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
                    Source/Credit <span className={`text-xs font-normal ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={videoFormData.source}
                    onChange={(e) => setVideoFormData({ ...videoFormData, source: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all min-h-[44px] ${theme === 'light' ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-800/50 border-slate-700 text-white'}`}
                    placeholder="e.g., NASA, ESA, SpaceX"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmittingVideo}
                    className="w-full sm:flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] min-h-[44px] cursor-pointer"
                  >
                    {isSubmittingVideo ? (
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
                  <Link
                    to="/videos"
                    className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-lg transition-colors whitespace-nowrap text-center min-h-[44px] flex items-center justify-center ${theme === 'light' ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

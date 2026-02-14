import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getModels, deleteModel, updateModel, saveModel, uploadImage, deleteImage, clearAdminSession, getAdminSession, getPendingModels, updateModelStatus, type Model, getVideos, getPendingVideos, deleteVideo, updateVideo, saveVideo, updateVideoStatus, type Video } from '../../../lib/storage';
import StarField from '../../../components/base/StarField';

const CATEGORIES = [
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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [models, setModels] = useState<Model[]>([]);
  const [pendingModels, setPendingModels] = useState<Model[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [pendingVideos, setPendingVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending-models' | 'pending-videos' | 'all-models' | 'all-videos'>('pending-models');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isCreatingModel, setIsCreatingModel] = useState(false);
  const [isCreatingVideo, setIsCreatingVideo] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Other',
    imageFile: null as File | null,
    imagePreview: '',
    removeCurrentImage: false
  });
  const [videoFormData, setVideoFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    category: 'NASA Videos',
    source: '',
    duration: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchAllData();
  }, []);

  const checkAuth = () => {
    if (!getAdminSession()) {
      navigate('/admin');
    }
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [allModels, pending, allVideos, pendingVids] = await Promise.all([
        getModels(),
        getPendingModels(),
        getVideos(),
        getPendingVideos()
      ]);
      setModels(allModels);
      setPendingModels(pending);
      setVideos(allVideos);
      setPendingVideos(pendingVids);
    } catch (error) {
      console.error('Error fetching data:', error);
      showNotification('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    clearAdminSession();
    navigate('/admin');
  };

  // Model handlers
  const handleApproveModel = async (id: string) => {
    setProcessingId(id);
    try {
      await updateModelStatus(id, 'approved');
      showNotification('success', 'Model approved and added to gallery!');
      await fetchAllData();
    } catch (error) {
      console.error('Error approving model:', error);
      showNotification('error', 'Failed to approve model');
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectModel = async (id: string) => {
    setProcessingId(id);
    try {
      await deleteModel(id);
      showNotification('success', 'Model rejected and removed');
      await fetchAllData();
    } catch (error) {
      console.error('Error rejecting model:', error);
      showNotification('error', 'Failed to reject model');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteModel = async (id: string) => {
    setDeleting(true);
    try {
      await deleteModel(id);
      setModels(models.filter(model => model.id !== id));
      setPendingModels(pendingModels.filter(model => model.id !== id));
      setDeleteConfirm(null);
      showNotification('success', 'Model deleted successfully');
    } catch (error) {
      console.error('Error deleting model:', error);
      showNotification('error', 'Failed to delete model');
    } finally {
      setDeleting(false);
    }
  };

  const handleEditModel = (model: Model) => {
    setEditingModel(model);
    setFormData({
      name: model.name,
      description: model.description,
      category: model.category || 'Other',
      imageFile: null,
      imagePreview: model.imageUrl,
      removeCurrentImage: false
    });
  };

  const handleCreateModel = () => {
    setIsCreatingModel(true);
    setFormData({
      name: '',
      description: '',
      category: 'Other',
      imageFile: null,
      imagePreview: '',
      removeCurrentImage: false
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        showNotification('error', 'Please upload an image file (JPG, PNG, GIF, or WebP)');
        return;
      }
      
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
        removeCurrentImage: false
      });
    }
  };

  const handleRemoveImage = async () => {
    if (editingModel && editingModel.imageUrl && !formData.imageFile) {
      setFormData({
        ...formData,
        imageFile: null,
        imagePreview: '',
        removeCurrentImage: true
      });
    } else {
      setFormData({
        ...formData,
        imageFile: null,
        imagePreview: editingModel ? editingModel.imageUrl : ''
      });
    }
  };

  const handleSubmitModel = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      showNotification('error', 'Please fill in all fields');
      return;
    }

    if (isCreatingModel && !formData.imageFile) {
      showNotification('error', 'Please select an image');
      return;
    }

    if (editingModel && formData.removeCurrentImage && !formData.imageFile) {
      showNotification('error', 'Please select a new image to replace the current one');
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = editingModel?.imageUrl || '';

      if (editingModel && formData.imageFile && editingModel.imageUrl) {
        try {
          await deleteImage(editingModel.imageUrl);
        } catch (err) {
          console.error('Error deleting old image:', err);
        }
      }

      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile);
      }

      if (editingModel) {
        await updateModel(editingModel.id, {
          name: formData.name,
          description: formData.description,
          category: formData.category,
          imageUrl: formData.imageFile ? imageUrl : undefined
        });
        showNotification('success', 'Model updated successfully');
      } else {
        await saveModel({
          name: formData.name,
          description: formData.description,
          category: formData.category,
          imageUrl
        });
        showNotification('success', 'Model created successfully');
      }

      await fetchAllData();
      closeModelModal();
    } catch (error) {
      console.error('Error saving model:', error);
      showNotification('error', `Failed to ${editingModel ? 'update' : 'create'} model`);
    } finally {
      setSubmitting(false);
    }
  };

  const closeModelModal = () => {
    setEditingModel(null);
    setIsCreatingModel(false);
    setFormData({
      name: '',
      description: '',
      category: 'Other',
      imageFile: null,
      imagePreview: '',
      removeCurrentImage: false
    });
  };

  // Video handlers
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

  const handleApproveVideo = async (id: string) => {
    setProcessingId(id);
    try {
      await updateVideoStatus(id, 'approved');
      showNotification('success', 'Video approved and added to gallery!');
      await fetchAllData();
    } catch (error) {
      console.error('Error approving video:', error);
      showNotification('error', 'Failed to approve video');
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectVideo = async (id: string) => {
    setProcessingId(id);
    try {
      await deleteVideo(id);
      showNotification('success', 'Video rejected and removed');
      await fetchAllData();
    } catch (error) {
      console.error('Error rejecting video:', error);
      showNotification('error', 'Failed to reject video');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    setDeleting(true);
    try {
      await deleteVideo(id);
      setVideos(videos.filter(video => video.id !== id));
      setPendingVideos(pendingVideos.filter(video => video.id !== id));
      setDeleteConfirm(null);
      showNotification('success', 'Video deleted successfully');
    } catch (error) {
      console.error('Error deleting video:', error);
      showNotification('error', 'Failed to delete video');
    } finally {
      setDeleting(false);
    }
  };

  const handleEditVideo = (video: Video) => {
    setEditingVideo(video);
    setVideoFormData({
      title: video.title,
      description: video.description,
      youtubeUrl: video.youtubeUrl,
      category: video.category,
      source: video.source || '',
      duration: video.duration || ''
    });
  };

  const handleCreateVideo = () => {
    setIsCreatingVideo(true);
    setVideoFormData({
      title: '',
      description: '',
      youtubeUrl: '',
      category: 'NASA Videos',
      source: '',
      duration: ''
    });
  };

  const handleSubmitVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFormData.title.trim() || !videoFormData.description.trim() || !videoFormData.youtubeUrl.trim()) {
      showNotification('error', 'Please fill in all required fields');
      return;
    }

    const videoId = extractYouTubeId(videoFormData.youtubeUrl);
    if (!videoId) {
      showNotification('error', 'Please enter a valid YouTube URL or video ID');
      return;
    }

    setSubmitting(true);

    try {
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

      if (editingVideo) {
        await updateVideo(editingVideo.id, {
          title: videoFormData.title.trim(),
          description: videoFormData.description.trim(),
          youtubeUrl: videoFormData.youtubeUrl.trim(),
          thumbnail,
          category: videoFormData.category,
          source: videoFormData.source.trim(),
          duration: videoFormData.duration.trim()
        });
        showNotification('success', 'Video updated successfully');
      } else {
        await saveVideo({
          title: videoFormData.title.trim(),
          description: videoFormData.description.trim(),
          youtubeUrl: videoFormData.youtubeUrl.trim(),
          thumbnail,
          category: videoFormData.category,
          source: videoFormData.source.trim() || 'Admin',
          duration: videoFormData.duration.trim()
        });
        showNotification('success', 'Video created successfully');
      }

      await fetchAllData();
      closeVideoModal();
    } catch (error) {
      console.error('Error saving video:', error);
      showNotification('error', `Failed to ${editingVideo ? 'update' : 'create'} video`);
    } finally {
      setSubmitting(false);
    }
  };

  const closeVideoModal = () => {
    setEditingVideo(null);
    setIsCreatingVideo(false);
    setVideoFormData({
      title: '',
      description: '',
      youtubeUrl: '',
      category: 'NASA Videos',
      source: '',
      duration: ''
    });
  };

  const getCategoryIcon = (category: string) => {
    const cat = CATEGORIES.find(c => c.id === category);
    return cat?.icon || 'ri-more-line';
  };

  const approvedModels = models.filter(m => m.status === 'approved');
  const approvedVideos = videos.filter(v => v.status === 'approved');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Star Field Animation */}
      <StarField />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative">
                <i className="ri-rocket-2-line text-2xl sm:text-3xl text-teal-400 group-hover:animate-bounce"></i>
                <div className="absolute inset-0 bg-teal-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-base sm:text-xl font-bold text-white">NASA DSLM Admin</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/" className="hidden sm:block text-sm text-slate-300 hover:text-teal-400 transition-colors whitespace-nowrap">Home</Link>
              <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-2 bg-red-500/90 text-white text-xs sm:text-sm rounded-lg hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 whitespace-nowrap flex items-center gap-1 sm:gap-2 cursor-pointer min-h-[44px]"
              >
                <i className="ri-logout-box-line"></i>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 sm:top-24 right-3 sm:right-6 left-3 sm:left-auto z-50 animate-slide-in">
          <div className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-2xl flex items-center gap-2 sm:gap-3 backdrop-blur-xl border ${
            notification.type === 'success' 
              ? 'bg-teal-500/90 text-white border-teal-400/50' 
              : 'bg-red-500/90 text-white border-red-400/50'
          }`}>
            <i className={`text-lg sm:text-xl ${
              notification.type === 'success' 
                ? 'ri-checkbox-circle-line' 
                : 'ri-error-warning-line'
            }`}></i>
            <span className="font-semibold text-sm sm:text-base">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      <div className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">Admin Dashboard</h1>
              <p className="text-sm sm:text-base text-slate-400">Manage uploads and approve submissions</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto flex-wrap">
              <div className="flex-1 sm:flex-none text-center bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl px-4 sm:px-5 py-3">
                <div className="text-xl sm:text-2xl font-bold text-teal-400">{approvedModels.length}</div>
                <div className="text-xs text-slate-400">Models</div>
              </div>
              <div className="flex-1 sm:flex-none text-center bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl px-4 sm:px-5 py-3">
                <div className="text-xl sm:text-2xl font-bold text-purple-400">{approvedVideos.length}</div>
                <div className="text-xs text-slate-400">Videos</div>
              </div>
              <div className="flex-1 sm:flex-none text-center bg-amber-500/10 backdrop-blur-sm border border-amber-500/30 rounded-xl px-4 sm:px-5 py-3">
                <div className="text-xl sm:text-2xl font-bold text-amber-400">{pendingModels.length + pendingVideos.length}</div>
                <div className="text-xs text-amber-400/80">Pending</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 p-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('pending-models')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer min-h-[44px] flex items-center gap-2 ${
                activeTab === 'pending-models'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <i className="ri-time-line"></i>
              <span className="hidden sm:inline">Pending Models</span>
              <span className="sm:hidden">Models</span>
              {pendingModels.length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === 'pending-models' ? 'bg-white/20' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {pendingModels.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('pending-videos')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer min-h-[44px] flex items-center gap-2 ${
                activeTab === 'pending-videos'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <i className="ri-time-line"></i>
              <span className="hidden sm:inline">Pending Videos</span>
              <span className="sm:hidden">Videos</span>
              {pendingVideos.length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === 'pending-videos' ? 'bg-white/20' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {pendingVideos.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('all-models')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer min-h-[44px] flex items-center gap-2 ${
                activeTab === 'all-models'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <i className="ri-gallery-line"></i>
              <span className="hidden sm:inline">All Models</span>
              <span className="sm:hidden">Models</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'all-models' ? 'bg-white/20' : 'bg-slate-700'
              }`}>
                {models.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('all-videos')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer min-h-[44px] flex items-center gap-2 ${
                activeTab === 'all-videos'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <i className="ri-play-circle-line"></i>
              <span className="hidden sm:inline">All Videos</span>
              <span className="sm:hidden">Videos</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'all-videos' ? 'bg-white/20' : 'bg-slate-700'
              }`}>
                {videos.length}
              </span>
            </button>
          </div>

          {/* Create Buttons */}
          <div className="flex gap-3 mb-6">
            {(activeTab === 'all-models' || activeTab === 'pending-models') && (
              <button
                onClick={handleCreateModel}
                className="px-4 sm:px-5 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] text-sm cursor-pointer min-h-[44px]"
              >
                <i className="ri-add-line text-lg"></i>
                Create Model
              </button>
            )}
            {(activeTab === 'all-videos' || activeTab === 'pending-videos') && (
              <button
                onClick={handleCreateVideo}
                className="px-4 sm:px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] text-sm cursor-pointer min-h-[44px]"
              >
                <i className="ri-add-line text-lg"></i>
                Create Video
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16 sm:py-20">
              <div className="relative inline-block">
                <i className="ri-loader-4-line text-4xl sm:text-5xl text-teal-400 animate-spin"></i>
                <div className="absolute inset-0 bg-teal-400/20 blur-xl rounded-full"></div>
              </div>
              <p className="text-sm sm:text-base text-slate-400 mt-4">Loading...</p>
            </div>
          )}

          {/* Pending Models Tab */}
          {!loading && activeTab === 'pending-models' && (
            <>
              {pendingModels.length === 0 ? (
                <div className="text-center py-16 sm:py-20 bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-teal-500/10 rounded-full flex items-center justify-center">
                    <i className="ri-checkbox-circle-line text-4xl sm:text-5xl text-teal-400"></i>
                  </div>
                  <p className="text-lg sm:text-xl text-white mb-2">All caught up!</p>
                  <p className="text-sm text-slate-400">No pending model submissions to review</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="ri-alert-line text-amber-400"></i>
                    <p className="text-sm text-slate-400">
                      Review model submissions before they appear in the public gallery
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {pendingModels.map((model) => (
                      <div
                        key={model.id}
                        className="bg-slate-900/60 backdrop-blur-xl border border-amber-500/30 rounded-2xl overflow-hidden shadow-xl shadow-black/10 flex flex-col sm:flex-row"
                      >
                        <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-slate-800 flex-shrink-0">
                          <img
                            src={model.imageUrl}
                            alt={model.name}
                            className="w-full h-full object-cover object-top"
                          />
                          <div className="absolute top-2 left-2 px-2 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1">
                            <i className="ri-time-line"></i>
                            Pending
                          </div>
                        </div>
                        
                        <div className="flex-1 p-4 sm:p-5 flex flex-col">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">{model.name}</h3>
                            <p className="text-sm text-slate-400 mb-3 line-clamp-3">{model.description}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                              <span className="flex items-center gap-1 px-2 py-1 bg-slate-800/50 rounded">
                                <i className={getCategoryIcon(model.category)}></i>
                                {model.category}
                              </span>
                              <span className="flex items-center gap-1">
                                <i className="ri-calendar-line"></i>
                                {new Date(model.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 sm:gap-3">
                            <button
                              onClick={() => handleApproveModel(model.id)}
                              disabled={processingId === model.id}
                              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg shadow-teal-500/25 disabled:opacity-50 cursor-pointer min-h-[44px] flex items-center justify-center gap-2"
                            >
                              {processingId === model.id ? (
                                <i className="ri-loader-4-line animate-spin"></i>
                              ) : (
                                <>
                                  <i className="ri-check-line"></i>
                                  Approve
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleRejectModel(model.id)}
                              disabled={processingId === model.id}
                              className="flex-1 px-4 py-2.5 bg-red-500/10 text-red-400 text-sm font-semibold rounded-lg hover:bg-red-500/20 border border-red-500/30 transition-all disabled:opacity-50 cursor-pointer min-h-[44px] flex items-center justify-center gap-2"
                            >
                              {processingId === model.id ? (
                                <i className="ri-loader-4-line animate-spin"></i>
                              ) : (
                                <>
                                  <i className="ri-close-line"></i>
                                  Reject
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Pending Videos Tab */}
          {!loading && activeTab === 'pending-videos' && (
            <>
              {pendingVideos.length === 0 ? (
                <div className="text-center py-16 sm:py-20 bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <i className="ri-checkbox-circle-line text-4xl sm:text-5xl text-purple-400"></i>
                  </div>
                  <p className="text-lg sm:text-xl text-white mb-2">All caught up!</p>
                  <p className="text-sm text-slate-400">No pending video submissions to review</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="ri-alert-line text-amber-400"></i>
                    <p className="text-sm text-slate-400">
                      Review video submissions before they appear in the public gallery
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {pendingVideos.map((video) => {
                      const videoId = extractYouTubeId(video.youtubeUrl);
                      const thumbnail = video.thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                      
                      return (
                        <div
                          key={video.id}
                          className="bg-slate-900/60 backdrop-blur-xl border border-amber-500/30 rounded-2xl overflow-hidden shadow-xl shadow-black/10 flex flex-col sm:flex-row"
                        >
                          <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-slate-800 flex-shrink-0">
                            <img
                              src={thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 px-2 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1">
                              <i className="ri-time-line"></i>
                              Pending
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 bg-red-500/80 rounded-full flex items-center justify-center">
                                <i className="ri-play-fill text-2xl text-white"></i>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1 p-4 sm:p-5 flex flex-col">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
                              <p className="text-sm text-slate-400 mb-3 line-clamp-3">{video.description}</p>
                              <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                                <span className="flex items-center gap-1 px-2 py-1 bg-slate-800/50 rounded">
                                  <i className="ri-folder-line"></i>
                                  {video.category}
                                </span>
                                <span className="flex items-center gap-1">
                                  <i className="ri-calendar-line"></i>
                                  {new Date(video.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 sm:gap-3">
                              <button
                                onClick={() => handleApproveVideo(video.id)}
                                disabled={processingId === video.id}
                                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 cursor-pointer min-h-[44px] flex items-center justify-center gap-2"
                              >
                                {processingId === video.id ? (
                                  <i className="ri-loader-4-line animate-spin"></i>
                                ) : (
                                  <>
                                    <i className="ri-check-line"></i>
                                    Approve
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleRejectVideo(video.id)}
                                disabled={processingId === video.id}
                                className="flex-1 px-4 py-2.5 bg-red-500/10 text-red-400 text-sm font-semibold rounded-lg hover:bg-red-500/20 border border-red-500/30 transition-all disabled:opacity-50 cursor-pointer min-h-[44px] flex items-center justify-center gap-2"
                              >
                                {processingId === video.id ? (
                                  <i className="ri-loader-4-line animate-spin"></i>
                                ) : (
                                  <>
                                    <i className="ri-close-line"></i>
                                    Reject
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* All Models Tab */}
          {!loading && activeTab === 'all-models' && (
            <>
              {models.length === 0 ? (
                <div className="text-center py-16 sm:py-20 bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-slate-800/50 rounded-full flex items-center justify-center">
                    <i className="ri-inbox-line text-4xl sm:text-5xl text-slate-600"></i>
                  </div>
                  <p className="text-lg sm:text-xl text-slate-400 mb-4 sm:mb-6 px-4">No models to manage</p>
                  <button
                    onClick={handleCreateModel}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all inline-flex items-center gap-2 whitespace-nowrap shadow-lg shadow-teal-500/25 text-sm sm:text-base cursor-pointer min-h-[44px]"
                  >
                    <i className="ri-add-line text-lg sm:text-xl"></i>
                    Create Your First Model
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      className={`bg-slate-900/60 backdrop-blur-xl border rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all group shadow-xl shadow-black/10 ${
                        model.status === 'pending' ? 'border-amber-500/30' : 'border-slate-700/50'
                      }`}
                    >
                      <div className="relative w-full h-40 sm:h-48 bg-slate-800 overflow-hidden">
                        <img
                          src={model.imageUrl}
                          alt={model.name}
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className={`absolute top-2 left-2 px-2 py-1 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1 ${
                          model.status === 'pending' ? 'bg-amber-500/90' : 'bg-teal-500/90'
                        }`}>
                          <i className={model.status === 'pending' ? 'ri-time-line' : 'ri-checkbox-circle-line'}></i>
                          {model.status === 'pending' ? 'Pending' : 'Approved'}
                        </div>
                        <div className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1">
                          <i className={`${getCategoryIcon(model.category)} text-xs`}></i>
                          <span>{model.category || 'Other'}</span>
                        </div>
                      </div>
                      <div className="p-4 sm:p-5">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-2 truncate">{model.name}</h3>
                        <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4 line-clamp-2">{model.description}</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <i className="ri-calendar-line"></i>
                            {new Date(model.createdAt).toLocaleDateString()}
                          </span>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            {model.status === 'pending' && (
                              <button
                                onClick={() => handleApproveModel(model.id)}
                                disabled={processingId === model.id}
                                className="flex-1 sm:flex-none px-3 py-1.5 bg-teal-500/10 text-teal-400 text-xs sm:text-sm font-semibold rounded-lg hover:bg-teal-500/20 transition-colors whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer min-h-[36px] disabled:opacity-50"
                              >
                                <i className="ri-check-line"></i>
                                Approve
                              </button>
                            )}
                            <button
                              onClick={() => handleEditModel(model)}
                              className="flex-1 sm:flex-none px-3 py-1.5 bg-teal-500/10 text-teal-400 text-xs sm:text-sm font-semibold rounded-lg hover:bg-teal-500/20 transition-colors whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer min-h-[36px]"
                            >
                              <i className="ri-edit-line"></i>
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(model.id)}
                              className="flex-1 sm:flex-none px-3 py-1.5 bg-red-500/10 text-red-400 text-xs sm:text-sm font-semibold rounded-lg hover:bg-red-500/20 transition-colors whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer min-h-[36px]"
                            >
                              <i className="ri-delete-bin-line"></i>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* All Videos Tab */}
          {!loading && activeTab === 'all-videos' && (
            <>
              {videos.length === 0 ? (
                <div className="text-center py-16 sm:py-20 bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-slate-800/50 rounded-full flex items-center justify-center">
                    <i className="ri-inbox-line text-4xl sm:text-5xl text-slate-600"></i>
                  </div>
                  <p className="text-lg sm:text-xl text-slate-400 mb-4 sm:mb-6 px-4">No videos to manage</p>
                  <button
                    onClick={handleCreateVideo}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all inline-flex items-center gap-2 whitespace-nowrap shadow-lg shadow-purple-500/25 text-sm sm:text-base cursor-pointer min-h-[44px]"
                  >
                    <i className="ri-add-line text-lg sm:text-xl"></i>
                    Create Your First Video
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {videos.map((video) => {
                    const videoId = extractYouTubeId(video.youtubeUrl);
                    const thumbnail = video.thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                    
                    return (
                      <div
                        key={video.id}
                        className={`bg-slate-900/60 backdrop-blur-xl border rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all group shadow-xl shadow-black/10 ${
                          video.status === 'pending' ? 'border-amber-500/30' : 'border-slate-700/50'
                        }`}
                      >
                        <div className="relative w-full h-40 sm:h-48 bg-slate-800 overflow-hidden">
                          <img
                            src={thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className={`absolute top-2 left-2 px-2 py-1 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1 ${
                            video.status === 'pending' ? 'bg-amber-500/90' : 'bg-purple-500/90'
                          }`}>
                            <i className={video.status === 'pending' ? 'ri-time-line' : 'ri-checkbox-circle-line'}></i>
                            {video.status === 'pending' ? 'Pending' : 'Approved'}
                          </div>
                          <div className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1">
                            <i className="ri-folder-line text-xs"></i>
                            <span>{video.category}</span>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 bg-red-500/80 rounded-full flex items-center justify-center">
                              <i className="ri-play-fill text-2xl text-white"></i>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 sm:p-5">
                          <h3 className="text-base sm:text-lg font-bold text-white mb-2 truncate">{video.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4 line-clamp-2">{video.description}</p>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <i className="ri-calendar-line"></i>
                              {new Date(video.createdAt).toLocaleDateString()}
                            </span>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                              {video.status === 'pending' && (
                                <button
                                  onClick={() => handleApproveVideo(video.id)}
                                  disabled={processingId === video.id}
                                  className="flex-1 sm:flex-none px-3 py-1.5 bg-purple-500/10 text-purple-400 text-xs sm:text-sm font-semibold rounded-lg hover:bg-purple-500/20 transition-colors whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer min-h-[36px] disabled:opacity-50"
                                >
                                  <i className="ri-check-line"></i>
                                  Approve
                                </button>
                              )}
                              <button
                                onClick={() => handleEditVideo(video)}
                                className="flex-1 sm:flex-none px-3 py-1.5 bg-purple-500/10 text-purple-400 text-xs sm:text-sm font-semibold rounded-lg hover:bg-purple-500/20 transition-colors whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer min-h-[36px]"
                              >
                                <i className="ri-edit-line"></i>
                                Edit
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(video.id)}
                                className="flex-1 sm:flex-none px-3 py-1.5 bg-red-500/10 text-red-400 text-xs sm:text-sm font-semibold rounded-lg hover:bg-red-500/20 transition-colors whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer min-h-[36px]"
                              >
                                <i className="ri-delete-bin-line"></i>
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create/Edit Model Modal */}
      {(editingModel || isCreatingModel) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 sm:px-6 overflow-y-auto py-6 sm:py-8">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 max-w-2xl w-full my-6 sm:my-8 shadow-2xl shadow-black/30 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <i className={`text-teal-400 ${editingModel ? 'ri-edit-line' : 'ri-add-line'}`}></i>
                </div>
                <span className="text-base sm:text-2xl">{editingModel ? 'Edit Model' : 'Create New Model'}</span>
              </h3>
              <button
                onClick={closeModelModal}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all cursor-pointer min-h-[44px] min-w-[44px]"
              >
                <i className="ri-close-line text-xl sm:text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmitModel} className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Model Name
                </label>
                <div className="relative">
                  <i className="ri-cube-line absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all min-h-[44px]"
                    placeholder="Enter model name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: category.id })}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 min-h-[40px] ${
                        formData.category === category.id
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30'
                          : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-teal-500/50 hover:text-teal-400'
                      }`}
                    >
                      <i className={`${category.icon} text-sm`}></i>
                      <span className="truncate">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all resize-none"
                  placeholder="Enter model description"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Model Image {editingModel && <span className="text-slate-400 font-normal text-xs">(Upload new to replace current)</span>}
                </label>
                <p className="text-xs text-slate-400 mb-3">
                  <i className="ri-lightbulb-line text-amber-400 mr-1"></i>
                  Upload a screenshot or render of your 3D model (JPG, PNG, GIF, WebP)
                </p>
                
                {formData.imagePreview ? (
                  <div className="relative group">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-full h-48 sm:h-64 object-cover object-top rounded-xl border border-slate-700"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3 sm:gap-4">
                      <label className="px-3 sm:px-4 py-2 bg-teal-500 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-teal-600 transition-colors cursor-pointer flex items-center gap-1 sm:gap-2 min-h-[40px]">
                        <i className="ri-image-edit-line"></i>
                        <span className="hidden sm:inline">Replace Image</span>
                        <span className="sm:hidden">Replace</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      {formData.imageFile && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="px-3 sm:px-4 py-2 bg-red-500 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1 sm:gap-2 cursor-pointer min-h-[40px]"
                        >
                          <i className="ri-close-line"></i>
                          Cancel
                        </button>
                      )}
                    </div>
                    {formData.imageFile && (
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-1 bg-teal-500 text-white text-xs font-semibold rounded-full">
                        New Image Selected
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="block w-full h-48 sm:h-64 border-2 border-dashed border-slate-700 rounded-xl hover:border-teal-500 transition-colors cursor-pointer group">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 group-hover:text-teal-400 transition-colors">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 bg-slate-800/50 rounded-full flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                        <i className="ri-image-add-line text-3xl sm:text-4xl"></i>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold">Click to select image</p>
                      <p className="text-xs mt-2 text-slate-500">JPG, PNG, GIF, or WebP</p>
                    </div>
                  </label>
                )}
              </div>

              <div className="flex gap-3 sm:gap-4 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={closeModelModal}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 whitespace-nowrap text-sm sm:text-base cursor-pointer min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all disabled:opacity-50 whitespace-nowrap shadow-lg shadow-teal-500/25 text-sm sm:text-base cursor-pointer min-h-[44px]"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin"></i>
                      {editingModel ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <i className={editingModel ? 'ri-check-line' : 'ri-add-line'}></i>
                      {editingModel ? 'Update Model' : 'Create Model'}
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create/Edit Video Modal */}
      {(editingVideo || isCreatingVideo) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 sm:px-6 overflow-y-auto py-6 sm:py-8">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 max-w-2xl w-full my-6 sm:my-8 shadow-2xl shadow-black/30 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <i className={`text-purple-400 ${editingVideo ? 'ri-edit-line' : 'ri-add-line'}`}></i>
                </div>
                <span className="text-base sm:text-2xl">{editingVideo ? 'Edit Video' : 'Create New Video'}</span>
              </h3>
              <button
                onClick={closeVideoModal}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all cursor-pointer min-h-[44px] min-w-[44px]"
              >
                <i className="ri-close-line text-xl sm:text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmitVideo} className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  YouTube URL <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <i className="ri-youtube-line absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <input
                    type="text"
                    value={videoFormData.youtubeUrl}
                    onChange={(e) => setVideoFormData({ ...videoFormData, youtubeUrl: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[44px]"
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Video Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={videoFormData.title}
                  onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[44px]"
                  placeholder="Enter video title"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={videoFormData.description}
                  onChange={(e) => setVideoFormData({ ...videoFormData, description: e.target.value })}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                  placeholder="Describe the video content..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Category <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {VIDEO_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setVideoFormData({ ...videoFormData, category })}
                      className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer min-h-[44px] ${
                        videoFormData.category === category
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                          : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-purple-500/50 hover:text-purple-400'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Source/Credit <span className="text-xs font-normal text-slate-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={videoFormData.source}
                  onChange={(e) => setVideoFormData({ ...videoFormData, source: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[44px]"
                  placeholder="e.g., NASA, ESA, SpaceX"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Duration <span className="text-xs font-normal text-slate-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={videoFormData.duration}
                  onChange={(e) => setVideoFormData({ ...videoFormData, duration: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all min-h-[44px]"
                  placeholder="e.g., 5:30"
                />
              </div>

              <div className="flex gap-3 sm:gap-4 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={closeVideoModal}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 whitespace-nowrap text-sm sm:text-base cursor-pointer min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 whitespace-nowrap shadow-lg shadow-purple-500/25 text-sm sm:text-base cursor-pointer min-h-[44px]"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin"></i>
                      {editingVideo ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <i className={editingVideo ? 'ri-check-line' : 'ri-add-line'}></i>
                      {editingVideo ? 'Update Video' : 'Create Video'}
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 sm:px-6">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-black/30">
            <div className="text-center mb-5 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="ri-delete-bin-line text-3xl sm:text-4xl text-red-400"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Delete Item?</h3>
              <p className="text-sm sm:text-base text-slate-400">This action cannot be undone. The item will be permanently deleted.</p>
            </div>
            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 whitespace-nowrap text-sm sm:text-base cursor-pointer min-h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (activeTab === 'all-videos' || activeTab === 'pending-videos') {
                    handleDeleteVideo(deleteConfirm);
                  } else {
                    handleDeleteModel(deleteConfirm);
                  }
                }}
                disabled={deleting}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 whitespace-nowrap shadow-lg shadow-red-500/25 text-sm sm:text-base cursor-pointer min-h-[44px]"
              >
                {deleting ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="ri-loader-4-line animate-spin"></i>
                    Deleting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <i className="ri-delete-bin-line"></i>
                    Delete
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

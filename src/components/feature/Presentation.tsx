import { useState, useEffect, useCallback } from 'react';

interface PresentationModel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

interface PresentationProps {
  models: PresentationModel[];
  onClose: () => void;
  initialIndex?: number;
}

export default function Presentation({ models, onClose, initialIndex = 0 }: PresentationProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [interval, setIntervalTime] = useState(5000);
  const [showControls, setShowControls] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(false);

  const currentModel = models[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % models.length);
  }, [models.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + models.length) % models.length);
  }, [models.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setShowThumbnails(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, goToNext]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrev();
          break;
        case 'Escape':
          onClose();
          break;
        case 'p':
        case 'P':
          setIsPlaying((prev) => !prev);
          break;
        case 't':
        case 'T':
          setShowThumbnails((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNext, goToPrev, onClose]);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 z-[200] bg-black">
      {/* Main Slide */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-16">
          {/* Image */}
          <div className="flex-1 w-full flex items-center justify-center mb-6">
            <img
              src={currentModel.imageUrl}
              alt={currentModel.name}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Title and Description */}
          <div className="w-full max-w-4xl text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
              {currentModel.name}
            </h2>
            <p className="text-lg md:text-xl text-slate-300 drop-shadow-md">
              {currentModel.description}
            </p>
          </div>
        </div>
      </div>

      {/* Top Controls Bar */}
      <div
        className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-red-500/80 backdrop-blur-sm rounded-lg text-white transition-all cursor-pointer"
              title="Close (ESC)"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
            <div className="text-white text-sm">
              <span className="font-semibold">Presentation Mode</span>
              <span className="text-slate-400 ml-2">
                {currentIndex + 1} / {models.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Interval Selector */}
            <select
              value={interval}
              onChange={(e) => setIntervalTime(Number(e.target.value))}
              className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-teal-400 cursor-pointer"
            >
              <option value={3000}>3s</option>
              <option value={5000}>5s</option>
              <option value={8000}>8s</option>
              <option value={10000}>10s</option>
              <option value={15000}>15s</option>
            </select>

            {/* Thumbnails Toggle */}
            <button
              onClick={() => setShowThumbnails(!showThumbnails)}
              className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-teal-500/80 backdrop-blur-sm rounded-lg text-white transition-all cursor-pointer"
              title="Show Thumbnails (T)"
            >
              <i className="ri-layout-grid-line text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center justify-center gap-4">
          {/* Previous Button */}
          <button
            onClick={goToPrev}
            className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-teal-500/80 backdrop-blur-sm rounded-full text-white transition-all cursor-pointer"
            title="Previous (←)"
          >
            <i className="ri-arrow-left-s-line text-2xl"></i>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 backdrop-blur-sm rounded-full text-white transition-all shadow-lg shadow-teal-500/30 cursor-pointer"
            title={isPlaying ? 'Pause (P)' : 'Play (P)'}
          >
            {isPlaying ? (
              <i className="ri-pause-line text-2xl"></i>
            ) : (
              <i className="ri-play-line text-2xl ml-1"></i>
            )}
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-teal-500/80 backdrop-blur-sm rounded-full text-white transition-all cursor-pointer"
            title="Next (→ or Space)"
          >
            <i className="ri-arrow-right-s-line text-2xl"></i>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            {models.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-1 h-1 rounded-full transition-all cursor-pointer ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnails Panel */}
      {showThumbnails && (
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl z-10 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">All Slides</h3>
              <button
                onClick={() => setShowThumbnails(false)}
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-red-500/80 rounded-lg text-white transition-all cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {models.map((model, index) => (
                <button
                  key={model.id}
                  onClick={() => goToSlide(index)}
                  className={`group relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all ${
                    index === currentIndex
                      ? 'ring-4 ring-teal-500 scale-105'
                      : 'hover:scale-105 hover:ring-2 hover:ring-white/50'
                  }`}
                >
                  <img
                    src={model.imageUrl}
                    alt={model.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-semibold line-clamp-2">
                        {model.name}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 w-6 h-6 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded text-white text-xs font-bold">
                    {index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      <div
        className={`absolute bottom-20 right-6 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-xs text-slate-300 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/10 rounded text-white">←</kbd>
            <kbd className="px-2 py-1 bg-white/10 rounded text-white">→</kbd>
            <span>Navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/10 rounded text-white">Space</kbd>
            <span>Next slide</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/10 rounded text-white">P</kbd>
            <span>Play/Pause</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/10 rounded text-white">T</kbd>
            <span>Thumbnails</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/10 rounded text-white">ESC</kbd>
            <span>Exit</span>
          </div>
        </div>
      </div>
    </div>
  );
}

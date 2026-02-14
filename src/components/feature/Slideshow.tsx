import { useState, useEffect, useRef } from 'react';
import type { Model } from '../../lib/storage';

interface SlideshowProps {
  models: Model[];
  onClose: () => void;
  initialIndex?: number;
}

interface Comment {
  id: number;
  text: string;
  x: number;
  y: number;
  side: 'left' | 'right';
  delay: number;
}

const comments: Omit<Comment, 'id' | 'x' | 'y' | 'delay'>[] = [
  { text: '🚀 Amazing detail!', side: 'left' },
  { text: '⭐ Stunning work!', side: 'right' },
  { text: '🌟 Incredible!', side: 'left' },
  { text: '✨ Mind-blowing!', side: 'right' },
  { text: '🛸 Out of this world!', side: 'left' },
  { text: '🌌 Spectacular!', side: 'right' },
  { text: '💫 Breathtaking!', side: 'left' },
  { text: '🌠 Phenomenal!', side: 'right' },
  { text: '🔭 Extraordinary!', side: 'left' },
  { text: '🪐 Magnificent!', side: 'right' },
  { text: '🌙 Beautiful capture!', side: 'left' },
  { text: '☄️ Absolutely stunning!', side: 'right' },
];

export default function Slideshow({ models, onClose, initialIndex = 0 }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeComments, setActiveComments] = useState<Comment[]>([]);
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 50, y: 50 });
  const intervalRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const commentIntervalRef = useRef<NodeJS.Timeout>();
  const slideDuration = 7000; // 7 seconds per slide

  // Spotlight animation
  useEffect(() => {
    const animateSpotlight = () => {
      const time = Date.now() / 2000;
      const x = 50 + Math.sin(time) * 20;
      const y = 50 + Math.cos(time * 0.7) * 15;
      setSpotlightPosition({ x, y });
    };

    const spotlightInterval = setInterval(animateSpotlight, 50);
    return () => clearInterval(spotlightInterval);
  }, []);

  // Generate floating comments
  useEffect(() => {
    const generateComment = () => {
      const comment = comments[Math.floor(Math.random() * comments.length)];
      const side = comment.side;
      const x = side === 'left' ? Math.random() * 15 + 2 : Math.random() * 15 + 83;
      const y = Math.random() * 70 + 15;
      
      const newComment: Comment = {
        id: Date.now() + Math.random(),
        text: comment.text,
        x,
        y,
        side,
        delay: 0
      };

      setActiveComments(prev => [...prev, newComment]);

      // Remove comment after animation
      setTimeout(() => {
        setActiveComments(prev => prev.filter(c => c.id !== newComment.id));
      }, 4000);
    };

    // Generate initial comments
    for (let i = 0; i < 3; i++) {
      setTimeout(generateComment, i * 1500);
    }

    // Continue generating comments
    commentIntervalRef.current = setInterval(generateComment, 3000);

    return () => {
      if (commentIntervalRef.current) {
        clearInterval(commentIntervalRef.current);
      }
    };
  }, []);

  // Autoplay logic
  useEffect(() => {
    if (isPlaying) {
      setProgress(0);
      
      // Progress bar animation
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100;
          return prev + (100 / (slideDuration / 50));
        });
      }, 50);

      // Slide transition
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % models.length);
        setProgress(0);
      }, slideDuration);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, models.length, currentIndex]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % models.length);
    setProgress(0);
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + models.length) % models.length);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const currentModel = models[currentIndex];

  return (
    <div className="fixed inset-0 z-[200] bg-black">
      {/* Animated Spotlight Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main spotlight */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px] transition-all duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(20,184,166,0.4) 0%, rgba(6,182,212,0.2) 50%, transparent 100%)',
            left: `${spotlightPosition.x}%`,
            top: `${spotlightPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>

        {/* Secondary spotlight */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-[100px] transition-all duration-1500"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(20,184,166,0.15) 50%, transparent 100%)',
            left: `${100 - spotlightPosition.x}%`,
            top: `${100 - spotlightPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>

        {/* Light beams */}
        <div
          className="absolute top-0 w-1 h-full bg-gradient-to-b from-teal-400/20 via-teal-400/5 to-transparent blur-sm"
          style={{
            left: `${spotlightPosition.x}%`,
            animation: 'beam 3s ease-in-out infinite'
          }}
        ></div>
        <div
          className="absolute top-0 w-1 h-full bg-gradient-to-b from-cyan-400/20 via-cyan-400/5 to-transparent blur-sm"
          style={{
            left: `${100 - spotlightPosition.x}%`,
            animation: 'beam 3s ease-in-out infinite',
            animationDelay: '1.5s'
          }}
        ></div>
      </div>

      {/* Floating Comment Bubbles */}
      {activeComments.map((comment) => (
        <div
          key={comment.id}
          className="absolute pointer-events-none animate-float-up"
          style={{
            left: `${comment.x}%`,
            top: `${comment.y}%`,
            animation: 'floatUp 4s ease-out forwards'
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-teal-400/20 blur-xl rounded-full"></div>
            <div className="relative px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-teal-400/30 rounded-full text-white text-sm font-medium shadow-lg shadow-teal-500/20 whitespace-nowrap">
              {comment.text}
            </div>
          </div>
        </div>
      ))}

      {/* Main Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center p-20">
          <img
            src={currentModel.imageUrl}
            alt={currentModel.name}
            className="max-w-full max-h-full object-contain animate-fade-in shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(20,184,166,0.3))'
            }}
          />
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">{currentModel.name}</h2>
            <p className="text-sm text-slate-300">{currentModel.description}</p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center bg-slate-900/80 hover:bg-red-500/80 border border-slate-700 hover:border-red-400 rounded-full text-white transition-all cursor-pointer ml-6"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
        <div className="max-w-7xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevious}
                className="w-12 h-12 flex items-center justify-center bg-slate-900/80 hover:bg-teal-500/80 border border-slate-700 hover:border-teal-400 rounded-full text-white transition-all cursor-pointer"
              >
                <i className="ri-skip-back-line text-xl"></i>
              </button>
              <button
                onClick={togglePlayPause}
                className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-full text-white transition-all cursor-pointer shadow-lg shadow-teal-500/30"
              >
                <i className={`${isPlaying ? 'ri-pause-line' : 'ri-play-line'} text-2xl`}></i>
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 flex items-center justify-center bg-slate-900/80 hover:bg-teal-500/80 border border-slate-700 hover:border-teal-400 rounded-full text-white transition-all cursor-pointer"
              >
                <i className="ri-skip-forward-line text-xl"></i>
              </button>
            </div>

            {/* Counter */}
            <div className="flex items-center gap-6">
              <div className="text-white text-sm">
                <span className="text-teal-400 font-bold text-lg">{currentIndex + 1}</span>
                <span className="text-slate-400 mx-2">/</span>
                <span className="text-slate-300">{models.length}</span>
              </div>
            </div>

            {/* Keyboard Hints */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-300">Space</kbd>
                Play/Pause
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-300">←</kbd>
                <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-300">→</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-300">ESC</kbd>
                Exit
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.8);
          }
          10% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(-80px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.8);
          }
        }

        @keyframes beam {
          0%, 100% {
            opacity: 0.2;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.4;
            transform: scaleY(1.2);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

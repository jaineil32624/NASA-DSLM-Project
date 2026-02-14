
import { useState, useEffect, useRef, useCallback } from 'react';

interface Track {
  id: number;
  name: string;
  url: string;
}

// Using verified working royalty-free audio URLs
const tracks: Track[] = [
  {
    id: 1,
    name: 'Space Ambient',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 2,
    name: 'Cosmic Dreams',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 3,
    name: 'Deep Universe',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 4,
    name: 'Stellar Voyage',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: 5,
    name: 'Nebula Drift',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  }
];

interface SpaceMusicProps {
  hidden?: boolean;
}

export default function SpaceMusic({ hidden = false }: SpaceMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(30);
  const [previousVolume, setPreviousVolume] = useState(30);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleCanPlay = () => {
      setIsLoading(false);
      setError(null);
    };

    const handleError = () => {
      setIsLoading(false);
      setError('Audio failed to load. Try another track.');
      setIsPlaying(false);
    };

    const handleEnded = () => {
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      setCurrentTrackIndex(nextIndex);
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Load track when index changes
  useEffect(() => {
    if (audioRef.current) {
      setIsLoading(true);
      audioRef.current.src = tracks[currentTrackIndex].url;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setError('Playback failed. Click play to retry.');
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrackIndex]);

  // Close expanded panel when hidden
  useEffect(() => {
    if (hidden) {
      setIsExpanded(false);
    }
  }, [hidden]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        setError(null);
        
        if (!audioRef.current.src) {
          audioRef.current.src = tracks[currentTrackIndex].url;
        }
        
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
      setError('Click play again to start music');
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(previousVolume > 0 ? previousVolume : 30);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(100, Math.round(newVolume)));
    setVolume(clampedVolume);
    if (clampedVolume > 0) {
      setIsMuted(false);
    }
  }, []);

  const changeTrack = (index: number) => {
    if (index === currentTrackIndex) return;
    setCurrentTrackIndex(index);
    setError(null);
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    changeTrack(nextIndex);
  };

  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    changeTrack(prevIndex);
  };

  // Calculate volume from position
  const calculateVolumeFromPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newVolume = (x / rect.width) * 100;
    handleVolumeChange(newVolume);
  }, [handleVolumeChange]);

  // Mouse handlers for slider
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    calculateVolumeFromPosition(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      calculateVolumeFromPosition(e.clientX);
    }
  }, [isDragging, calculateVolumeFromPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for slider
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    calculateVolumeFromPosition(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging && e.touches.length > 0) {
      calculateVolumeFromPosition(e.touches[0].clientX);
    }
  }, [isDragging, calculateVolumeFromPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse/touch event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const displayVolume = isMuted ? 0 : volume;

  // Don't render buttons when hidden, but keep audio playing
  if (hidden) {
    return null;
  }

  return (
    <>
      {/* Floating Music Button - Bottom Left */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`fixed bottom-6 left-6 z-[9998] w-14 h-14 flex items-center justify-center rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-lg active:scale-90 ${
          isPlaying
            ? 'bg-teal-500/30 border-teal-400/60 text-teal-400'
            : 'bg-slate-900/90 border-slate-600 text-slate-300 hover:text-teal-400 hover:border-teal-400/50'
        }`}
        style={{ minWidth: '56px', minHeight: '56px' }}
        aria-label="Toggle music player"
      >
        {isLoading ? (
          <i className="ri-loader-4-line text-2xl animate-spin"></i>
        ) : isPlaying ? (
          <div className="flex items-center gap-0.5">
            <div className="w-1 h-4 bg-teal-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-6 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-1 h-4 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
        ) : (
          <i className="ri-music-2-line text-2xl"></i>
        )}
      </button>

      {/* Expanded Music Panel - Bottom Left */}
      {isExpanded && (
        <div className="fixed bottom-24 left-6 z-[9998] w-80 max-w-[calc(100vw-3rem)] bg-slate-900/98 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-gradient-to-r from-teal-500/10 to-cyan-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-teal-500/20 rounded-full">
                <i className="ri-music-2-line text-teal-400 text-lg"></i>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Space Music</h3>
                <p className="text-slate-400 text-xs">Ambient Soundscapes</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50 cursor-pointer active:scale-90"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {/* Now Playing */}
          <div className="p-4 bg-slate-800/40">
            <div className="flex items-center gap-3 mb-4">
              {isPlaying && (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-3 bg-teal-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-4 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-3 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
              <span className="text-white font-medium text-sm flex-1 truncate">
                {tracks[currentTrackIndex].name}
              </span>
              {isLoading && <i className="ri-loader-4-line text-teal-400 animate-spin"></i>}
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4 mb-5">
              <button
                onClick={prevTrack}
                className="w-11 h-11 flex items-center justify-center bg-slate-700/60 hover:bg-slate-600 text-slate-300 hover:text-white rounded-full transition-all cursor-pointer active:scale-90"
              >
                <i className="ri-skip-back-line text-lg"></i>
              </button>
              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-full transition-all shadow-lg shadow-teal-500/40 cursor-pointer active:scale-90 disabled:opacity-50"
              >
                {isLoading ? (
                  <i className="ri-loader-4-line text-2xl animate-spin"></i>
                ) : (
                  <i className={`${isPlaying ? 'ri-pause-line' : 'ri-play-line'} text-2xl`}></i>
                )}
              </button>
              <button
                onClick={nextTrack}
                className="w-11 h-11 flex items-center justify-center bg-slate-700/60 hover:bg-slate-600 text-slate-300 hover:text-white rounded-full transition-all cursor-pointer active:scale-90"
              >
                <i className="ri-skip-forward-line text-lg"></i>
              </button>
            </div>

            {/* Volume Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Volume</span>
                <span className="text-teal-400 font-bold">{displayVolume}%</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer active:scale-90 rounded-lg hover:bg-slate-700/50"
                >
                  <i className={`text-lg ${
                    isMuted || volume === 0 
                      ? 'ri-volume-mute-line text-red-400' 
                      : volume < 50 
                        ? 'ri-volume-down-line' 
                        : 'ri-volume-up-line'
                  }`}></i>
                </button>
                
                {/* Fully Draggable Volume Slider */}
                <div 
                  ref={sliderRef}
                  className="flex-1 h-4 bg-slate-700 rounded-full relative cursor-pointer group select-none"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-3 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full pointer-events-none"
                    style={{ width: `${displayVolume}%` }}
                  ></div>
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg pointer-events-none transition-transform ${isDragging ? 'scale-125' : 'group-hover:scale-110'}`}
                    style={{ left: `calc(${displayVolume}% - 10px)` }}
                  ></div>
                </div>
                
                <button
                  onClick={() => handleVolumeChange(100)}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer active:scale-90 rounded-lg hover:bg-slate-700/50"
                >
                  <i className="ri-volume-up-line text-lg"></i>
                </button>
              </div>
              
              {/* Quick Volume Presets */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {[0, 25, 50, 75, 100].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleVolumeChange(preset)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer active:scale-95 ${
                      displayVolume === preset
                        ? 'bg-teal-500/30 text-teal-400 border border-teal-500/40'
                        : 'bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-600/50'
                    }`}
                  >
                    {preset}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Track List */}
          <div className="p-4 max-h-56 overflow-y-auto">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Available Tracks ({tracks.length})
            </h4>
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => changeTrack(index)}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-all cursor-pointer flex items-center gap-3 active:scale-98 ${
                    currentTrackIndex === index
                      ? 'bg-teal-500/20 text-teal-400 border border-teal-400/40'
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50'
                  }`}
                >
                  <div className={`w-9 h-9 flex items-center justify-center rounded-full ${
                    currentTrackIndex === index ? 'bg-teal-500/30' : 'bg-slate-700/60'
                  }`}>
                    {currentTrackIndex === index && isPlaying ? (
                      <div className="flex items-center gap-0.5">
                        <div className="w-0.5 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                        <div className="w-0.5 h-3 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-0.5 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    ) : (
                      <i className={`ri-music-line text-sm ${currentTrackIndex === index ? 'text-teal-400' : 'text-slate-400'}`}></i>
                    )}
                  </div>
                  <span className="text-sm font-medium flex-1 truncate">{track.name}</span>
                  <span className="text-xs text-slate-500">#{index + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-amber-500/10 border-t border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-400 text-xs">
                <i className="ri-information-line"></i>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Footer Tip */}
          <div className="p-3 bg-slate-800/30 border-t border-slate-700/30">
            <p className="text-xs text-slate-500 text-center">
              <i className="ri-lightbulb-line mr-1"></i>
              Drag the slider freely to adjust volume
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.25s ease-out;
        }
      `}</style>
    </>
  );
}

"use client";

import { X, PlayCircle, VolumeX, Maximize02, Minimize02 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { useRef, useState, useEffect } from "react";

interface VideoModalProps {
  /** The video URL (YouTube, Vimeo, etc.) */
  videoUrl: string;
  /** The title of the video */
  title?: string;
  /** Trigger element that opens the modal */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const VideoModal = ({ videoUrl, title, children, className }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Use local demo video if no URL provided
  const videoSource = videoUrl || "/videos/demo_placeholder.mp4";
  console.log('Video source:', videoSource);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.log('Video ref is null, skipping event listener setup');
      return;
    }
    
    console.log('Setting up video event listeners for video:', video);

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded, duration:', video.duration);
      setDuration(video.duration);
      // Also set current time to 0 when metadata loads
      setCurrentTime(0);
    };

    const handleTimeUpdate = () => {
      const newTime = video.currentTime;
      const newDuration = video.duration;
      console.log('Time update:', newTime, '/', newDuration);
      
      // Only update if we have valid values
      if (!isNaN(newTime) && newTime >= 0) {
        setCurrentTime(newTime);
      }
      if (!isNaN(newDuration) && newDuration > 0) {
        setDuration(newDuration);
      }
    };

    const handlePlay = () => {
      console.log('Video play event');
      setIsPlaying(true);
    };
    const handlePause = () => {
      console.log('Video pause event');
      setIsPlaying(false);
    };
    const handleEnded = () => {
      console.log('Video ended event');
      setIsPlaying(false);
    };

    const handleLoadedData = () => {
      console.log('Video loaded data, duration:', video.duration, 'currentTime:', video.currentTime);
      setDuration(video.duration);
      setCurrentTime(video.currentTime);
    };

    const handleCanPlay = () => {
      console.log('Video can play, duration:', video.duration, 'currentTime:', video.currentTime);
      setDuration(video.duration);
      setCurrentTime(video.currentTime);
    };

    // Fullscreen event listeners
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    
    console.log('Video event listeners added');
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, [isOpen]); // Re-run when modal opens

  const togglePlay = () => {
    console.log('Toggle play clicked, isPlaying:', isPlaying);
    if (videoRef.current) {
      console.log('Video element found, currentTime:', videoRef.current.currentTime, 'duration:', videoRef.current.duration);
      if (isPlaying) {
        console.log('Pausing video');
        videoRef.current.pause();
      } else {
        console.log('Playing video');
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error);
        });
      }
    } else {
      console.log('Video ref is null');
    }
  };

  const toggleMute = () => {
    console.log('Toggle mute clicked, isMuted:', isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      console.log('Video muted:', videoRef.current.muted);
    } else {
      console.log('Video ref is null');
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if ((videoRef.current as any).webkitRequestFullscreen) {
          (videoRef.current as any).webkitRequestFullscreen();
        } else if ((videoRef.current as any).msRequestFullscreen) {
          (videoRef.current as any).msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === Infinity) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Seek clicked');
    if (!videoRef.current || duration <= 0) {
      console.log('Video ref is null or duration is 0');
      return;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = Math.max(0, Math.min(duration, (clickX / width) * duration));
    
    console.log('Seeking to:', seekTime, 'seconds');
    videoRef.current.currentTime = seekTime;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    // Clear any existing timeout
    if (controlHideTimeoutRef.current) {
      clearTimeout(controlHideTimeoutRef.current);
    }
    // Hide controls after 3 seconds of inactivity
    controlHideTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlHideTimeoutRef.current) {
        clearTimeout(controlHideTimeoutRef.current);
      }
    };
  }, []);

  // Force progress bar updates when video is playing
  useEffect(() => {
    if (!videoRef.current) return;

    const interval = setInterval(() => {
      if (videoRef.current) {
        const newTime = videoRef.current.currentTime;
        const newDuration = videoRef.current.duration;
        console.log('Interval update - currentTime:', newTime, 'duration:', newDuration);
        
        // Always update current time if it's different
        if (!isNaN(newTime) && newTime >= 0 && Math.abs(newTime - currentTime) > 0.1) {
          console.log('Updating currentTime from', currentTime, 'to', newTime);
          setCurrentTime(newTime);
        }
        
        // Update duration if valid and different
        if (!isNaN(newDuration) && newDuration > 0 && Math.abs(newDuration - duration) > 0.1) {
          console.log('Updating duration from', duration, 'to', newDuration);
          setDuration(newDuration);
        }
      }
    }, 100); // Update every 100ms for smoother progress

    return () => clearInterval(interval);
  }, [currentTime, duration]); // Include both in dependencies

  // Debug time values
  useEffect(() => {
    console.log('Time values changed - currentTime:', currentTime, 'duration:', duration);
  }, [currentTime, duration]);

  // Check video state when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      console.log('Modal opened - checking video state');
      console.log('Video src:', videoRef.current.src);
      console.log('Video currentTime:', videoRef.current.currentTime);
      console.log('Video duration:', videoRef.current.duration);
      console.log('Video paused:', videoRef.current.paused);
      console.log('Video readyState:', videoRef.current.readyState);
    }
  }, [isOpen]);







  return (
    <>
      <div 
        className={className} 
        onClick={() => setIsOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </div>
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-6xl mx-auto bg-primary rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 rounded-full p-2 bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Close video modal"
            >
              <X className="size-5 text-white" />
            </button>
            
            {/* Video Container */}
            <div 
              className="relative w-full" 
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                if (controlHideTimeoutRef.current) {
                  clearTimeout(controlHideTimeoutRef.current);
                }
                setShowControls(false);
              }}
            >
              <div className="aspect-video w-full">
                <video
                  ref={videoRef}
                  src={videoSource}
                  className="w-full h-full rounded-2xl object-cover"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  onLoadStart={() => console.log('Video load started')}
                  onCanPlay={() => console.log('Video can play')}
                  onError={(e) => console.error('Video error:', e)}
                  onTimeUpdate={() => console.log('Video timeUpdate event fired')}
                  onProgress={() => console.log('Video progress event fired')}
                  onDurationChange={() => console.log('Video durationChange event fired')}
                  preload="metadata"
                  playsInline
                />
              </div>
              
              {/* Custom Video Controls Overlay */}
              <div 
                className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Progress Bar */}
                <div 
                  className="w-full h-1 bg-white/20 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeek(e);
                  }}
                >
                  <div 
                    className="h-full bg-white/60 transition-all duration-100"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
                
                {/* Controls Row */}
                <div className="flex items-center justify-between px-4 py-3">
                  {/* Left Side Controls */}
                  <div className="flex items-center gap-4">
                    {/* Play/Pause Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="text-white hover:text-white/80 transition-colors"
                    >
                      {isPlaying ? (
                        <div className="flex items-center justify-center w-5 h-5">
                          <div className="w-1 h-4 bg-white mx-0.5" />
                          <div className="w-1 h-4 bg-white mx-0.5" />
                        </div>
                      ) : (
                        <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent" />
                      )}
                    </button>
                    
                    {/* Time Display */}
                    <div className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                  
                  {/* Right Side Controls */}
                  <div className="flex items-center gap-4">
                    {/* Volume Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="text-white hover:text-white/80 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="size-5" />
                      ) : (
                        <div className="relative w-5 h-5">
                          {/* Speaker body */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-white rounded-sm" />
                          {/* Speaker cone */}
                          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[8px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent" />
                          {/* Sound waves */}
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
                          <div className="absolute left-4.5 top-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-white rounded-full" />
                        </div>
                      )}
                    </button>
                    
                    {/* Fullscreen Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFullscreen();
                      }}
                      className="text-white hover:text-white/80 transition-colors"
                    >
                      {isFullscreen ? (
                        <Minimize02 className="size-5" />
                      ) : (
                        <Maximize02 className="size-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 
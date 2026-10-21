import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface VideoMoment {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  tag: string;
}

export const BIRTHDAY_VIDEOS: VideoMoment[] = [
  {
    id: 'vd-1',
    src: '/img/vd.mp4',
    title: 'Unfiltered Smiles',
    subtitle: 'The spontaneous joy only you bring into every day',
    tag: 'Favorite Moment',
  },
  {
    id: 'vd-2',
    src: '/img/vd2.mp4',
    title: 'On the Road Together',
    subtitle: 'Wind in our hair, helmets on, and nowhere else I’d rather be',
    tag: 'Adventure',
  },
  {
    id: 'vd-3',
    src: '/img/vd3.mp4',
    title: 'Pure Little Laughs',
    subtitle: 'The soundtrack to my happiest memories',
    tag: 'Sweet Sound',
  },
  {
    id: 'vd-4',
    src: '/img/vd4.mp4',
    title: 'Sweet Glances',
    subtitle: 'When one look says everything words never could',
    tag: 'Close to Heart',
  },
  {
    id: 'vd-5',
    src: '/img/v5.mp4',
    title: 'Just Being Us',
    subtitle: 'Quiet, goofy, gentle, and forever my favourite space',
    tag: 'Always & Forever',
  },
  {
    id: 'vd-6',
    src: '/img/vd6.mp4',
    title: 'Golden Afternoons',
    subtitle: 'Making simple ordinary hours feel extraordinary',
    tag: 'Magic Hour',
  },
  {
    id: 'vd-7',
    src: '/img/vd7.mp4',
    title: 'Heartbeats in Motion',
    subtitle: 'Captured moments of the love I will always cherish',
    tag: 'With Love',
  },
];

export function VideoSection() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [modalVideo, setModalVideo] = useState<VideoMoment | null>(null);
  const [playingPreview, setPlayingPreview] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = BIRTHDAY_VIDEOS[activeVideoIndex];

  const prevVideo = () => {
    setActiveVideoIndex((prev) => (prev - 1 + BIRTHDAY_VIDEOS.length) % BIRTHDAY_VIDEOS.length);
  };

  const nextVideo = () => {
    setActiveVideoIndex((prev) => (prev + 1) % BIRTHDAY_VIDEOS.length);
  };

  return (
    <section id="videos" className="videos-section section-space">
      <div className="section-heading">
        <span className="eyebrow">OUR STORIES IN MOTION</span>
        <h2>Little moments that move us.</h2>
        <p>Photographs freeze a moment, but your smile was meant to move.</p>
        <div className="little-divider">
          <span />
          <Heart size={13} />
          <span />
        </div>
      </div>

      {/* Featured Video Stage */}
      <div className="video-stage-wrapper">
        <div className="video-stage">
          <div className="video-player-frame">
            <video
              key={currentVideo.src}
              src={currentVideo.src}
              className="stage-video"
              controls
              playsInline
              preload="metadata"
            />
            <div className="video-badge">
              <Sparkles size={13} /> {currentVideo.tag}
            </div>
          </div>
          <div className="video-stage-info">
            <span className="video-count">
              MOMENT {String(activeVideoIndex + 1).padStart(2, '0')} / {String(BIRTHDAY_VIDEOS.length).padStart(2, '0')}
            </span>
            <h3>{currentVideo.title}</h3>
            <p>{currentVideo.subtitle}</p>
            <div className="video-stage-actions">
              <Button
                variant="outline"
                size="sm"
                className="cinema-btn"
                onClick={() => setModalVideo(currentVideo)}
              >
                <Maximize2 size={14} /> Open in Cinema Mode
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="video-controls">
          <Button
            variant="outline"
            size="icon"
            onClick={prevVideo}
            aria-label="Previous video"
          >
            <ChevronLeft size={18} />
          </Button>
          <div className="video-dots">
            {BIRTHDAY_VIDEOS.map((v, i) => (
              <button
                key={v.id}
                type="button"
                className={`video-dot ${i === activeVideoIndex ? 'active' : ''}`}
                onClick={() => setActiveVideoIndex(i)}
                aria-label={`Go to video ${i + 1}: ${v.title}`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextVideo}
            aria-label="Next video"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {/* Video Reel Strip */}
      <div className="video-reel-strip">
        <div className="video-reel-header">
          <span className="reel-tag">ALL VIDEO MEMORIES</span>
          <span className="reel-instruction">Click any clip to watch</span>
        </div>
        <div className="video-thumbnails-grid">
          {BIRTHDAY_VIDEOS.map((vid, i) => {
            const isSelected = i === activeVideoIndex;
            return (
              <button
                key={vid.id}
                type="button"
                className={`video-thumbnail-card ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  setActiveVideoIndex(i);
                }}
                onMouseEnter={() => setPlayingPreview(vid.id)}
                onMouseLeave={() => setPlayingPreview(null)}
              >
                <div className="thumb-video-wrap">
                  <video
                    src={vid.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    ref={(el) => {
                      if (!el) return;
                      if (playingPreview === vid.id) {
                        el.play().catch(() => {});
                      } else {
                        el.pause();
                        el.currentTime = 0;
                      }
                    }}
                  />
                  <div className="thumb-play-icon">
                    <Play size={16} fill="currentColor" />
                  </div>
                  <span className="thumb-index">0{i + 1}</span>
                </div>
                <div className="thumb-info">
                  <span className="thumb-title">{vid.title}</span>
                  <span className="thumb-tag">{vid.tag}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cinema Mode Lightbox */}
      {modalVideo && (
        <div
          className="video-cinema-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setModalVideo(null)}
        >
          <div className="cinema-backdrop" />
          <div className="cinema-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cinema-close"
              onClick={() => setModalVideo(null)}
              aria-label="Close cinema mode"
            >
              ✕
            </button>
            <div className="cinema-frame">
              <video
                ref={modalVideoRef}
                src={modalVideo.src}
                controls
                autoPlay
                playsInline
                className="cinema-video"
              />
              <div className="cinema-meta">
                <span className="cinema-tag">{modalVideo.tag}</span>
                <h3>{modalVideo.title}</h3>
                <p>{modalVideo.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

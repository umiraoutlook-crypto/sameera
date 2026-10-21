import { useState } from 'react';
import { ImagePlus } from 'lucide-react';

export interface PhotoInfo {
  src: string;
  alt: string;
  caption?: string;
  objectPosition?: string;
}

export const BIRTHDAY_PHOTOS: Record<number, PhotoInfo> = {
  // 1. Story section (3 polaroids) — All unique
  1: {
    src: '/img/img10.jpeg',
    alt: 'Our road trip adventures — helmets, wind, and wide smiles',
    caption: 'where our story began',
    objectPosition: 'center 25%',
  },
  2: {
    src: '/img/img4.jpeg',
    alt: 'The little things — playful smiles and inside jokes',
    caption: 'falling for you, again & again',
    objectPosition: 'center center',
  },
  3: {
    src: '/img/img12.jpeg',
    alt: 'Everything ahead — pointing toward our future adventures',
    caption: 'my favourite future is ours',
    objectPosition: 'center 40%',
  },

  // 2. Memories section (8 film frames) — All unique
  4: {
    src: '/img/img2.jpeg',
    alt: 'My favourite smile — pure happiness on call',
    caption: 'My favourite smile',
    objectPosition: 'center 25%',
  },
  5: {
    src: '/img/img9.jpeg',
    alt: 'Just you & me — holding hands under neon angel wings',
    caption: 'Just you & me',
    objectPosition: 'center 35%',
  },
  6: {
    src: '/img/imh11.jpeg',
    alt: 'A day to remember — Madras Coffee House with helmets and big smiles',
    caption: 'A day to remember',
    objectPosition: 'center center',
  },
  7: {
    src: '/img/img6.jpeg',
    alt: 'Our little adventures — journey bus smiles & peace signs',
    caption: 'Our little adventures',
    objectPosition: 'center 20%',
  },
  8: {
    src: '/img/img8.jpeg',
    alt: 'The way you look at me — leaning close with love',
    caption: 'The way you look at me',
    objectPosition: 'center 30%',
  },
  9: {
    src: '/img/img13.jpeg',
    alt: 'Forever a favourite — celebration together in pink',
    caption: 'Forever a favourite',
    objectPosition: 'center 20%',
  },
  10: {
    src: '/img/img16.jpeg',
    alt: 'Sweetest laughter — sharing desserts and ice cream sundaes',
    caption: 'Sweetest laughter',
    objectPosition: 'center 30%',
  },
  11: {
    src: '/img/img17.jpeg',
    alt: 'Sparkles of us — quiet glow and rainbow heartbeats',
    caption: 'Sparkles of us',
    objectPosition: 'center 25%',
  },

  // 3. Reasons section (4 flip cards) — All unique
  12: {
    src: '/img/img3.jpeg',
    alt: 'Your beautiful heart — holding a delicate red bloom',
    caption: 'Your beautiful heart',
    objectPosition: 'center center',
  },
  13: {
    src: '/img/img5.jpeg',
    alt: 'Your little laugh — soft pastel selfies and sweetest soul',
    caption: 'Your little laugh',
    objectPosition: 'center 30%',
  },
  14: {
    src: '/img/img14.jpeg',
    alt: 'The way you love — fairy lights in a memory bottle',
    caption: 'The way you love',
    objectPosition: 'center 35%',
  },
  15: {
    src: '/img/img18.jpeg',
    alt: 'Simply, you — timeless grace in the afternoon light',
    caption: 'Simply, you',
    objectPosition: 'center 20%',
  },

  // 4. Heart collage gallery (15 photos forming a full heart) — Every photo unique
  16: {
    src: '/img/img3.jpeg',
    alt: 'Holding a delicate red blossom with gentle grace',
    caption: 'Pure tenderness',
    objectPosition: 'center center',
  },
  17: {
    src: '/img/img13.jpeg',
    alt: 'Celebrating life together dressed in pink',
    caption: 'Radiant celebration',
    objectPosition: 'center 20%',
  },
  18: {
    src: '/img/img8.jpeg',
    alt: 'Leaning close with warm love',
    caption: 'Holding you close',
    objectPosition: 'center 30%',
  },
  19: {
    src: '/img/img12.jpeg',
    alt: 'Riding together on the scooter into tomorrow',
    caption: 'Every road leads to you',
    objectPosition: 'center 40%',
  },
  20: {
    src: '/img/img4.jpeg',
    alt: 'Endless laughter and happiness collage',
    caption: 'Happiness is you',
    objectPosition: 'center center',
  },
  21: {
    src: '/img/img2.jpeg',
    alt: 'That pure sweet smile',
    caption: 'The smile that lights my world',
    objectPosition: 'center 25%',
  },
  22: {
    src: '/img/img10.jpeg',
    alt: 'Adventures on two wheels with helmets',
    caption: 'Our favourite adventures',
    objectPosition: 'center 25%',
  },
  23: {
    src: '/img/img9.jpeg',
    alt: 'Holding hands under neon angel wings',
    caption: 'You and me forever',
    objectPosition: 'center 30%',
  },
  24: {
    src: '/img/img6.jpeg',
    alt: 'Bus ride peace signs and smiles',
    caption: 'Peace & smiles',
    objectPosition: 'center 20%',
  },
  25: {
    src: '/img/imh11.jpeg',
    alt: 'Madras Coffee House thumbs up',
    caption: 'A day full of sunshine',
    objectPosition: 'center 30%',
  },
  26: {
    src: '/img/img16.jpeg',
    alt: 'Ice cream dessert date and laughter',
    caption: 'Sweetest moments together',
    objectPosition: 'center 30%',
  },
  27: {
    src: '/img/img17.jpeg',
    alt: 'Sparkles and rainbow hearts',
    caption: 'Every little sparkle of you',
    objectPosition: 'center 25%',
  },
  28: {
    src: '/img/img5.jpeg',
    alt: 'Sweet selfie together with cute stickers',
    caption: 'Always smiling with you',
    objectPosition: 'center 30%',
  },
  29: {
    src: '/img/img14.jpeg',
    alt: 'Fairy lights in a memory bottle',
    caption: 'Guiding starlight',
    objectPosition: 'center 35%',
  },
  30: {
    src: '/img/img18.jpeg',
    alt: 'Under the tree canopy in the sunlight',
    caption: 'Simply Samee',
    objectPosition: 'center 20%',
  },
};

export interface PhotoPlaceholderProps {
  number: number;
  caption?: string | undefined;
  className?: string;
  src?: string;
  alt?: string;
  objectPosition?: string;
  onClick?: () => void;
}

export function PhotoPlaceholder({
  number,
  caption,
  className = '',
  src,
  alt,
  objectPosition,
  onClick,
}: PhotoPlaceholderProps) {
  const [hasError, setHasError] = useState(false);
  const defaultPhoto = BIRTHDAY_PHOTOS[number];
  const photo = !hasError
    ? src
      ? {
          src,
          alt: alt || caption || (defaultPhoto ? defaultPhoto.alt : `Photo ${number}`),
          caption: caption || (defaultPhoto ? defaultPhoto.caption : undefined),
          objectPosition: objectPosition || (defaultPhoto ? defaultPhoto.objectPosition : undefined),
        }
      : defaultPhoto
    : undefined;

  if (photo?.src) {
    return (
      <div
        className={`photo-placeholder has-photo ${className}`}
        role="img"
        aria-label={caption || photo.caption || photo.alt || `Photo ${number}`}
        onClick={onClick}
      >
        <img
          src={photo.src}
          alt={photo.alt || caption || `Photo ${number}`}
          className="photo-img"
          style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
          loading="lazy"
          onError={() => setHasError(true)}
        />
        <span className="photo-corner photo-corner-badge" aria-hidden="true">♡</span>
      </div>
    );
  }

  return (
    <div
      className={`photo-placeholder ${className}`}
      role="img"
      aria-label={`Photo placeholder ${number}${caption ? `: ${caption}` : ''}`}
      onClick={onClick}
    >
      <span className="photo-number">NO. {String(number).padStart(2, '0')}</span>
      <div className="placeholder-center">
        <ImagePlus strokeWidth={1} />
        <span>Your photo here</span>
        <small>A little space for us</small>
      </div>
      <span className="photo-corner">♡</span>
    </div>
  );
}
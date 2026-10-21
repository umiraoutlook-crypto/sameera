import { useState } from 'react';
import { Heart, Sparkles, Filter, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type PhotoInfo } from '@/components/birthday/photo-placeholder';

export interface ScrapbookItem {
  id: number;
  src: string;
  title: string;
  note: string;
  stamp: string;
  category: 'all' | 'smiles' | 'adventures' | 'sweet';
  tilt: string;
}

export const SCRAPBOOK_ITEMS: ScrapbookItem[] = [
  {
    id: 1,
    src: '/img/img10.jpeg',
    title: 'Helmets & Open Skies',
    note: 'Riding down the avenue, seeing the world reflect in your eyes.',
    stamp: 'ON THE GO',
    category: 'adventures',
    tilt: '-2.8deg',
  },
  {
    id: 2,
    src: '/img/img2.jpeg',
    title: 'Screen-to-Screen Warmth',
    note: 'No distance could ever dim the comfort of your smile.',
    stamp: 'PURE JOY',
    category: 'smiles',
    tilt: '2.5deg',
  },
  {
    id: 3,
    src: '/img/img12.jpeg',
    title: 'Pointing To Tomorrow',
    note: 'Wherever the scooter takes us, the best direction is next to you.',
    stamp: 'OUR HORIZON',
    category: 'adventures',
    tilt: '-1.7deg',
  },
  {
    id: 4,
    src: '/img/img3.jpeg',
    title: 'A Bloom For You',
    note: 'Small things become poetry when I think of you.',
    stamp: 'DELICATE LOVE',
    category: 'sweet',
    tilt: '-1.5deg',
  },
  {
    id: 5,
    src: '/img/img4.jpeg',
    title: 'Four Shades of Silliness',
    note: 'The goofy faces only we get to see. My absolute favourite laughter.',
    stamp: 'UNFILTERED',
    category: 'smiles',
    tilt: '1.8deg',
  },
  {
    id: 6,
    src: '/img/imh11.jpeg',
    title: 'Madras Coffee Moments',
    note: 'Sipping warm drinks, laughing through helmet visors and blue bottles.',
    stamp: 'SUNSHINE RUN',
    category: 'adventures',
    tilt: '2.4deg',
  },
  {
    id: 7,
    src: '/img/img5.jpeg',
    title: 'Pastel Bunny Whispers',
    note: 'A soft afternoon, endless giggles, and matching happiness.',
    stamp: 'SWEETEST SOUL',
    category: 'sweet',
    tilt: '-2.2deg',
  },
  {
    id: 8,
    src: '/img/img8.jpeg',
    title: 'A Promise Held Close',
    note: 'Every glance that tells me you are right where you belong.',
    stamp: 'FOREVER KIND',
    category: 'sweet',
    tilt: '-1.2deg',
  },
  {
    id: 9,
    src: '/img/img6.jpeg',
    title: 'The Journey Smiles',
    note: 'Bus rides, peace signs, and leaning in to whisper a secret joke.',
    stamp: 'ROAD NOTES',
    category: 'smiles',
    tilt: '2deg',
  },
  {
    id: 10,
    src: '/img/img13.jpeg',
    title: 'Dressed Up In Pink',
    note: 'Celebrating life with the most breathtaking person in every room.',
    stamp: 'FAVOURITE VIEW',
    category: 'sweet',
    tilt: '2.1deg',
  },
  {
    id: 11,
    src: '/img/img9.jpeg',
    title: 'Angel Wings & Holding Hands',
    note: 'Standing together in front of the lights, my hand in yours.',
    stamp: 'SOULMATES',
    category: 'sweet',
    tilt: '1.5deg',
  },
  {
    id: 12,
    src: '/img/img16.jpeg',
    title: 'Sundae Spoons & Sweet Tooth',
    note: 'Splitting desserts, stealing bites, and making everyday a treat.',
    stamp: 'SWEET TREATS',
    category: 'smiles',
    tilt: '1.6deg',
  },
  {
    id: 13,
    src: '/img/img14.jpeg',
    title: 'Bottle of Glowing Starlight',
    note: 'Fairy lights, tiny memories, and a keepsake of what we share.',
    stamp: 'KEEPSAKE',
    category: 'sweet',
    tilt: '-1.9deg',
  },
  {
    id: 14,
    src: '/img/img17.jpeg',
    title: 'Sparkles On A Quiet Friday',
    note: 'Lost in thought, framed by little heartbeats and quiet glow.',
    stamp: 'MAGIC HOUR',
    category: 'sweet',
    tilt: '-2.4deg',
  },
  {
    id: 15,
    src: '/img/img18.jpeg',
    title: 'Under The Tree Canopy',
    note: 'Sunlight filtering through the leaves onto someone truly rare.',
    stamp: 'SIMPLY SAMEE',
    category: 'sweet',
    tilt: '2.3deg',
  },
];

interface ScrapbookSectionProps {
  onSelectPhoto: (photo: PhotoInfo) => void;
}

export function ScrapbookSection({ onSelectPhoto }: ScrapbookSectionProps) {
  return (
    <section id="scrapbook" className="scrapbook-section section-space">
      <div className="section-heading">
        <span className="eyebrow">OUR SCRAPBOOK OF LOVE</span>
        <h2>Pages torn from our sweetest days.</h2>
        <p>Every polaroid, every note, pinned together with all my heart.</p>
        <div className="little-divider">
          <span />
          <Heart size={13} />
          <span />
        </div>
      </div>

      {/* Masonry / Scrapbook Wall Grid */}
      <div className="scrapbook-grid">
        {SCRAPBOOK_ITEMS.map((item) => (
          <article
            key={item.id}
            className="scrapbook-card photo-clickable"
            style={{ '--card-tilt': item.tilt } as React.CSSProperties}
            onClick={() =>
              onSelectPhoto({
                src: item.src,
                alt: item.title,
                caption: `${item.title}: ${item.note}`,
              })
            }
          >
            {/* Washi Tape Pin Top */}
            <div className="washi-tape" aria-hidden="true" />
            <div className="scrapbook-pin" aria-hidden="true">
              <Pin size={15} />
            </div>

            {/* Photo frame */}
            <div className="scrapbook-img-frame">
              <img
                src={item.src}
                alt={item.title}
                className="scrapbook-img"
                loading="lazy"
              />
              <span className="stamp-badge">{item.stamp}</span>
            </div>

            {/* Caption & Handwritten Note */}
            <div className="scrapbook-note">
              <h4>{item.title}</h4>
              <p className="note-text">{item.note}</p>
              <span className="scrapbook-corner-heart">♡</span>
            </div>
          </article>
        ))}
      </div>

      <div className="scrapbook-footer-note">
        <Sparkles size={14} />
        <span>Click any memory above to view in full resolution</span>
      </div>
    </section>
  );
}

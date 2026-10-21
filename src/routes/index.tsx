import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Heart, Mail, Sparkles, Pause, Play, RotateCcw, Film, Images, Volume2, VolumeX, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButterflyGarden } from '@/components/birthday/butterflies';
import { PhotoPlaceholder, BIRTHDAY_PHOTOS, type PhotoInfo } from '@/components/birthday/photo-placeholder';
import { ThreeBirthdayCanvas } from '@/components/birthday/three-canvas';
import { VideoSection } from '@/components/birthday/video-section';
import { ScrapbookSection } from '@/components/birthday/scrapbook-section';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import blooms from '@/assets/birthday-blooms.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Happy Birthday, Sameee — With Love, Sam' },
    { name: 'description', content: 'A little world of love, butterflies, videos, and memories, made for Sameee by Sam.' },
    { property: 'og:title', content: 'Happy Birthday, Sameee — With Love, Sam' },
    { property: 'og:description', content: 'Every memory, every little moment, every reason I love you.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const memories = [
  'My favourite smile',
  'Just you & me',
  'A day to remember',
  'Our little adventures',
  'The way you look at me',
  'Forever a favourite',
  'Sweetest laughter',
  'Sparkles of us',
];
const reasons = [
  ['Your beautiful heart', 'You make love feel like the safest place in the world.'],
  ['Your little laugh', 'My favourite sound. My favourite reason to smile.'],
  ['The way you love', 'In the smallest moments, you make me feel everything.'],
  ['Simply, you', 'No grand explanation. Just you, exactly as you are.'],
];

function SectionHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{note && <p>{note}</p>}<div className="little-divider"><span /><Heart size={13} /><span /></div></div>;
}

function Index() {
  const [butterflies, setButterflies] = useState(true);
  const [memory, setMemory] = useState(0);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [letterState, setLetterState] = useState<'closed' | 'opening' | 'open'>('closed');
  const [wished, setWished] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoInfo | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useScrollReveal();

  const handleOpenLetter = () => {
    if (letterState !== 'closed') return;
    setLetterState('opening');
    setTimeout(() => {
      setLetterState('open');
    }, 750);
  };

  const handleCloseLetter = () => {
    setLetterState('closed');
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.65;
    audio.loop = true;

    const startPlayback = () => {
      const el = audioRef.current;
      if (!el) return;
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlayingMusic(true);
            detachListeners();
          })
          .catch(() => {
            // Autoplay policy waiting for document interaction
          });
      }
    };

    // Attempt playback immediately as the user enters the site
    startPlayback();

    // Comprehensive list of user gesture & motion events to unlock audio immediately with ZERO manual action
    const interactionEvents = [
      'pointerdown',
      'mousedown',
      'touchstart',
      'click',
      'scroll',
      'wheel',
      'mousemove',
      'pointermove',
      'keydown',
    ] as const;

    const onUserInteraction = () => {
      const el = audioRef.current;
      if (el && el.paused) {
        startPlayback();
      }
    };

    const attachListeners = () => {
      interactionEvents.forEach((evt) => {
        window.addEventListener(evt, onUserInteraction, { capture: true, passive: true });
        document.addEventListener(evt, onUserInteraction, { capture: true, passive: true });
      });
    };

    const detachListeners = () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, onUserInteraction, true);
        document.removeEventListener(evt, onUserInteraction, true);
      });
    };

    attachListeners();

    return () => {
      detachListeners();
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlayingMusic) {
      el.pause();
      setIsPlayingMusic(false);
    } else {
      el.play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    }
  };

  useEffect(() => {
    if (!selectedPhoto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedPhoto]);
  return <div className="birthday-page">
    <ThreeBirthdayCanvas active={butterflies} />
    <ButterflyGarden active={butterflies} />
    <header className="site-header">
      <a href="#home" className="wordmark">S <Heart size={15} /> S<span>A LITTLE WORLD, JUST FOR YOU</span></a>
      <nav aria-label="Birthday sections">
        <a href="#wish">Make a wish 🎂</a>
        <a href="#story">Our story</a>
        <a href="#memories">Memories</a>
        <a href="#videos">Videos <Film size={11} /></a>
        <a href="#scrapbook">Scrapbook <Images size={11} /></a>
        <a href="#reasons">Why you</a>
        <a href="#gallery">Heart gallery</a>
        <a href="#letter">Love letter <Heart size={11} /></a>
      </nav>
      <div className="header-actions">
        <Button
          size="icon"
          variant="ghost"
          className={`music-toggle ${isPlayingMusic ? 'is-active' : ''}`}
          title={isPlayingMusic ? 'Pause song: Nee Thinam Siricha Pothume' : 'Play song: Nee Thinam Siricha Pothume'}
          aria-label={isPlayingMusic ? 'Pause song: Nee Thinam Siricha Pothume' : 'Play song: Nee Thinam Siricha Pothume'}
          onClick={toggleMusic}
        >
          {isPlayingMusic ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="butterfly-toggle"
          title={butterflies ? 'Pause 3D effects & butterflies' : 'Let magic fly'}
          aria-label={butterflies ? 'Pause 3D effects & butterflies' : 'Let magic fly'}
          onClick={() => setButterflies(!butterflies)}
        >
          {butterflies ? <Pause /> : <Play />}
        </Button>
      </div>
    </header>

    <main>
      <section id="home" className="birthday-hero">
        <img className="hero-blooms" src={blooms} alt="Delicate pink flowers framing a birthday wish" width={1920} height={1024} />
        <div className="hero-content"><span className="eyebrow hero-eyebrow"><span /> TODAY IS A LITTLE MORE BEAUTIFUL <span /></span>
          <h1>Happy Birthday,<strong>Sameee<span className="name-heart">♡</span></strong></h1>
          <p className="hero-message">To my favourite person, my sweetest adventure,<br />and the love I’d choose in every lifetime.</p>
          <p className="hero-signature">All my love, <span>Sam</span></p>
          <Button asChild className="journey-button"><a href="#wish">Make a wish & blow the candles 🎂 <ArrowDown size={15} /></a></Button>
          <div className="hero-footnote"><Sparkles size={12} /> MADE OF MEMORIES, MAGIC & YOU</div>
        </div>
        <div className="hero-scroll"><span>SCROLL INTO OUR CELEBRATION</span><ArrowDown size={14} /></div>
      </section>

      {/* 🎂 Birthday Cake & Candle Blowing celebration moved to the TOP */}
      <section className={`wish-section section-space ${wished ? 'wish-made' : ''}`} id="wish">
        <span className="eyebrow">🎂 MAKE A BIRTHDAY WISH</span>
        <h2>{wished ? 'May all your wishes find you, Samee maaaa! ✨' : 'Make a wish, Samee maaaa!'}</h2>
        <p>{wished ? 'And through every beautiful thing ahead, I’ll be right here holding your hand.' : 'Close your eyes. Think of something beautiful. This moment is yours.'}</p>

        {/* Celebratory message revealed on blow placed prominently at the top */}
        {wished && (
          <div className="love-burst-message" role="alert">
            <div className="burst-stars" aria-hidden="true">
              <span>✨</span><span>💖</span><span>🎉</span><span>❤️</span><span>✨</span>
            </div>
            <h3 className="burst-text">Love You More Samee maaaa❤️❤️</h3>
            <p className="burst-subtext">Always & Forever, in every heartbeat ♡</p>
          </div>
        )}

        <div className={`birthday-cake ${wished ? 'candles-blown' : ''}`} aria-label={wished ? 'Birthday cake with blown-out candles' : 'Birthday cake with three lit candles'}>
          {wished && (
            <div className="cake-burst-confetti" aria-hidden="true">
              {Array.from({ length: 32 }, (_, i) => {
                const angle = (i / 32) * Math.PI * 2;
                const distance = 85 + (i % 6) * 25;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance - 25;
                const colors = ['#f43f5e', '#ec4899', '#f59e0b', '#fb7185', '#a855f7', '#fbbf24', '#ffffff'];
                const color = colors[i % colors.length];
                return (
                  <span
                    key={i}
                    className="confetti-piece"
                    style={{
                      '--tx': `${tx}px`,
                      '--ty': `${ty}px`,
                      '--rot': `${(i * 45) % 360}deg`,
                      backgroundColor: color,
                      animationDelay: `${(i % 5) * 0.04}s`,
                    } as React.CSSProperties}
                  />
                );
              })}
            </div>
          )}
          <div className="candles">
            {[0, 1, 2].map((i) => (
              <span className="candle" key={i}>
                {!wished ? <span className="flame" /> : <span className="smoke-puff" />}
              </span>
            ))}
          </div>
          <div className="cake-top" />
          <div className="cake-body">
            <Heart size={20} />
            <Heart size={20} />
            <Heart size={20} />
          </div>
          <div className="cake-plate" />
        </div>

        <div className="wish-action-area">
          <Button
            className={`wish-button ${wished ? 'wished-active' : ''}`}
            onClick={() => {
              if (!wished) setWished(true);
            }}
          >
            {wished ? '✨ Wish made with all my heart ✨' : 'Make a wish & blow out the candles 🎂'}
          </Button>
          {wished && (
            <button
              type="button"
              className="relight-link"
              onClick={() => setWished(false)}
            >
              <RotateCcw size={12} /> Relight candles
            </button>
          )}
        </div>

        {wished && (
          <div className="wish-celebration" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i} className={`wish-spark wish-spark-${i % 12}`}>
                {['✧', '💖', '✨', '🌸'][i % 4]}
              </span>
            ))}
          </div>
        )}
      </section>

      <section id="story" className="story-section section-space">
        <SectionHeading eyebrow="EVERY LOVE HAS A BEGINNING" title="And then, there was you." note="Some moments change everything. Meeting you was mine." />
        <div className="story-grid">
          {['The day we met', 'The little things', 'Everything ahead'].map((title, i) => (
            <article className="story-moment" key={title}>
              <div className="polaroid">
                <PhotoPlaceholder
                  number={i+1}
                  caption={title}
                  className="photo-clickable"
                  onClick={() => setSelectedPhoto(BIRTHDAY_PHOTOS[i+1])}
                />
                <p>{['where our story began', 'falling for you, again & again', 'my favourite future is ours'][i]}</p>
              </div>
              <span className="moment-number">0{i+1} <span /></span>
              <h3>{title}</h3>
              <p>{[
                'The awkward hellos. The terrible jokes. Within five minutes, it felt like I’d known you forever. I didn’t know it yet, but my life had just gotten so much brighter.',
                'The inside jokes, the unexpected smiles, the moments that belong only to us. Somewhere in all those little things, you became my everything.',
                'More birthdays. More adventures. More ordinary days made extraordinary by you. Whatever comes next, I want to find it with you.',
              ][i]}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="memories" className="memories-section section-space">
        <SectionHeading eyebrow="THE MOMENTS I KEEP CLOSE" title="If memories were love notes…" note="I’d fill every page with you." />
        <div className="memory-film"><div className="film-perforations" />
          <div className="memory-grid">{[0,1,2].map(offset => { const i = (memory+offset)%memories.length; const photoNum = i+4; return <div className="memory-frame" key={i}><PhotoPlaceholder number={photoNum} caption={memories[i]} className="photo-clickable" onClick={() => setSelectedPhoto(BIRTHDAY_PHOTOS[photoNum])} /><p>{memories[i]} <Heart size={12} /></p></div>; })}</div>
          <div className="film-perforations" /></div>
        <div className="carousel-controls"><Button variant="outline" size="icon" aria-label="Previous memories" onClick={() => setMemory((memory+memories.length-1)%memories.length)}><ArrowLeft /></Button><span>{String(memory+1).padStart(2,'0')} <span>/ {String(memories.length).padStart(2,'0')}</span></span><Button variant="outline" size="icon" aria-label="Next memories" onClick={() => setMemory((memory+1)%memories.length)}><ArrowRight /></Button></div>
      </section>

      <VideoSection />

      <ScrapbookSection onSelectPhoto={(p) => setSelectedPhoto(p)} />

      <section id="reasons" className="reasons-section section-space">
        <SectionHeading eyebrow="A FEW OF MY INFINITE REASONS" title="You, in all your little ways." note="There are a thousand reasons. Here are a few close to my heart." />
        <div className="reasons-grid">
          {reasons.map(([title, text], i) => (
            <div
              key={title}
              className={`reason-card ${flipped.includes(i) ? 'flipped' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`${flipped.includes(i) ? 'Reason revealed' : 'Reveal photo'}: ${title}`}
              aria-pressed={flipped.includes(i)}
              onClick={() => {
                if (!flipped.includes(i)) {
                  setFlipped((prev) => [...prev, i]);
                }
              }}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !flipped.includes(i)) {
                  e.preventDefault();
                  setFlipped((prev) => [...prev, i]);
                }
              }}
            >
              <span className="reason-front">
                <span className="reason-icon">{['♡','✧','❀','∞'][i]}</span>
                <span className="reason-title">{title}</span>
                <span className="reason-text">{text}</span>
                <span className="reason-turn"><RotateCcw size={12} /> Click to flip & reveal</span>
              </span>
              <span className="reason-back">
                <PhotoPlaceholder number={i+12} caption={title} />
                <span>{title}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="gallery" className="gallery-section section-space">
        <SectionHeading eyebrow="MY FAVOURITE VIEW WILL ALWAYS BE YOU" title="All for U." note="Every picture, every smile, forming the sweetest letter in my world." />
        <div className="u-collage">
          <div className="u-center-message" aria-hidden="true">
            <span className="u-letter">U</span>
            <p className="u-subtext">Forever & Always</p>
            <div className="u-heart">♡</div>
          </div>
          {[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((number,i) => (
            <div
              className={`u-photo u-photo-${i}`}
              key={number}
              onClick={() => setSelectedPhoto(BIRTHDAY_PHOTOS[number])}
            >
              <PhotoPlaceholder number={number} className="photo-clickable" />
            </div>
          ))}
        </div>
        <p className="handwritten gallery-caption">Shaped in U. A little piece of my heart in every photo.</p>
      </section>

      <section id="letter" className="letter-section section-space">
        <SectionHeading eyebrow="SOME THINGS DESERVE TO BE WRITTEN" title="From my heart to yours." />
        {letterState !== 'open' ? (
          <div className="envelope-wrap">
            <div
              className={`envelope ${letterState === 'opening' ? 'is-opening' : ''}`}
              role="button"
              tabIndex={0}
              aria-label="Open love letter"
              onClick={handleOpenLetter}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenLetter();
                }
              }}
            >
              <div className="envelope-flap" />
              <div className="wax-seal">
                <Heart fill="currentColor" size={21} />
              </div>
              <div className="envelope-sliding-letter">
                <Heart className="sliding-letter-heart" size={22} />
                <span className="sliding-letter-title">My dearest Sameee diii</span>
                <span className="sliding-letter-hint">Happy Birthday...</span>
              </div>
              <div className="envelope-pocket" />
              <span className="envelope-address">For my Sameee</span>
              <span className="envelope-from">WITH LOVE, FOR SAMEE</span>
            </div>

            <Button
              variant="link"
              className="open-letter-btn"
              onClick={handleOpenLetter}
              disabled={letterState === 'opening'}
            >
              <Mail size={15} /> {letterState === 'opening' ? 'Opening your letter with love...' : 'Click to unseal & open your letter ♡'}
            </Button>
          </div>
        ) : (
          <article className="love-letter">
            <Heart className="letter-heart" size={26} />
            <h3>My dearest Sameee diii,</h3>
            
            <div className="letter-salutation-highlight">
              Happyyyy Birthdayyyy diiiiiii, en azhagana ponneeee, en uyir thozhiyeee, en forever personnnn! 🥹❤️🫂🫶🏻🎂💗
            </div>

            <p>
              First of all, I just wanna say that nee en life la irukkuradhu enakku evlo periya blessing nu unakku theriyuma diii? 🥺❤️ Nee en best friend mattum illa dii, nee en childhood, en happiness, en memories, en favourite person, en life la nadandha azhagana moments oda oru periya part. Unna friend nu mattum solla enakku thonadhu dii, because nee enakku adhukkum mela… romba romba special. 🫂💗
            </p>

            <p>
              Namma childhood la irundhu ippo varaikkum evlo memories create pannirukkom la diii! 😭❤️ Namma serndhu pesinadhu, sirichadhu, mokka potadhu, chinna chinna vishayathukkellam happy aanadhu, reason eh illama sirichadhu, namakku mattum puriyura andha silly moments ellame enakku innum nyabagam irukku dii. Sometimes andha old memories ellam nenacha, enakku theriyamale smile vandhurum… adhe time la unna romba miss panren nu manasu valikkum. 🥹🫶🏻
            </p>

            <p>
              Andha bus rides, metro rides, bike rides… namma pona places, serndhu suthina streets, namma enjoy panna moments, theme park la spend panna time… ellame enakku just memories illa dii, en life la naan romba precious ah vechurukka moments. 🥺❤️ Andha rides la destination vida, nee en kooda irundhadhu dhaan special. Enga ponaalum, en pakkathula nee irundha podhum, andha day automatically nalla day aayidum dii. Namma rendu perum serndhu evlo places explore pannirukkom, evlo pudhu experiences enjoy pannirukkom! Ippo thirumbi yosichu paatha, namma appo evlo happy ah irundhom nu thonudhu dii. 😭💗
            </p>

            <p>
              Unnaala dhaan naan en life la neraya pudhu vishayangal explore pannirukken. En comfort zone ah thaandi neraya things experience pannirukken. Pudhu places paathirukken, pudhu memories create pannirukken, life ah konjam different ah enjoy panna kathukittirukken. Maybe nee enna change pannina nu unakke theriyadhu dii, but un kooda irundha moments en life ah evlo azhaga maathirukku nu enakku mattum dhaan theriyum. 🫂❤️ Nee en life la vandhadhukku naan unmaiyave romba lucky diii. Un kooda irundha memories ah yaaralayum replace panna mudiyadhu, and un place ah yaaralayum eduthukka mudiyadhu. 🥹💞
            </p>

            <p>
              Aana dii… ippo indha birthday message type pannumbodhu, happy ah irukkanuma illa azhanuma nu enakke theriyala. 🥺💔 Because unna ivlo miss panren dii. Munnaadi maari eppo venumnaalum pesuradhu, chinna chinna vishayangal share panradhu, edhavadhu nadandha udane un kitta sollanum nu thonradhu, serndhu sirikkuradhu, random ah plans poduradhu… idhellam romba miss panren. Sometimes oru memory nyabagam varumbodhu, adha unna kooda share pannanum nu thonum. Aana ippo namakku nadula irukkura distance ah nenacha romba kashtama irukku dii. 😭🫂
            </p>

            <p>
              Nee en life la irundha oru chapter mattum illa dii… nee en life story la marakka mudiyadha oru beautiful part. Namma future la evlo change aanaalum, evlo busy aanaalum, evlo distance vandhaalum, namma serndhu create panna memories enakku eppovume special dhaan. I still wish to make more memories with you, go to more places with you, have more random rides with you, laugh till our stomach hurts, and one day indha old memories ah nenachu, &ldquo;dei, namma evlo loosu maari irundhom la!&rdquo; nu serndhu sirikkanum. 😭😂❤️
            </p>

            <p>
              On your birthday, enakku un kitta solla vendiyadhu onnu dhaan dii… PLEASE BE HAPPY. Un life la nee deserve panra ella happiness um unakku kidaikkanum. Un dreams ellam fulfil aaganum. Nee eppovume smile pannitte irukkanum. Unna genuinely love panra, care panra people un life la irukkanum. Nee evlo periya aal aanaalum, un heart la irukkura andha beautiful side ah eppovume lose pannidadha dii. You deserve so much love, peace, success and happiness. ❤️🧿✨
            </p>

            <p>
              And lastly… I MISS YOU SO MUCH DI. Romba romba miss panren. Namma old conversations ah, namma silly fights ah, namma laughter ah, namma rides ah, namma adventures ah, namma random moments ah… ellathayum miss panren. Sometimes I wish I could go back to those days just for a little while, just to experience that happiness with you one more time. Aana past ku thirumba poga mudiyadhu la dii… so namakku future la innum azhagana memories create panna oru chance kidaikkanum nu dhaan aasai padren. 🥺❤️🩹🫂
            </p>

            <p>
              Happy birthday once again, en chellakuttyyy, en childhood bestie, en favourite human, en life oda most special friendships la one of the most precious person! 🥹🎂💗
            </p>

            <p>
              Namma bond thirumba repair aagi, misunderstandings ellam clear aagi, namma friendship innum strong aagi, lifetime full ah continue aaganum nu manasaara wish panren dii. No matter how much time passes, namma share panna memories will always mean something beautiful to me. ❤️
            </p>

            <div className="letter-highlight">
              <p><strong>I LOVE YOU SO MUCH DI, MY BEST FRIEND FOREVER..🫂❤️🧿</strong></p>
            </div>

            <p>
              Once again, happiest birthday diiiii! 🥹💗 Un birthday la nee evlo happy ah irukkanumo, adha vida adhigama happy ah irukkanum nu naan wish panren. And somewhere in my heart, I'm still wishing for the day namma rendu perum thirumba serndhu, old memories ah nenachu sirichu, pudhu memories create pannuvom. Until then, take care of yourself, keep smiling, and never forget how special you are to me diii. 🫶🏻😭❤️
            </p>

            <p className="letter-closing">
              En life la nee irundha memories are irreplaceable, and the place you hold in my heart will always be special. Happy Birthday, my forever childhood bestie! 🥹🫂💖🎂✨
            </p>

            <div className="letter-signature">
              <span className="signature-salutation">With all my love & heart,</span>
              <span className="signature-bestie">Un bestie, forever and always. 💗🫶🏻</span>
              <strong>Samee ♡</strong>
            </div>

            <div className="letter-fold-wrapper">
              <Button
                variant="outline"
                className="fold-letter-btn"
                onClick={handleCloseLetter}
              >
                <RotateCcw size={14} /> Fold letter & put back in envelope ♡
              </Button>
            </div>
          </article>
        )}

        <div className="journey-conclusion">
          <p className="final-note">You are my favourite kind of forever. ♡</p>
        </div>
      </section>
    </main>

    {selectedPhoto && (
      <div
        className="photo-lightbox"
        role="dialog"
        aria-modal="true"
        onClick={() => setSelectedPhoto(null)}
      >
        <div className="lightbox-backdrop" />
        <div className="lightbox-content" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close photo view"
          >
            ✕
          </button>
          <div className="lightbox-frame">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="lightbox-img"
            />
            {selectedPhoto.caption && (
              <p className="lightbox-caption">{selectedPhoto.caption} ♡</p>
            )}
          </div>
        </div>
      </div>
    )}

    {/* Background audio element for automatic playback on page entry */}
    <audio
      ref={audioRef}
      id="birthday-bg-audio"
      src="/audio/bg-music.mp3"
      autoPlay
      loop
      playsInline
      preload="auto"
      onPlay={() => setIsPlayingMusic(true)}
      onPause={() => setIsPlayingMusic(false)}
      style={{ display: 'none' }}
    />

    {/* Floating song controller */}
    <button
      type="button"
      className={`floating-music-player ${isPlayingMusic ? 'is-playing' : 'is-paused'}`}
      onClick={toggleMusic}
      aria-label={isPlayingMusic ? 'Pause song' : 'Play Nee Thinam Siricha Pothume'}
      title={isPlayingMusic ? 'Now playing: Nee Thinam Siricha Pothume' : 'Click to play: Nee Thinam Siricha Pothume'}
    >
      <div className="music-bars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <span className="music-label">
        {isPlayingMusic ? 'Nee Thinam Siricha Pothume 🎵' : 'Play our song 🎵'}
      </span>
    </button>

    <footer><span>Made with all my love, just for you.</span><span className="footer-signature">Samee <Heart size={12} /> Sameee</span><span>ALWAYS & IN ALL WAYS</span></footer>
  </div>;
}

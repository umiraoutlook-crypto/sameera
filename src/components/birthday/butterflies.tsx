import { useEffect, useRef } from 'react';

export function Butterfly({ className = '' }: { className?: string }) {
  return <svg className={`butterfly ${className}`} viewBox="0 0 100 80" fill="none" aria-hidden="true">
    <g className="wing wing-left">
      <path d="M49 38C40 13 9 0 7 19C4 34 24 43 44 44C25 39 13 48 20 62C29 76 44 60 49 43Z" className="wing-fill" />
      <path d="M48 39 15 19M47 41 21 31M46 45 26 59M45 47 32 51" className="wing-veins" />
      <path d="M14 17 16 21M20 14 22 18M28 19 30 23M24 59 28 60M32 63 35 60" className="wing-dots" />
    </g>
    <g className="wing wing-right">
      <path d="M51 38C60 13 91 0 93 19C96 34 76 43 56 44C75 39 87 48 80 62C71 76 56 60 51 43Z" className="wing-fill" />
      <path d="M52 39 85 19M53 41 79 31M54 45 74 59M55 47 68 51" className="wing-veins" />
      <path d="M86 17 84 21M80 14 78 18M72 19 70 23M76 59 72 60M68 63 65 60" className="wing-dots" />
    </g>
    <path d="M50 30C48 36 48 49 50 57C52 49 52 36 50 30ZM50 31C48 26 45 24 43 25M50 31C52 26 55 24 57 25" className="butterfly-body" />
  </svg>;
}

export function ButterflyGarden({ active }: { active: boolean }) {
  const follower = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;
    let frame = 0;
    let targetX = -100, targetY = -100, x = -100, y = -100;
    const move = (event: PointerEvent) => { targetX = event.clientX + 22; targetY = event.clientY + 16; };
    const animate = () => {
      x += (targetX - x) * 0.045; y += (targetY - y) * 0.045;
      if (follower.current) follower.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${Math.max(-25, Math.min(25, (targetX-x)*0.2))}deg)`;
      frame = requestAnimationFrame(animate);
    };
    window.addEventListener('pointermove', move);
    frame = requestAnimationFrame(animate);
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(frame); };
  }, [active]);
  return <div className={`butterfly-garden ${active ? '' : 'is-paused'}`} aria-hidden="true">
    <div className="floating-butterfly butterfly-one"><Butterfly /></div>
    <div className="floating-butterfly butterfly-two"><Butterfly /></div>
    <div className="floating-butterfly butterfly-three"><Butterfly /></div>
    {active && <div className="cursor-butterfly" ref={follower}><Butterfly /></div>}
  </div>;
}
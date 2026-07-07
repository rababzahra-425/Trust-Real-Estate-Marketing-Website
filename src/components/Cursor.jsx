'use client';
import { useEffect, useRef, useState } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const hasTouch = window.matchMedia('(pointer: coarse)').matches;
      const isWide = window.innerWidth >= 1024;
      setIsDesktop(!hasTouch && isWide);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouseX}px,${mouseY}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ringX}px,${ringY}px)`;
      requestAnimationFrame(animate);
    };

    const expand   = () => { dotRef.current?.classList.add('expanded');    ringRef.current?.classList.add('expanded'); };
    const collapse = () => { dotRef.current?.classList.remove('expanded'); ringRef.current?.classList.remove('expanded'); };

    document.addEventListener('mousemove', onMove);
    const animationFrameId = requestAnimationFrame(animate);

    const attach = () => {
      document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', expand);
        el.addEventListener('mouseleave', collapse);
      });
    };
    attach();

    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animationFrameId);
      mo.disconnect();
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

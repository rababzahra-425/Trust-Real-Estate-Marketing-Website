'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PortfolioShowcase.css';

// Content definitions for B2B Agency
// const HEADING_HTML = <>Our Goal is to build <br />Trust & <em>Relationships</em></>;
const HEADING_HTML = <>Your Goals. Our Expertise. <br /><em>Shared Success.</em></>;
const KEYWORDS = [
  "01. Property Sales",
  "02. Investment Advisory",
  "03. Digital Marketing",
  "04. Business & Documentation Support"
];
const METRICS = [
  { value: "100%", label: "LEGAL CLEARANCE" },
  { value: "0%", label: "ESCROW DISPUTE" }
];

export default function PortfolioShowcase() {
  const [mounted, setMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCovered, setIsCovered] = useState(false);
  const [currentImage, setCurrentImage] = useState('/dark_luxury_hero.png');
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Client-side guard to prevent SSR hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Check mobile screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay Infinite Loop: Cycle between State A (locked) and State B (unlocked) every 6 seconds
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      const nextUnlocked = !isUnlocked;

      // Phase 1: Cover image with vertical slices
      setIsCovered(true);

      // Midpoint: Swap content & image while fully covered (750ms delay)
      const swapTimeout = setTimeout(() => {
        setIsUnlocked(nextUnlocked);
        setCurrentImage(nextUnlocked ? '/about_header.png' : '/dark_luxury_hero.png');
        setShowContent(nextUnlocked);
      }, 750);

      // Phase 2: Uncover image to reveal new view (850ms delay)
      const revealTimeout = setTimeout(() => {
        setIsCovered(false);
      }, 850);

      return () => {
        clearTimeout(swapTimeout);
        clearTimeout(revealTimeout);
      };
    }, 6000);

    return () => clearInterval(interval);
  }, [mounted, isUnlocked]);

  if (!mounted) {
    return null;
  }

  const stripCount = isMobile ? 4 : 10;

  // Framer Motion Variants for Slices
  const stripVariants = {
    revealed: (i) => ({
      scaleX: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        // Sweep right-to-left reveal: rightmost strips start shrinking first
        delay: (stripCount - 1 - i) * 0.04,
      }
    }),
    covered: (i) => ({
      scaleX: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        // Sweep right-to-left cover: rightmost strips start expanding first
        delay: (stripCount - 1 - i) * 0.04,
      }
    })
  };

  // Framer Motion Variants for Morphing Text "unlock."
  const textVariants = {
    locked: {
      left: "50%",
      top: "50%",
      x: "-50%",
      y: "-50%",
      scale: 1,
      color: "#FFFFFF",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    unlocked: {
      left: isMobile ? "20px" : "40px",
      top: isMobile ? "20px" : "40px",
      x: 0,
      y: 0,
      scale: isMobile ? 0.35 : 0.45,
      color: "#C9A84C",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  // Framer Motion Variants for Staggered Content Fade-In (State B)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="pf-section" id="society-marketing" aria-label="Society Marketing Services">
      {/* Background Visual Container */}
      <div className="pf-media-container">
        <img
          src={currentImage}
          alt={isUnlocked ? "Society Aerial View" : "Society Exterior"}
          className="pf-bg-img"
        />
        <div className={`pf-bg-overlay ${isUnlocked ? 'unlocked' : ''}`} />
      </div>

      {/* Vertical Slices Overlay (transform-gpu used for 60fps performance) */}
      <div className="pf-slices-container">
        {Array.from({ length: stripCount }).map((_, i) => (
          <motion.div
            key={i}
            className="pf-slice-strip transform-gpu"
            style={{
              width: `${100 / stripCount}%`,
              transformOrigin: isCovered ? "right center" : "left center"
            }}
            custom={i}
            variants={stripVariants}
            animate={isCovered ? "covered" : "revealed"}
            initial={{ scaleX: 0 }}
          />
        ))}
      </div>

      {/* Morphing Minimalist Typography "unlock." */}
      <motion.div
        className="pf-unlock-text-framer transform-gpu"
        style={{
          transformOrigin: "left top",
          fontSize: isMobile ? "4.5rem" : "6.5rem"
        }}
        variants={textVariants}
        animate={isUnlocked ? "unlocked" : "locked"}
        initial="locked"
      >
        Goal
      </motion.div>

      {/* Content Overlay Grid (revealed when unlocked) */}
      <AnimatePresence>
        {showContent && (
          <div className="pf-content-overlay">
            <motion.div
              className="pf-content-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Left Side: Heading & Metrics */}
              <div className="pf-content-left">
                <motion.h2 className="pf-b2b-heading" variants={childVariants}>
                  {HEADING_HTML}
                </motion.h2>

                <motion.div className="pf-b2b-metrics" variants={childVariants}>
                  {METRICS.map((m, idx) => (
                    <div key={idx} className="pf-b2b-metric-card">
                      <span className="pf-b2b-metric-val">{m.value}</span>
                      <span className="pf-b2b-metric-lbl">{m.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Side: Keywords Replacing About/Work */}
              <div className="pf-content-right">
                {KEYWORDS.map((k, idx) => (
                  <motion.div
                    key={idx}
                    className="pf-keyword-row"
                    variants={childVariants}
                    whileHover={{ x: 5 }}
                  >
                    <span className="pf-keyword-text">{k}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

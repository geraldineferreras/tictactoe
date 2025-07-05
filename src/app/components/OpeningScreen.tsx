"use client";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface OpeningScreenProps {
  onStart: () => void;
}

const bgGrid = [
  ["X", "O", "X"],
  ["O", "X", "O"],
  ["X", "O", "X"],
];

const NUM_RAIN = 24;

function generateRainIcons(batch = 0) {
  return Array.from({ length: NUM_RAIN }).map((_, i) => {
    const type = Math.random() > 0.5 ? "X" : "O";
    const left = `${Math.random() * 95}%`;
    const delay = Math.random() * 1.2;
    const duration = 1.2 + Math.random() * 1.2;
    const size = 48 + Math.random() * 60;
    const opacity = 0.3 + Math.random() * 0.4;
    return { type, left, delay, duration, size, opacity, key: `${batch}-${i}` };
  });
}

export function OpeningScreen({ onStart }: OpeningScreenProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const bgAudioRef = useRef<HTMLAudioElement>(null);
  const playSoundRef = useRef<HTMLAudioElement>(null);
  const openingSoundRef = useRef<HTMLAudioElement>(null);
  const [rainBatch, setRainBatch] = useState(0);
  const [rainIcons, setRainIcons] = useState(() => generateRainIcons(0));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setRainBatch((b) => b + 1);
      setRainIcons(generateRainIcons(rainBatch + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [rainBatch, mounted]);

  useEffect(() => {
    // Try to play immediately on mount
    if (openingSoundRef.current) {
      openingSoundRef.current.currentTime = 0;
      openingSoundRef.current.muted = false;
      openingSoundRef.current.volume = 1;
      openingSoundRef.current.play().catch(() => {});
    }
    // Fallback: try again after first user interaction
    const handler = () => {
      if (openingSoundRef.current) {
        openingSoundRef.current.currentTime = 0;
        openingSoundRef.current.muted = false;
        openingSoundRef.current.volume = 1;
        openingSoundRef.current.play().catch(() => {});
      }
    };
    window.addEventListener("pointerdown", handler, { once: true });
    return () => window.removeEventListener("pointerdown", handler);
  }, []);

  const handleStart = () => {
    if (playSoundRef.current) {
      playSoundRef.current.currentTime = 0;
      playSoundRef.current.muted = false;
      playSoundRef.current.volume = 1;
      playSoundRef.current.play().catch((e) => {
        console.warn('Could not play sound:', e);
      });
    }
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
    }
    setTimeout(onStart, 800); // Wait a bit longer to ensure sound plays before switching
  };

  // Handler for manual sound play
  const playOpeningSound = () => {
    if (openingSoundRef.current) {
      openingSoundRef.current.currentTime = 0;
      openingSoundRef.current.muted = false;
      openingSoundRef.current.volume = 1;
      openingSoundRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Background music */}
      <audio ref={bgAudioRef} src="/background-sound.mp3" autoPlay loop preload="auto" />
      {/* Start game sound effect */}
      <audio ref={playSoundRef} src="/sound-play.mp3" preload="auto" />
      {/* Opening sound effect */}
      <audio ref={openingSoundRef} src="/background-sound.mp3" preload="auto" />
      {/* Rain X/O icons */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none select-none z-20">
          {rainIcons.map((icon) => (
            <motion.div
              key={icon.key}
              initial={{ y: -120, opacity: 0 }}
              animate={{ y: '100vh', opacity: icon.opacity }}
              transition={{ delay: icon.delay, duration: icon.duration, ease: "easeOut" }}
              style={{ left: icon.left, top: 0, position: "absolute" }}
            >
              {icon.type === "X" ? (
                <svg width={icon.size} height={icon.size} viewBox="0 0 56 56" fill="none" className="opacity-60">
                  <line x1="12" y1="12" x2="44" y2="44" stroke="#2196f3" strokeWidth="10" strokeLinecap="round" />
                  <line x1="44" y1="12" x2="12" y2="44" stroke="#2196f3" strokeWidth="10" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width={icon.size} height={icon.size} viewBox="0 0 56 56" fill="none" className="opacity-60">
                  <circle cx="28" cy="28" r="18" stroke="#ff9800" strokeWidth="10" fill="none" />
                </svg>
              )}
            </motion.div>
          ))}
        </div>
      )}
      {/* Animated background grid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full max-w-5xl max-h-[80vh] mx-auto opacity-60">
          {bgGrid.flatMap((row, i) =>
            row.map((val, j) => (
              <motion.div
                key={i + '-' + j}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.18 }}
                transition={{ delay: 0.1 * (i * 3 + j), duration: 0.7, type: "spring" }}
                className="flex items-center justify-center w-full h-full"
              >
                {val === "X" ? (
                  <svg width="120" height="120" viewBox="0 0 56 56" fill="none">
                    <line x1="12" y1="12" x2="44" y2="44" stroke="#2196f3" strokeWidth="6" strokeLinecap="round" />
                    <line x1="44" y1="12" x2="12" y2="44" stroke="#2196f3" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="120" height="120" viewBox="0 0 56 56" fill="none">
                    <circle cx="28" cy="28" r="18" stroke="#ff9800" strokeWidth="6" fill="none" />
                  </svg>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
      {/* Title */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
        className="z-10"
      >
        <div className="flex flex-col items-center">
          <span className="text-blue-600 font-extrabold text-lg sm:text-xl tracking-widest mb-1" style={{letterSpacing: '0.12em'}}>ULTIMATE</span>
          <div className="flex flex-row items-end gap-2">
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              className="font-title text-[2.8rem] sm:text-[4.5rem] text-orange-500 font-extrabold drop-shadow-lg"
              style={{letterSpacing: '0.04em'}}
            >
              Tic
            </motion.span>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
              className="font-title text-[2.8rem] sm:text-[4.5rem] text-orange-500 font-extrabold drop-shadow-lg"
              style={{letterSpacing: '0.04em'}}
            >
              Tac
            </motion.span>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
              className="font-title text-[2.8rem] sm:text-[4.5rem] text-orange-500 font-extrabold drop-shadow-lg"
              style={{letterSpacing: '0.04em'}}
            >
              Toe
            </motion.span>
          </div>
        </div>
      </motion.div>
      {/* Start Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5, type: "spring" }}
        onClick={handleStart}
        className="z-10 mt-10 px-10 py-4 rounded-2xl bg-orange-500 text-white font-extrabold text-2xl shadow-lg hover:scale-105 active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-4 focus:ring-orange-300"
      >
        Start Game
        <audio ref={audioRef} src="/start-sound.mp3" preload="auto" />
      </motion.button>
      {/* Opening sound manual trigger */}
      <button
        onClick={playOpeningSound}
        className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        style={{ opacity: 0.92 }}
      >
        click here for sound
      </button>
    </div>
  );
} 
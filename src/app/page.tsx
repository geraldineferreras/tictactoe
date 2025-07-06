"use client";
import React, { useState, useEffect, useRef } from "react";
import { GameBoard } from "./components/GameBoard";
import { Status } from "./components/Status";
import { ResetButton } from "./components/ResetButton";
import { MoveHistory } from "./components/MoveHistory";
import { ThemeToggle } from "./components/ThemeToggle";
import { calculateWinner, getWinningLine, isDraw } from "@/lib/utils";
import { motion } from "framer-motion";
import { OpeningScreen } from "./components/OpeningScreen";

export default function Home() {
  const [showOpening, setShowOpening] = useState(true);
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null) as (string | null)[] },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState<Record<string, number>>({ X: 0, O: 0, Draw: 0 });
  const bgMusicRef = useRef<HTMLAudioElement>(null);
  const moveSoundRef = useRef<HTMLAudioElement>(null);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const winningLine = getWinningLine(current.squares);
  const draw = !winner && isDraw(current.squares);

  // Update scoreboard on win/draw
  function handleWinOrDraw() {
    if (winner && stepNumber === history.length - 1) {
      setScore((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
    } else if (draw && stepNumber === history.length - 1) {
      setScore((prev) => ({ ...prev, Draw: prev.Draw + 1 }));
    }
  }
  // Only update on new win/draw
  useEffect(handleWinOrDraw, [winner, draw, stepNumber, history.length]);

  useEffect(() => {
    const bgMusic = bgMusicRef.current;
    if (!showOpening && bgMusic) {
      bgMusic.currentTime = 0;
      bgMusic.muted = false;
      bgMusic.volume = 1;
      bgMusic.loop = true;
      bgMusic.play().catch(() => {});
    }
    return () => {
      if (bgMusic) {
        bgMusic.pause();
      }
    };
  }, [showOpening]);

  function handleClick(i: number) {
    const slicedHistory = history.slice(0, stepNumber + 1);
    const squares = current.squares.slice();
    if (winner || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    setHistory([...slicedHistory, { squares }]);
    setStepNumber(slicedHistory.length);
    setXIsNext(!xIsNext);
    // Play move sound
    if (moveSoundRef.current) {
      moveSoundRef.current.currentTime = 0;
      moveSoundRef.current.muted = false;
      moveSoundRef.current.volume = 1;
      moveSoundRef.current.play().catch(() => {});
    }
  }

  function jumpTo(step: number) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function handleReset() {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  }

  if (showOpening) {
    return <OpeningScreen onStart={() => setShowOpening(false)} />;
  }

  return (
    <div className="flex flex-col min-h-screen min-w-full items-center justify-center bg-background px-2 overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center w-full max-w-6xl"
      >
        <h1 className="font-title text-5xl sm:text-6xl text-[#181c2f] dark:text-white drop-shadow-lg tracking-widest text-center mb-2">
          TIC-TAC-TOE <span className="text-[var(--color-x)]">GAME</span>
        </h1>
        <div className="uppercase text-[var(--color-x)] text-sm font-bold tracking-widest mb-6 text-center">
          
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-12">
          <div className="flex flex-col items-center justify-center">
            <Status winner={winner} xIsNext={xIsNext} draw={draw} />
            <GameBoard
              squares={current.squares}
              onClick={handleClick}
              winningLine={winningLine}
              disabled={!!winner || draw}
            />
            <ResetButton onClick={handleReset} disabled={stepNumber === 0 && !winner && !draw} />
          </div>
          <div className="flex flex-col items-center w-full max-w-xs mt-4 md:mt-0">
            <div className="flex justify-between w-full text-lg font-bold mb-3 gap-2">
              <span className="text-[var(--color-x)] dark:text-yellow-300">X Wins: {score.X}</span>
              <span className="text-[var(--color-o)] dark:text-purple-300">O Wins: {score.O}</span>
              <span className="text-primary dark:text-gray-100">Draws: {score.Draw}</span>
            </div>
            <MoveHistory history={history} stepNumber={stepNumber} jumpTo={jumpTo} />
          </div>
        </div>
      </motion.div>
      <footer className="mt-2 text-xs text-muted-foreground text-center">
        Built with Next.js, React 19, Tailwind, ShadCN UI, and ❤️
      </footer>
      <audio ref={bgMusicRef} src="/sound-play.mp3" preload="auto" />
      <audio ref={moveSoundRef} src="/movement.mp3" preload="auto" />
    </div>
  );
}

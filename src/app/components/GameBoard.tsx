"use client";
import { Square } from "./Square";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GameBoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
  disabled: boolean;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const squareVariants = {
  hidden: { scale: 0.7, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

export function GameBoard({ squares, onClick, winningLine, disabled }: GameBoardProps) {
  return (
    <motion.div
      className="grid grid-cols-3 gap-4 w-full aspect-square"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {squares.map((value, i) => (
        <motion.div key={i} variants={squareVariants}>
          <Square
            value={value}
            onClick={() => onClick(i)}
            highlight={winningLine?.includes(i)}
            disabled={disabled || !!value}
            index={i}
          />
        </motion.div>
      ))}
    </motion.div>
  );
} 
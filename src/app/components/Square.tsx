"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  highlight?: boolean;
  disabled?: boolean;
  index?: number;
}

function XOIcon({ value }: { value: string | null }) {
  if (value === "X") {
    return (
      <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
        <g filter="url(#x-shadow)">
          <line x1="10" y1="10" x2="80" y2="80" stroke="var(--color-x)" strokeWidth="12" strokeLinecap="round" />
          <line x1="80" y1="10" x2="10" y2="80" stroke="var(--color-x)" strokeWidth="12" strokeLinecap="round" />
        </g>
        <defs>
          <filter id="x-shadow" x="0" y="0" width="90" height="90">
            <feDropShadow dx="4" dy="4" stdDeviation="0" floodColor="var(--color-x-shadow)"/>
          </filter>
        </defs>
      </svg>
    );
  }
  if (value === "O") {
    return (
      <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
        <g filter="url(#o-shadow)">
          <circle cx="45" cy="45" r="35" stroke="var(--color-o)" strokeWidth="12" fill="none" />
        </g>
        <defs>
          <filter id="o-shadow" x="0" y="0" width="90" height="90">
            <feDropShadow dx="4" dy="4" stdDeviation="0" floodColor="var(--color-o-shadow)"/>
          </filter>
        </defs>
      </svg>
    );
  }
  return null;
}

export function Square({ value, onClick, highlight, disabled, index }: SquareProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center transition-all duration-200 rounded-2xl border-4 border-[var(--color-board-border)] bg-[var(--color-board)] shadow-xl relative group",
        highlight && "bg-green-400/80 dark:bg-green-600/80 scale-110 z-10",
        disabled && "opacity-60 cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      aria-label={value ? `Square ${value}` : "Empty square"}
      style={{ boxShadow: highlight ? "0 0 0 4px #69f0ae" : undefined }}
    >
      <span className="absolute left-2 top-2 text-lg font-bold text-white/10 select-none pointer-events-none group-hover:text-white/20">
        {index !== undefined ? index + 1 : ""}
      </span>
      <XOIcon value={value} />
    </Button>
  );
} 
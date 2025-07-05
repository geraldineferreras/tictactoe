import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ResetButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function ResetButton({ onClick, disabled }: ResetButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="secondary"
      className="gap-2 w-full max-w-xs mt-2"
      aria-label="Play again"
    >
      <RotateCcw className="w-4 h-4" />
      Play Again
    </Button>
  );
} 
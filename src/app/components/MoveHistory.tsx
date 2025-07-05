import { Button } from "@/components/ui/button";

interface MoveHistoryProps {
  history: { squares: (string | null)[] }[];
  stepNumber: number;
  jumpTo: (move: number) => void;
}

export function MoveHistory({ history, stepNumber, jumpTo }: MoveHistoryProps) {
  return (
    <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
      {history.map((_, move) => {
        const desc = move ? `Go to move #${move}` : "Go to game start";
        return (
          <Button
            key={move}
            variant={move === stepNumber ? "default" : "outline"}
            onClick={() => jumpTo(move)}
            className="w-full text-xs justify-start"
            aria-current={move === stepNumber}
          >
            {desc}
          </Button>
        );
      })}
    </div>
  );
} 
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface StatusProps {
  winner: string | null;
  xIsNext: boolean;
  draw: boolean;
}

export function Status({ winner, xIsNext, draw }: StatusProps) {
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (draw) {
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }
  return (
    <Card className="mb-2 w-full max-w-xs">
      <CardContent className="py-4 text-center text-lg font-semibold">
        {status}
      </CardContent>
      <Separator />
    </Card>
  );
} 
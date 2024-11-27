import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface QuizCompleteProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export function QuizComplete({ score, total, onRestart }: QuizCompleteProps) {
  const percentage = (score / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex justify-center"
          >
            <Trophy className="w-20 h-20 text-primary" />
          </motion.div>
          <CardTitle className="text-4xl font-bold">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-2">
            <p className="text-2xl font-semibold">Your Score</p>
            <p className="text-5xl font-bold text-primary">
              {score} / {total}
            </p>
            <p className="text-lg text-muted-foreground">
              {percentage}% Correct
            </p>
          </div>
          <Button onClick={onRestart} size="lg" className="text-lg px-8">
            Try Again
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

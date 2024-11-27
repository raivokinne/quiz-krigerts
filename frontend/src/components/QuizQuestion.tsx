import { motion } from "framer-motion";
import type { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { QuizOption } from "./QuizOption";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer: string | null;
  onAnswerSelect: (answerId: string) => void;
}

export function QuizQuestion({
  question,
  selectedAnswer,
  onAnswerSelect,
}: QuizQuestionProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold">{question.text}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => (
          <QuizOption
            key={option.id}
            id={option.id}
            text={option.text}
            isSelected={selectedAnswer === option.id}
            onSelect={onAnswerSelect}
          />
        ))}
      </div>
    </motion.div>
  );
}

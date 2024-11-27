import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuizOptionProps {
  id: string;
  text: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function QuizOption({
  id,
  text,
  isSelected,
  onSelect,
}: QuizOptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Button
        variant="outline"
        className={cn(
          "w-full h-auto p-4 text-left justify-start",
          isSelected && "border-primary bg-primary/10",
        )}
        onClick={() => onSelect(id)}
      >
        <span className="text-lg">{text}</span>
      </Button>
    </motion.div>
  );
}

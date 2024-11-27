import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { QuizCategory, QuizDifficulty } from "@/types/quiz";

export function QuizFilters({
  searchTerm,
  category,
  difficulty,
  onSearchChange,
  onCategoryChange,
  onDifficultyChange,
}: {
  searchTerm: string;
  category: QuizCategory | "";
  difficulty: QuizDifficulty | "";
  onSearchChange: (searchTerm: string) => void;
  onCategoryChange: (category: QuizCategory) => void;
  onDifficultyChange: (difficulty: QuizDifficulty) => void;
}) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search quizzes..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="general">All Categories</SelectItem>
          <SelectItem value="Math">Math</SelectItem>
          <SelectItem value="Science">Science</SelectItem>
          <SelectItem value="History">History</SelectItem>
        </SelectContent>
      </Select>
      <Select value={difficulty} onValueChange={onDifficultyChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">All Difficulties</SelectItem>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

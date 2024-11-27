import { Link } from "react-router-dom";
import { PlayCircle } from "lucide-react";
import { Quiz } from "@/types/quiz";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuizCardProps {
  quiz: Quiz;
  user: any;
}

export function QuizCard({ quiz, user }: QuizCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow bg-secondary/20">
      <CardHeader>
        <CardTitle className="text-xl text-orange-600">{quiz.title}</CardTitle>
        <CardDescription>
          {quiz.questions.length} Questions | {quiz.difficulty}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">By {user.name}</span>
          <Link to={`/quiz/${quiz.id}`}>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              <PlayCircle className="mr-2 h-4 w-4" /> Start Quiz
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

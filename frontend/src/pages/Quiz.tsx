import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/components/QuizQuestion";
import { QuizProgress } from "@/components/QuizProgress";
import { QuizComplete } from "@/components/QuizComplete";
import type { Quiz as QuizType } from "@/types/quiz";
import { instance } from "@/lib/axios";

export default function Quiz() {
  const { quizId } = useParams<{ quizId: string }>();
  const [currentQuiz, setCurrentQuiz] = useState<QuizType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await instance.get(`/api/quiz/${quizId}`);
        setCurrentQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading quiz...</p>
      </div>
    );
  }

  if (!currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Quiz not found.</p>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <QuizComplete
        score={score}
        total={currentQuiz.questions.length}
        onRestart={handleRestartQuiz}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              {currentQuiz.title}
            </CardTitle>
            <QuizProgress
              current={currentQuestionIndex + 1}
              total={currentQuiz.questions.length}
            />
          </CardHeader>
          <CardContent className="space-y-8">
            <AnimatePresence mode="wait">
              <QuizQuestion
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                onAnswerSelect={handleAnswerSelect}
              />
            </AnimatePresence>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className="w-full text-lg py-6"
            >
              {currentQuestionIndex === currentQuiz.questions.length - 1
                ? "Complete Quiz"
                : "Next Question"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { QuizCategory, QuizDifficulty, Quiz } from "@/types/quiz";
import { fetchQuizzes } from "@/lib/axios";
import { QuizCard } from "@/components/QuizCard";
import { QuizFilters } from "@/components/QuizFilters";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function BrowseQuizzes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<QuizCategory | "">("");
  const [difficulty, setDifficulty] = useState<QuizDifficulty | "">("");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadQuizzes = async () => {
      setLoading(true);
      try {
        const data = await fetchQuizzes();
        const quizArray = Array.isArray(data) ? data : Object.values(data);
        setQuizzes(quizArray);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) => {
    // Make sure quiz.title is defined and a string before calling .toLowerCase()
    const matchesSearch =
      quiz.title && quiz.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !category || quiz.category === category;
    const matchesDifficulty = !difficulty || quiz.difficulty === difficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-orange-600 flex items-center">
              <Search className="mr-3" /> Browse Quizzes
            </CardTitle>
            <CardDescription>
              Discover and start exciting quizzes across various categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QuizFilters
              searchTerm={searchTerm}
              category={category}
              difficulty={difficulty}
              onSearchChange={setSearchTerm}
              onCategoryChange={setCategory}
              onDifficultyChange={setDifficulty}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">
                  Loading quizzes...
                </div>
              ) : (
                filteredQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))
              )}
            </div>

            {filteredQuizzes.length === 0 && !loading && (
              <div className="text-center py-12 text-muted-foreground">
                No quizzes found matching your search criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

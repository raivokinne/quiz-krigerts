import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { QuizCategory, QuizDifficulty, Quiz, User } from "@/types/quiz";
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
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const loadQuizzes = async () => {
      setLoading(true);
      try {
        const data = await fetchQuizzes();
        Object.values(data).map((quiz: any) => {
          setUser(quiz);
        });
        if (data && typeof data === "object") {
          const quizzesArray = Object.values(data).map((quiz: any) => quiz);
          setQuizzes(quizzesArray);
        } else {
          console.error("Expected an object with quizzes, but received:", data);
          setQuizzes([]);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };
    loadQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) => {
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
                  <QuizCard key={quiz.id} quiz={quiz} user={user} />
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

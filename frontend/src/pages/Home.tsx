import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Play, Trophy, Users, Flame } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Main Content - Flexgrow to fill available space */}
      <main className="flex-grow container mx-auto h-screen px-6 py-16 flex flex-col justify-center">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6 text-orange-600">
            Challenge Your Knowledge
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Compete, learn, and grow with KriegerQuiz - the ultimate interactive
            learning platform
          </p>
          <div className="flex justify-center space-x-4">
            {/* Use Link component for navigation */}
            <Link to="/start-quiz">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Play className="mr-2" /> Start Quiz
              </Button>
            </Link>

            <Link to="/browse-quizzes">
              <Button
                variant="outline"
                size="lg"
                className="border-orange-600 text-orange-600 hover:bg-orange-50"
              >
                <BookOpen className="mr-2" /> Browse Quizzes
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card className="bg-secondary/30 hover:bg-secondary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-3 text-orange-600" /> Competitive Ranking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Climb the leaderboards and track your progress across multiple
                quiz categories.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/30 hover:bg-secondary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-3 text-orange-600" /> Multiplayer Modes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Challenge friends and players worldwide in real-time quiz
                battles.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/30 hover:bg-secondary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Flame className="mr-3 text-orange-600" /> Dynamic Quizzes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Explore a wide range of quiz topics with continuously updated
                content.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-6 px-6 text-center">
        <p>© 2024 KriegerQuiz. All rights reserved.</p>
      </footer>
    </div>
  );
}

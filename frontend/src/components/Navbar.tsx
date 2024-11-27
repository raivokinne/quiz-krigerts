import { Flame } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white text-black py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-3">
        <Flame className="w-10 h-10 text-orange-500" />
        <h1 className="text-2xl font-bold text-orange-500">KriegerQuiz</h1>
      </div>
      <nav className="flex space-x-4">
        <Link to="/login">
          <Button className="hover:bg-primary/80">Login</Button>
        </Link>
        <Link to="/register">
          <Button className="hover:bg-primary/80">Register</Button>
        </Link>
      </nav>
    </header>
  );
}

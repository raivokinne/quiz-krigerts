import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { QuestionForm } from "./QuestionForm";
import { quizSchema, QUIZ_CATEGORIES, type QuizFormData } from "@/schemas";
import { useToast } from "@/hooks/use-toast";
import { getCsrfToken, instance, getCurrentUser } from "@/lib/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function QuizForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.id);
      } else {
        toast({
          title: "Authentication Error",
          description: "Please log in to create a quiz.",
          variant: "destructive",
        });
      }
    };

    fetchUser();
  }, [toast]);

  const form = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      quiz_title: "",
      category: "general",
      questions: [
        { question: "", options: ["", "", "", ""], correctAnswer: 0 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = async (data: QuizFormData) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to create a quiz.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await getCsrfToken();

      const response = await instance.post(
        "/api/quiz/create",
        {
          quiz_title: data.quiz_title,
          category: data.category,
          questions: data.questions,
          user_id: userId,
        },
        { withCredentials: true },
      );

      toast({
        title: "Success",
        description: "Quiz created successfully!",
      });

      // Reset form after successful submission
      form.reset();

      navigate("/browse-quizzes");
    } catch (error) {
      console.error("Failed to create quiz", error);
      toast({
        title: "Error",
        description: "Failed to create quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-4xl space-y-8 bg-card p-8 rounded-xl shadow-lg"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Create a New Quiz
            </h1>
            <p className="text-muted-foreground">
              Fill out the form below to create your quiz.
            </p>
          </div>

          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="quiz_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter quiz title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {QUIZ_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Questions</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    question: "",
                    options: ["", "", "", ""],
                    correctAnswer: 0,
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>

            <div className="space-y-6">
              {fields.map((field, index) => (
                <QuestionForm
                  key={field.id}
                  control={form.control}
                  index={index}
                  onRemove={() => remove(index)}
                  showRemoveButton={fields.length > 1}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              disabled={isLoading || !userId}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Quiz"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

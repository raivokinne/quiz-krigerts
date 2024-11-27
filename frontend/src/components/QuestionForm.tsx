import { Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { QuizFormData } from "@/schemas";

interface QuestionFormProps {
  control: Control<QuizFormData>;
  index: number;
  onRemove: () => void;
  showRemoveButton: boolean;
}

export function QuestionForm({
  control,
  index,
  onRemove,
  showRemoveButton,
}: QuestionFormProps) {
  return (
    <div className="space-y-4 p-6 bg-muted/10 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Question {index + 1}</h2>
        {showRemoveButton && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        )}
      </div>

      <FormField
        control={control}
        name={`questions.${index}.question`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Question</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter your question"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, optionIndex) => (
          <FormField
            key={optionIndex}
            control={control}
            name={`questions.${index}.options.${optionIndex}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option {optionIndex + 1}</FormLabel>
                <FormControl>
                  <Input placeholder={`Option ${optionIndex + 1}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      <FormField
        control={control}
        name={`questions.${index}.correctAnswer`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Correct Answer</FormLabel>
            <FormControl>
              <select
                {...field}
                className="w-full bg-black px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {Array.from({ length: 4 }).map((_, optionIndex) => (
                  <option key={optionIndex} value={optionIndex}>
                    Option {optionIndex + 1}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

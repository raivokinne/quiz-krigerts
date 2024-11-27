import * as z from "zod";

export const quizSchema = z.object({
  quiz_title: z.string().min(1, "Quiz title is required"),
  category: z.string().min(1, "Category is required"),
  questions: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required"),
        options: z
          .array(z.string().min(1, "Option is required"))
          .min(4, "At least 4 options are required"),
        correctAnswer: z
          .string()
          .min(0)
          .max(3, "Select a valid correct answer"),
      }),
    )
    .min(1, "At least one question is required"),
});

export type QuizFormData = z.infer<typeof quizSchema>;

export const QUIZ_CATEGORIES = [
  { value: "general", label: "General Knowledge" },
  { value: "science", label: "Science" },
  { value: "history", label: "History" },
  { value: "technology", label: "Technology" },
] as const;

export const formSchema = z.object({
  files: z
    .custom<FileList>()
    .refine((files) => files.length > 0, {
      message: "Please select at least one file",
    })
    .transform((files) => Array.from(files)),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.search("@"), {
      message: "Please enter a valid email",
    }),
  password: z.string(),
});

export const signupSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .email()
    .refine((email) => email.search("@"), {
      message: "Please enter a valid email",
    }),
  password: z
    .string()
    .min(8)
    .max(32)
    .refine((password) => password.search(/[A-Z]/) !== -1, {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => password.search(/[a-z]/) !== -1, {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => password.search(/[0-9]/) !== -1, {
      message: "Password must contain at least one number",
    })
    .refine(
      (password) =>
        password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) !== -1,
      {
        message: "Password must contain at least one special character",
      },
    ),
  password_confirmation: z.string().min(8).max(32),
});

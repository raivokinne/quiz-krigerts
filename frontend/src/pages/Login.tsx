import { useToast } from "@/hooks/use-toast";
import { instance, getCsrfToken } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await getCsrfToken();

      const response = await instance.post("/api/login", values, {
        withCredentials: true,
      });

      if (response.status === 200) {
        localStorage.setItem("auth_token", response.data.token); // Save token
        toast({
          title: "Logged in successfully.",
          description: "Welcome back!",
        });
        navigate("/");
      } else {
        toast({
          title: "Login failed.",
          description: "Invalid credentials.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login.",
      });
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center py-12 sm:px-6 lg:px-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md w-full grid gap-4"
        >
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">
            Log in
          </h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Log in</Button>
        </form>
      </Form>
    </div>
  );
}

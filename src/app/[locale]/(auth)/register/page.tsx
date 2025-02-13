"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthApi } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/navigation";
import { ApiResponse } from "@/types";
import { RegisterBody } from "@/types/auth";
import { registerSchema } from "@/utils/zod-schemas";

function Page() {
  const router = useRouter();
  const form = useForm<RegisterBody>({
    resolver: zodResolver(registerSchema),
  });
  const handleRegister = async (data: RegisterBody) => {
    try {
      await AuthApi.register(data);
      form.reset({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast("Register success!", {
        dismissible: true,
      });
      router.replace("/login");
    } catch (e) {
      const error = e as ApiResponse;
      console.error("🚀 ~ handleRegister ~ error:", error);
      toast(error.message, {});
    }
  };

  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <Form {...form}>
        <form
          className="w-full max-w-xl"
          onSubmit={form.handleSubmit(handleRegister)}
        >
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Welcome to Filixer!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl {...field}>
                      <Input placeholder="Your name..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl {...field}>
                      <Input placeholder="Your email..." />
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
                    <FormControl {...field}>
                      <Input type="password" placeholder="Password..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl {...field}>
                      <Input type="confirmPassword" placeholder="Password..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <p>
                  {"Have account yet? "}
                  <Link href="/login" className="font-bold">
                    Login
                  </Link>
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Register"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}

export default Page;

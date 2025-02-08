"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

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
import { LoginBody } from "@/types/auth";

function Page() {
  const form = useForm<LoginBody>();
  const handleLogin = async (data: LoginBody) => {
    await signIn("credentials", { ...data, redirect: true, callbackUrl: "/" });
  };

  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <Form {...form}>
        <form
          className="w-full max-w-xl"
          onSubmit={form.handleSubmit(handleLogin)}
        >
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Welcome back!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
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
            </CardContent>
            <CardFooter className="justify-end">
              <Button type="submit">Login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}

export default Page;

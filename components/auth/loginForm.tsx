"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { loginFormSchema, loginRequest } from "@/app/typings/authForms";
import Link from "next/link";
import { login } from "@/app/services/authServices";
import { toast } from "sonner";
const formSchema = loginFormSchema;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<loginRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: loginRequest) {
    setIsLoading(true);
    const result=await login(values);
    if (result.status==="success") {
        toast.success("Message", {
            description: "Logged In",
            action: {
              label: "Ok",
              onClick: () => null,
            },
          });
          router.push("/admin/myfarm")
    }else {
        alert(result.message)

        toast.error("Message", {
            description: result.message,
            action: {
              label: "Ok",
              onClick: () => null,
            },
          });
    }
    setIsLoading(false)

   console.log(values);
   
  }

  return (
    <Form {...form}>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white px-8 py-6 rounded-lg shadow-md w-full border-2 rounded-[20px] border-primary"
      >
     <h1 className="text-black md:text-2xl text-lg">You have an account ? <span className="text-primary font-bold"> Sign In</span></h1>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mail address</FormLabel>
              <FormControl>
                <Input placeholder="Mail address" {...field} />
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
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-primary text-white md:w-32 w-16" disabled={isLoading} type="submit" variant={"secondary"}>
          {isLoading ? "Loading..." : "LogIn"}
        </Button>{" "}

      </form>
    </Form>
  );
}
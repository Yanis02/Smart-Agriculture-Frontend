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
import { registerFormSchema, registerRequest } from "@/app/typings/authForms";
import { register } from "@/app/services/authServices";
import { toast } from "sonner";

const formSchema = registerFormSchema;

export default function RegisterForm(props:any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<registerRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      confirmPassword: "",
      address:"",
      farm_name:"",
    },
  });

  async function onSubmit(values: registerRequest) {
    setIsLoading(true);
    const { confirmPassword, ...restValues } = values;
         const result= await register(values) ;
     if (result.status==="success") {
        toast.success("Message", {
            description: "Logged In",
            action: {
              label: "Ok",
              onClick: () => null,
            },
          });
          props.setHasNotAcc(false)
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
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white px-8 py-6 rounded-lg shadow-md w-full border-2 rounded-[20px] border-primary"
      >
             <h1 className="text-black md:text-2xl text-lg">You do not have an account yet ? <span className="text-primary font-bold"> Sign Up</span></h1>

        <div className="lg:flex-col flex flex-col gap-4">

                  <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>FullName</FormLabel>
                <FormControl>
                  <Input placeholder="FullName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className=" w-full">
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
            name="address"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="farm_name"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Farm name</FormLabel>
                <FormControl>
                  <Input placeholder="Farm name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="bg-primary text-white md:w-32 w-16" disabled={isLoading} variant={"secondary"} type="submit">
        {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
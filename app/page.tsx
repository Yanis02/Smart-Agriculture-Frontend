"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import dashboard from "@/public/dashboard.svg"
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import RegisterForm from "@/components/auth/registerForm";
import LoginForm from "@/components/auth/loginForm";
export default function Home() {
  const [hasNotAcc,setHasNotAcc]=useState(false);
  return (
    <main className="flex md:flex-row flex-col min-h-screen  items-center justify-center text-primary">
       <div className="flex flex-col w-1/2 h-1/2 justify-center items-start gap-5 ">
       <h1 className="text-black font-bold md::text-3xl text-lg">Welcome to the <span className="text-primary font-bold"> Cows monitoring system panel</span></h1>

       <Image 
       className=" object-contain scale-110 w-2/3"
       src={dashboard}
       width={500}
       height={500}
       alt="dashboard"/>
       </div>
       
       <div className="w-[30%] flex p-5 flex-col justify-center items-center gap-5">
        <div className="flex gap-5 items-center justify-center">
        You do not have an account yet ?
        <Switch
        checked={hasNotAcc}
        onCheckedChange={()=>setHasNotAcc(!hasNotAcc)}/>
        </div>
        {
          !hasNotAcc ? <LoginForm/> : <RegisterForm/>

        }
            
       </div>
    </main>
  );
}

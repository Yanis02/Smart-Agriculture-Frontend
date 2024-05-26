import { User } from "@/app/typings/authForms";
import { cookies } from "next/headers";
import React from "react";
import Header from "./header";

const HeaderUserActions =  () => {

    if (cookies().get("user_data")?.value !==null) {
        const userString:string=cookies().get("user_data")?.value as string
        const user: User | null = JSON.parse(userString) as User | null

  return <Header user={user} />;
    }
  
};

export default HeaderUserActions;
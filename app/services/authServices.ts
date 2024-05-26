"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { errorAuthResponse, loginRequest, registerRequest, successLoginResponse, successRegisterResponse } from "../typings/authForms";
import BASE_URL from "@/config/endpoints";

async function login(
  formData: loginRequest
): Promise<errorAuthResponse | successLoginResponse> {
  try {
    const formdatajson = JSON.stringify(formData);
    const response = await fetch(
      `${BASE_URL}/api/login/`,
      {
        method: "POST",
        body: formdatajson,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!data?.token) {
      return  { message: "wrong credentials" } as errorAuthResponse;
    } else {
      cookies().set("user", data.token);
      cookies().set("user_data",JSON.stringify(data.user));
      cookies().set("role","farmer")
      return { status: "success" } as successLoginResponse
    }
  } catch (error: any) {
    return {
      status: "server error",
      message: error.message || "An unexpected server error occurred",
    } as errorAuthResponse;
  }
}

async function logout() {
  cookies().set("user", "");
  revalidateTag("user");
}

async function register(
  formData: registerRequest
): Promise<errorAuthResponse | successRegisterResponse> {
  const formdatajson = JSON.stringify(formData);

  try {
    const response = await fetch(
      `${BASE_URL}/api/signup/`,
      {
        method: "POST",
        body: formdatajson,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
     if (response.status===201) {
        return { status: "success" } as successRegisterResponse;

     }else return { message: "failed to sign up" }
  } catch (error: any) {
    return {
      status: "server error",
      message: error.message || "An unexpected server error occurred",
    } as errorAuthResponse;
  }
}



export { login, logout, register };
"use server"
import { cookies } from "next/headers";
import { errorAuthResponse, successLoginResponse } from "../typings/authForms";


async function getCowStats(
    cowId:string
  ): Promise<any[] | errorAuthResponse> {
    const token = `Bearer ${cookies().get("user")?.value}`
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/sensor-data/${cowId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : token
          },
        }
      );
      const data = await response.json();
  
      if (response.status===200) {
        return  data
      } else {
       
        return { status: "error in fetching data" } as errorAuthResponse
      }
    } catch (error: any) {
      return {
        status: "server error",
        message: error.message || "An unexpected server error occurred",
      } as errorAuthResponse;
    }
  }
  export default getCowStats
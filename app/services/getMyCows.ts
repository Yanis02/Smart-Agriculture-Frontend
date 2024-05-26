import { cookies } from "next/headers";
import { errorAuthResponse, successLoginResponse } from "../typings/authForms";
import { Cow } from "../typings/myfarm";


async function getCows(
  ): Promise<Cow[] | errorAuthResponse> {
    const token = `Bearer ${cookies().get("user")?.value}`
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/cows/`,
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
  export default getCows
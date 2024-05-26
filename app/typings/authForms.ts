import { ReactNode } from "react";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email().min(2, {
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(2, {
    message: "Please enter a valid password.",
  }),
});

const registerFormSchema = z
  .object({
    fullname: z.string().min(2, {
      message: "Please enter a valid fullname.",
    }),
    address: z.string().min(2, {
        message: "Please enter a valid address.",
      }),
    farm_name: z.string().min(2, {
        message: "Please enter a valid first name.",
      }),
   
    email: z.string().email().min(2, {
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .refine(
        (val) =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            val
          ),
        {
          message:
            "Password must be at least 8 characters long and contain at least one uppercase character, one lowercase character, and one special symbol",
        }
      ),
    confirmPassword: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type registerRequest = z.infer<typeof registerFormSchema>;

export type loginRequest = z.infer<typeof loginFormSchema>;

export type successLoginResponse = {
  status: string;
  message: string;
};

export type successRegisterResponse = {
  status: string;
  message:string
};

export type errorAuthResponse = {
  errors?: any;
  message: string;
  status?: string;
};

export type User={
    id:number;
    fullname:string;
    farm_name:string;
    email:string;
    address:string
}
export type SideNavItem = {
  title: string;
  path: string;
  icon?: ReactNode;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};
export { loginFormSchema, registerFormSchema };
"use server";

import { signIn } from "@/auth"; // Adjust the import path to your auth.ts if needed
import { signOut } from "@/auth";
import { AuthError } from "next-auth";

// Define the type for your form state to keep TypeScript happy
export type LoginState = "Invalid email or password." | "Something went wrong." | undefined;

// Add `prevState` as the first argument, shifting `formData` to the second
export async function loginAction(
  prevState: LoginState,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard", 
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password.";
        default:
          return "Something went wrong.";
      }
    }
    // Required to allow Next.js to complete the redirect on success
    throw error; 
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}
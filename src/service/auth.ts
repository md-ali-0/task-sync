/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import config from "@/config";
import { signInSchema } from "@/schema/signin.schema";
import { FormState, SignupSchema } from "@/schema/signup.schema";
import { cookies } from "next/headers";

interface FormValues {
    email: string;
    password: string;
}

export async function signin(formData: FormValues) {
    const validatedFields = signInSchema.safeParse({
        email: formData.email,
        password: formData.password,
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const res = await fetch(`${config.host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await res.json();

        if (!result?.success) {
            return {
                success: false,
                errors: result?.message || "Login failed",
            };
        }

        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        if (result?.success)
            (await cookies()).set("session", result?.data, {
                httpOnly: true,
                secure: true,
                path: "/",
                sameSite: "strict",
                expires: expiresAt,
            });

        // Return success response
        return {
            success: true,
            data: result.data,
        };
    } catch (error) {
        // Handle any network or unexpected errors
        return {
            success: false,
            errors: "Something went wrong. Please try again.",
        };
    }
}

export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Call the provider or db to create a user...
}

export async function signout() {
    (await cookies()).delete("session");
}

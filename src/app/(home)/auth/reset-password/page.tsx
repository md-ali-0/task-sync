"use client";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
        notFound();
    }

    return (
        <div className="container relative flex h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                href="/auth/login"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8"
                )}
            >
                Login
            </Link>

            {/* Left Side Panel - Visible on Large Screens */}
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    TaskSync
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Creating a strong password is the first
                            step to keeping your account secure. Make it
                            unique and memorable!&rdquo;
                        </p>
                        <footer className="text-sm">TaskSync Security Team</footer>
                    </blockquote>
                </div>
            </div>

            {/* Reset Password Form Section */}
            <div className="flex w-full flex-col justify-center space-y-6 sm:w-[400px] mx-auto p-6 sm:p-8 lg:p-12">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Reset your password
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your new password below to regain access
                        to your account.
                    </p>
                </div>
                <ResetPasswordForm token={token} />
            </div>

            {/* Mobile Testimonial Section */}
            <div className="mt-6 flex flex-col items-center text-center text-sm text-muted-foreground lg:hidden">
                <blockquote className="max-w-sm space-y-2 px-4">
                    <p className="text-base font-medium">
                        &ldquo;Creating a strong password is the first
                        step to keeping your account secure. Make it
                        unique and memorable!&rdquo;
                    </p>
                    <footer className="text-sm">TaskSync Security Team</footer>
                </blockquote>
            </div>
        </div>
    );
}

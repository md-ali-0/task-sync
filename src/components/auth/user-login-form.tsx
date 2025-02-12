/* eslint-disable @typescript-eslint/no-empty-object-type */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSession } from "@/provider/session-provider";
import { signInSchema } from "@/schema/signin.schema";
import { signin } from "@/service/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardCopy, Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Icons } from "../shared/icons";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormValues = z.infer<typeof signInSchema>;

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isLoading, setIsLoading } = useSession();
    const [showPassword, setShowPassword] = React.useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { setValue } = form;

    const handleQuickSetCredentials = (email: string, password: string) => {
        setValue("email", email);
        setValue("password", password);
        toast.success(`Credentials set for ${email}`);
    };

    async function onSubmit(data: FormValues) {
        setIsLoading(true);
        const response = await signin(data);

        if (response.success) {
            localStorage.setItem("token", response?.data?.accessToken);
            const destination = searchParams.get("redirect") || "/";
            router.replace(decodeURIComponent(destination));
            toast.success("User Logged In Successfully");
        } else {
            console.log(response);
            
            toast.error(response?.errors);
        }
        setIsLoading(false);
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In
                        </Button>
                    </div>
                </form>
            </Form>
            {/* Quick login credentials */}
            <div className="mt-2 space-y-4">
                <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                    <span className="text-purple-800">
                        User: user@gmail.com / 123456
                    </span>
                    <Button
                        onClick={() =>
                            handleQuickSetCredentials(
                                "user@gmail.com",
                                "123456"
                            )
                        }
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        variant="default"
                        size={"icon"}
                    >
                        <ClipboardCopy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import { profilePasswordSchema } from "@/schema/profile.password.schema";
import { ErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";

type FormData = z.infer<typeof profilePasswordSchema>;

export default function Security() {
    const form = useForm<FormData>({
        resolver: zodResolver(profilePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const [updatePassword, { isSuccess, isError, error }] =
        useUpdateProfileMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Password Successfully Updated");
        }
    }, [isError, isSuccess, error]);

    const onSubmit = async (data: z.infer<typeof profilePasswordSchema>) => {
        const loadingToast = toast.loading("Password is Updating...");
        const formData = new FormData();

        if (data.newPassword !== data.confirmPassword) {
            toast.error("Confirm Password Not Matched")
        }

        const userData = {
            password: data.newPassword,
        };

        formData.append("data", JSON.stringify(userData));

        await updatePassword(formData);
        form.reset();
        toast.dismiss(loadingToast);
    };

    return (
        <Form {...form}>
            <div className="bg-white dark:bg-background border backdrop-blur-lg p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Security</h2>
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        className="bg-background"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        className="bg-background"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        className="bg-background"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Save Changes</Button>
                </form>
            </div>
        </Form>
    );
}

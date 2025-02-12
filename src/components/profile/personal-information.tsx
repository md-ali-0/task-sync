/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
    useGetMeQuery,
    useUpdateProfileMutation,
} from "@/redux/features/auth/authApi";
import { profilePersonalSchema } from "@/schema/profile.personal.schema";
import { ErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

type FormData = z.infer<typeof profilePersonalSchema> & {
    avatar: File | any;
};

export default function PersonalInformation() {
    const { data, isLoading } = useGetMeQuery(undefined);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(profilePersonalSchema),
        defaultValues: data
            ? {
                  avatar: undefined,
                  name: data.name || "",
                  email: data.email || "",
                  phone: data.phone || "",
              }
            : {
                  avatar: undefined,
                  name: "",
                  company: "",
                  email: "",
                  phone: "",
              },
    });

    const [updateProfile, { isSuccess, isError, error }] =
        useUpdateProfileMutation();

    useEffect(() => {
        if (data) {
            form.reset({
                avatar: undefined,
                name: data.name || "",
                email: data.email || "",
                phone: data.phone || "",
            });
        }
    }, [data, form]);

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Profile Successfully Updated");
        }
    }, [isError, isSuccess, error]);

    const onSubmit = async (data: FormData) => {
        const loadingToast = toast.loading("Profile is Updating...");
        const formData = new FormData();

        const userData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
        };

        if (data.avatar && data.avatar instanceof File) {
            formData.append("avatar", data.avatar);
        }
        formData.append("data", JSON.stringify(userData));

        await updateProfile(formData);
        toast.dismiss(loadingToast);
    };
    console.log(data);
    
    if (isLoading) {
        return (
            <div className="bg-white dark:bg-background border backdrop-blur-lg p-6 rounded-xl space-y-4">
                <Skeleton className="h-5 max-w-36 bg-gray-300 font-semibold mb-4"></Skeleton>
                <div className="flex items-center space-x-4">
                    <Skeleton className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></Skeleton>
                    <div className="flex-1 space-y-2">
                        <Skeleton className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse"></Skeleton>
                        <Skeleton className="w-1/3 h-4 bg-gray-300 rounded-md animate-pulse"></Skeleton>
                    </div>
                </div>
                <Skeleton className="h-4 bg-gray-300 rounded-md animate-pulse"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded-md animate-pulse"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded-md animate-pulse"></Skeleton>
                <Skeleton className="h-4 bg-gray-300 rounded-md animate-pulse"></Skeleton>
                <Skeleton className="h-10 bg-gray-300 rounded-md animate-pulse"></Skeleton>
            </div>
        );
    }

    return (
        <Form {...form}>
            <div className="bg-white dark:bg-background border backdrop-blur-lg p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">
                    Personal Information
                </h2>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="avatar"
                        render={({ field: { onChange } }) => (
                            <FormItem>
                                <FormLabel>Profile Picture</FormLabel>
                                <FormControl>
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="w-24 h-24">
                                            <AvatarImage
                                                src={
                                                    previewUrl ||
                                                    (data?.avatar
                                                        ? `${data.avatar}`
                                                        : "/default-avatar.png")
                                                }
                                            />
                                            <AvatarFallback>
                                                {data?.name?.charAt(0) || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col space-y-2">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    if (file) {
                                                        onChange(file);
                                                        const reader =
                                                            new FileReader();
                                                        reader.onloadend =
                                                            () => {
                                                                setPreviewUrl(
                                                                    reader.result as string
                                                                );
                                                            };
                                                        reader.readAsDataURL(
                                                            file
                                                        );
                                                    }
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    onChange(undefined);
                                                    setPreviewUrl(null);
                                                }}
                                            >
                                                Remove Picture
                                            </Button>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="bg-background"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        className="bg-background"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="tel"
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

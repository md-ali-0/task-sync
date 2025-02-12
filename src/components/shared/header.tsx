"use client";

import { cn } from "@/lib/utils";
import { useSession } from "@/provider/session-provider";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { signout } from "@/service/auth";
import { Bell, Menu, Moon, PanelRight, Search, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export default function Header({
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
}: {
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
}) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { setIsLoading } = useSession();
    const router = useRouter();
    const { data: user } = useGetMeQuery(undefined);

    useEffect(() => {
        const isDark = localStorage.getItem("darkMode") === "true";
        setIsDarkMode(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        localStorage.setItem("darkMode", newDarkMode.toString());
        document.documentElement.classList.toggle("dark", newDarkMode);
    };

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            localStorage.removeItem("token");
            await signout();
            setIsLoading(false);
            toast.success("Logout Successfully");
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    const toggleSidebar = () => {
        const newCollapsedState = !sidebarCollapsed;
        setSidebarCollapsed(newCollapsedState);
        localStorage.setItem("sidebarCollapsed", newCollapsedState.toString());
    };
    return (
        <header className="bg-background border-b z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleSidebar}
                                className="hidden lg:flex mr-2.5"
                            >
                                <PanelRight
                                    className={cn(
                                        "size-6 transition-transform",
                                        sidebarCollapsed ? "rotate-180" : ""
                                    )}
                                />
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden mr-2"
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                        <div className="relative hidden sm:block ">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="pl-8 w-full md:w-[300px] rounded-full bg-gray-100 dark:bg-gray-700 focus-visible:ring-1"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleDarkMode}
                        >
                            {isDarkMode ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Separator orientation="vertical" className="h-8" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={user?.avatar || "#"}
                                            alt={user?.name}
                                        />
                                        <AvatarFallback>
                                            {user?.name.split("")[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {user?.name}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={"/profile"}>Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}

import { cn } from "@/lib/utils";
import { useSession } from "@/provider/session-provider";
import { signout } from "@/service/auth";
import { LayoutDashboard, ListTodo, LogOut, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: ListTodo, label: "Tasks", href: "/tasks" },
    { icon: User, label: "Profile", href: "/profile" },
];

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
}: {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
}) {
    const pathname = usePathname();
    const { setIsLoading } = useSession();
    const router = useRouter();

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

    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-50 bg-background border-r transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full",
                sidebarCollapsed ? "lg:w-[4.5rem]" : "w-64"
            )}
        >
            <div className="h-full flex flex-col">
                <div
                    className={cn(
                        "flex items-center h-16 px-4 border-b",
                        sidebarCollapsed
                            ? "lg:justify-center"
                            : "justify-between"
                    )}
                >
                    {!sidebarCollapsed ? (
                        <span className="text-2xl font-semibold">TaskSync</span>
                    ) : (<span className="text-2xl font-semibold">T</span>)}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {sidebarItems.map((item) => (
                            <li key={item.href}>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                                                    pathname === item.href &&
                                                        "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white",
                                                    sidebarCollapsed &&
                                                        "justify-center"
                                                )}
                                            >
                                                <item.icon
                                                    className={cn(
                                                        "h-5 w-5",
                                                        sidebarCollapsed
                                                            ? ""
                                                            : "mr-3"
                                                    )}
                                                />
                                                {!sidebarCollapsed &&
                                                    item.label}
                                            </Link>
                                        </TooltipTrigger>
                                        {sidebarCollapsed && (
                                            <TooltipContent side="right">
                                                {item.label}
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                </TooltipProvider>
                            </li>
                        ))}
                    </ul>
                </nav>
                {!sidebarCollapsed ? (
                    <div className="p-4 border-t">
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </Button>
                    </div>
                ) : (
                    <div
                        className={cn(
                            "flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                            sidebarCollapsed && "justify-center"
                        )}
                    >
                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            size={"icon"}
                        >
                            <LogOut className="size-5" />
                        </Button>
                    </div>
                )}
            </div>
        </aside>
    );
}

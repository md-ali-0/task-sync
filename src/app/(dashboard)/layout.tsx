"use client";

import Header from "@/components/shared/header";
import Sidebar from "@/components/shared/sidebar";
import { useState } from "react";

export default function DashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar */}
            <Sidebar
                setSidebarOpen={setSidebarOpen}
                sidebarOpen={sidebarOpen}
                sidebarCollapsed={sidebarCollapsed}
            />
            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    setSidebarOpen={setSidebarOpen}
                    sidebarCollapsed={sidebarCollapsed}
                    setSidebarCollapsed={setSidebarCollapsed}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

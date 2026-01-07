"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Layers,
    Zap,
    Clock,
    Settings,
    LogOut,
    Hexagon,
    TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Portfolio", href: "/portfolio", icon: Layers },
    { label: "Watchlist", href: "/watchlist", icon: TrendingUp },
    { label: "Updates", href: "/updates", icon: Zap },
    { label: "History", href: "/history", icon: Clock },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[#ffffff10] bg-[#09090b]">
            <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex h-16 items-center border-b border-[#ffffff10] px-6">
                    <Hexagon className="mr-2 h-6 w-6 text-indigo-500" />
                    <span className="text-lg font-bold tracking-tight">InnoDeck</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-[#ffffff10] text-white"
                                        : "text-gray-400 hover:bg-[#ffffff05] hover:text-white"
                                )}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer / Settings */}
                <div className="border-t border-[#ffffff10] p-4">
                    <Link
                        href="/settings"
                        className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:bg-[#ffffff05] hover:text-white"
                    >
                        <Settings className="mr-3 h-5 w-5" />
                        Settings
                    </Link>
                    <button
                        className="mt-1 flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-400 hover:bg-[#ffffff05] hover:text-red-300"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}

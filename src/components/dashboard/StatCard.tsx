import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    className?: string;
}

export function StatCard({ label, value, icon: Icon, trend, className }: StatCardProps) {
    return (
        <div className={cn("glass-panel p-6 rounded-xl flex items-center justify-between", className)}>
            <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold text-white">{value}</span>
                    {trend && <span className="ml-2 text-xs text-green-400">{trend}</span>}
                </div>
            </div>
            <div className="p-3 bg-[#ffffff05] rounded-full">
                <Icon className="h-6 w-6 text-indigo-400" />
            </div>
        </div>
    );
}

import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, Activity, Zap, CheckCircle2, Eye, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    label: string;
    value: number | string;
    trend?: string;
    trendDir?: 'up' | 'down';
    icon: import("lucide-react").LucideIcon;
    color?: string;
    href?: string;
}

function MetricCard({ label, value, trend, trendDir, icon: Icon, color = "text-indigo-400", href }: MetricCardProps) {
    const Content = (
        <div className={cn(
            "flex flex-col p-4 rounded-2xl bg-[#1c1c21] border border-[#ffffff05] transition-all",
            href && "hover:border-indigo-500/30 hover:bg-[#ffffff03] group cursor-pointer"
        )}>
            <div className="flex justify-between items-start mb-2">
                <div className={cn("p-2 rounded-lg bg-[#ffffff05]", color)}>
                    <Icon className="w-4 h-4" />
                </div>
                {trend && (
                    <div className={cn("flex items-center text-[10px] font-medium", trendDir === 'up' ? "text-emerald-400" : "text-rose-400")}>
                        {trendDir === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                        {trend}
                    </div>
                )}
            </div>
            <div className="mt-auto">
                <div className={cn("text-2xl font-bold text-white tracking-tight", href && "group-hover:text-indigo-100")}>{value}</div>
                <div className="text-xs text-muted-foreground font-medium mt-0.5">{label}</div>
            </div>
        </div>
    );

    if (href) {
        return <Link href={href}>{Content}</Link>;
    }

    return Content;
}

export function HeroMetrics({
    total, activePocs, working, investReady
}: { total: number, activePocs: number, working: number, investReady: number }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
                label="Total Portfolio"
                value={total}
                icon={LayoutGrid}
                trend="+3 this mo"
                trendDir="up"
                href="/portfolio"
            />
            <MetricCard
                label="Active POCs"
                value={activePocs}
                icon={Zap}
                color="text-amber-400"
                trend="High Activity"
                trendDir="up"
                href="/portfolio?status=POC"
            />
            <MetricCard
                label="Active Solutions"
                value={working}
                icon={CheckCircle2}
                color="text-emerald-400"
                href="/portfolio?status=Working"
            />
            <MetricCard
                label="High Potentials"
                value={investReady}
                icon={Eye}
                color="text-blue-400"
                trend="1 New"
                trendDir="up"
                href="/portfolio?investment=Watch%20Closely"
            />
        </div>
    );
}

import { InvestmentStatus } from "@/types";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

const CONFIG: Record<Exclude<InvestmentStatus, null>, { color: string; icon: import("lucide-react").LucideIcon }> = {
    'Invest Ready': { color: 'text-green-500 bg-green-500/10 border-green-500/20', icon: CheckCircle2 },
    'Watch Closely': { color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20', icon: AlertTriangle },
    'Not Priority': { color: 'text-gray-500 bg-gray-500/10 border-gray-500/20', icon: XCircle },
};

interface InvestmentIndicatorProps {
    status: InvestmentStatus;
    size?: 'sm' | 'md' | 'lg';
}

export function InvestmentIndicator({ status, size = 'md' }: InvestmentIndicatorProps) {
    if (!status) return null;

    const cfg = CONFIG[status];
    const Icon = cfg.icon;

    return (
        <div className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-medium transition-colors",
            cfg.color,
            size === 'sm' && "text-xs px-2 py-0.5"
        )}>
            <Icon className={cn(
                size === 'sm' ? "w-3 h-3" : "w-4 h-4"
            )} />
            <span>{status}</span>
        </div>
    );
}

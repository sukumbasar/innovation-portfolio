import { VendorStatus } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<VendorStatus, string> = {
    Discovered: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    Met: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    POC: "bg-amber-500/20 text-amber-400 border-amber-500/30 animate-pulse",
    Working: "bg-green-500/20 text-green-400 border-green-500/30",
    Parked: "bg-orange-900/20 text-orange-400 border-orange-900/30",
    Killed: "bg-red-900/20 text-red-400 border-red-900/30",
};

interface StatusBadgeProps {
    status: VendorStatus;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    return (
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", STATUS_STYLES[status], className)}>
            {status}
        </span>
    );
}

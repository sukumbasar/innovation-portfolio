import { Vendor } from "@/types";
import { CircularScore } from "@/components/ui/CircularScore";
import { InvestmentTrafficLight } from "@/components/investment/InvestmentTrafficLight";
import { TagChip } from "@/components/ui/TagChip";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface FocusCardProps {
    vendor: Vendor;
    reason: string; // Why is this in focus? e.g. "POC Decision Needed"
}

export function FocusCard({ vendor, reason }: FocusCardProps) {
    return (
        <Link
            href={`/portfolio/${vendor.id}`}
            className="group relative flex flex-col p-5 rounded-2xl bg-[#18181b] border border-[#ffffff08] hover:border-indigo-500/30 transition-all hover:bg-[#ffffff03] overflow-hidden"
        >
            {/* Top Label */}
            <div className="mb-4 flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
                    {reason}
                </span>
                <InvestmentTrafficLight status={vendor.investment?.status || null} reason={vendor.investment?.justification} />
            </div>

            <div className="flex items-center gap-4">
                {/* Logo Placeholder */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-[#ffffff05] flex items-center justify-center text-lg font-bold text-white group-hover:scale-105 transition-transform">
                    {vendor.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white truncate group-hover:text-indigo-100">{vendor.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <TagChip label={vendor.category} size="xs" />
                        <span className="text-xs text-muted-foreground">{vendor.status}</span>
                    </div>
                </div>

                {/* Score */}
                <div className="shrink-0">
                    <CircularScore score={vendor.ratings.overall} size="md" />
                </div>
            </div>

            {/* Hover Action */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 text-indigo-400">
                <ArrowRight className="w-4 h-4" />
            </div>
        </Link>
    );
}

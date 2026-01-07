import Link from "next/link";
import { Vendor } from "@/types";
import { CircularScore } from "@/components/ui/CircularScore";
import { TagChip } from "@/components/ui/TagChip";
import { InvestmentTrafficLight } from "@/components/investment/InvestmentTrafficLight";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface VendorCardProps {
    vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
    return (
        <Link href={`/portfolio/${vendor.id}`} className="block h-full">
            <div className="group relative glass-panel rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] hover:translate-y-[-2px] flex flex-col h-[340px] bg-[#18181b]">

                {/* Header Section */}
                <div className="p-5 flex justify-between items-start relative pb-2 shrink-0">
                    <div className="flex gap-4 min-w-0">
                        {/* Logo */}
                        <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white shadow-lg border border-white/10 group-hover:scale-105 transition-transform">
                            {vendor.name.charAt(0)}
                        </div>

                        <div className="flex flex-col min-w-0 pt-0.5">
                            <h3 className="text-lg font-bold text-white truncate leading-tight group-hover:text-indigo-200">{vendor.name}</h3>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                <TagChip label={vendor.category} />
                            </div>
                        </div>
                    </div>

                    {/* Top Right: Status Badge */}
                    <div className="shrink-0 flex items-start gap-2">
                        <StatusBadge status={vendor.status} className="scale-90" />
                    </div>
                </div>

                {/* Body Content */}
                <div className="px-5 pb-4 flex-1 flex flex-col min-h-0">
                    <div className="text-sm text-muted-foreground leading-relaxed flex-1 pt-2 border-t border-[#ffffff05] overflow-y-auto custom-scrollbar pr-2">
                        {vendor.description}
                    </div>

                    {/* OKR / Goal Indicator if exists */}
                    {vendor.okrImpact && (
                        <div className="mt-4 flex items-start gap-2 text-xs text-indigo-300 bg-indigo-500/10 px-3 py-2 rounded-lg border border-indigo-500/20">
                            <span className="shrink-0 opacity-70">🎯</span>
                            <span className="line-clamp-1">{vendor.okrImpact}</span>
                        </div>
                    )}
                </div>

                {/* Footer: Metrics & Investment */}
                <div className="px-5 py-4 border-t border-[#ffffff08] bg-[#ffffff02] flex items-center justify-between mt-auto shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <CircularScore score={vendor.ratings.overall} size="sm" />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Score</span>
                                <span className={cn(
                                    "text-sm font-bold",
                                    vendor.ratings.overall >= 80 ? "text-emerald-400" :
                                        vendor.ratings.overall >= 60 ? "text-amber-400" : "text-rose-400"
                                )}>
                                    {vendor.ratings.overall >= 80 ? 'Excellent' :
                                        vendor.ratings.overall >= 60 ? 'Good' : 'Review'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {vendor.investment?.status === 'Watch Closely' && (
                            <InvestmentTrafficLight status={vendor.investment.status} className="scale-90" />
                        )}

                        {/* Hover Action Icon */}
                        <div className="w-8 h-8 rounded-full bg-[#ffffff05] flex items-center justify-center text-gray-400 group-hover:bg-indigo-500 group-hover:text-white transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    );
}

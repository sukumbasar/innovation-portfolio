"use client";

import { InvestmentStatus } from "@/types";
import { cn } from "@/lib/utils";
import { Info, Eye } from "lucide-react";
import { useState } from "react";

interface InvestmentTrafficLightProps {
    status: InvestmentStatus;
    reason?: string; // Optional reasoning for tooltip
    className?: string;
}

export function InvestmentTrafficLight({ status, reason, className }: InvestmentTrafficLightProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    // If status is null/undefined or not 'Watch Closely', don't render anything (or render empty placeholder if needed)
    if (status !== 'Watch Closely') return null;

    return (
        <div className={cn("relative inline-flex", className)}>
            <button
                className={cn(
                    "group flex items-center gap-2 px-2.5 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 transition-all hover:border-indigo-500/30 text-indigo-400"
                )}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <Eye className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold tracking-tight">Watch Closely</span>
            </button>

            {showTooltip && reason && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-3 bg-[#18181b] border border-[#ffffff10] rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center gap-1">
                        <Info className="w-3 h-3" /> Why?
                    </div>
                    <p className="text-xs text-gray-300 leading-snug">
                        {reason}
                    </p>
                </div>
            )}
        </div>
    );
}

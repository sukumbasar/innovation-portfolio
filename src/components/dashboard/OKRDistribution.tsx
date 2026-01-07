"use client";

import { Objective, Vendor } from "@/types";
import { Target, ChevronRight, Settings2, FolderOpen } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ManageOKRsModal } from "./ManageOKRsModal";
import { cn } from "@/lib/utils";

interface OKRDistributionProps {
    vendors: Vendor[];
    okrs: Objective[];
}

export function OKRDistribution({ vendors, okrs: initialOkrs }: OKRDistributionProps) {
    const [okrs, setOkrs] = useState(initialOkrs); // In real app, this would be global state
    const [isManageOpen, setIsManageOpen] = useState(false);

    // Calculate stats per Key Result
    const stats = useMemo(() => {
        const counts: Record<string, number> = {}; // krId -> count
        vendors.forEach(v => {
            v.keyResultIds?.forEach(krId => {
                counts[krId] = (counts[krId] || 0) + 1;
            });
        });
        return counts;
    }, [vendors]);

    return (
        <div className="glass-panel p-6 rounded-2xl border border-[#ffffff10] min-h-[400px] max-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-bold text-white">Strategic Alignment</h2>
                </div>
                <button
                    onClick={() => setIsManageOpen(true)}
                    className="p-2 rounded-lg hover:bg-[#ffffff05] text-gray-400 hover:text-white transition-colors"
                >
                    <Settings2 className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
                {okrs.map((obj) => (
                    <div key={obj.id} className="space-y-3">
                        <div className="flex items-center gap-2 text-indigo-200/80 font-semibold text-sm uppercase tracking-wider px-1">
                            <FolderOpen className="w-4 h-4 opacity-70" />
                            {obj.title}
                        </div>

                        <div className="grid gap-2">
                            {obj.keyResults.map(kr => {
                                const count = stats[kr.id] || 0;
                                return (
                                    <Link
                                        key={kr.id}
                                        href={`/portfolio?search=${encodeURIComponent(kr.description)}`} // This needs better filter logic, maybe by ID?
                                        className={cn(
                                            "group flex items-center justify-between p-3 rounded-xl bg-[#ffffff03] border border-[#ffffff05] hover:bg-[#ffffff08] hover:border-indigo-500/30 transition-all cursor-pointer",
                                            count > 0 ? "opacity-100" : "opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <div className="flex flex-col min-w-0 pr-4">
                                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                                                {kr.description}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground mt-0.5">
                                                Target: {kr.targetValue ? `${kr.targetValue}${kr.unit}` : 'N/A'}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 shrink-0">
                                            {count > 0 && (
                                                <div className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                                                    {count}
                                                </div>
                                            )}
                                            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors" />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <ManageOKRsModal
                isOpen={isManageOpen}
                onClose={() => setIsManageOpen(false)}
                okrs={okrs}
                onSave={setOkrs}
            />
        </div>
    );
}

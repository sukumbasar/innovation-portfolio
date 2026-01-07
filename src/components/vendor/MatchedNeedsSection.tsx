import { Vendor, InternalNeed } from "@/types";
import { Users, AlertCircle, CheckCircle2 } from "lucide-react";

interface MatchedNeedsSectionProps {
    vendor: Vendor;
    internalNeeds: InternalNeed[];
}

export function MatchedNeedsSection({ vendor, internalNeeds }: MatchedNeedsSectionProps) {
    if (!vendor.matchedNeedIds || vendor.matchedNeedIds.length === 0) return null;

    // Filter needs for this vendor
    const needs = internalNeeds.filter(n => vendor.matchedNeedIds?.includes(n.id));

    if (!needs.length) return null;

    return (
        <section className="glass-panel p-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5">
            <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">Internal Needs Alignment</h3>
            </div>

            <div className="space-y-3">
                {needs.map(need => (
                    <div key={need.id} className="p-4 rounded-xl bg-[#ffffff05] border border-indigo-500/20">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-indigo-200 bg-indigo-500/20 px-2 py-0.5 rounded uppercase">
                                {need.department}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <span>{need.requester}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-600" />
                                <span>{need.dateSubmitted}</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-200 leading-relaxed mb-3">
                            &quot;{need.problemDescription}&quot;
                        </p>

                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5 text-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span className="font-medium">Direct Match</span>
                            </div>
                            {need.priority === 'High' && (
                                <div className="flex items-center gap-1.5 text-amber-400">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    <span className="font-medium">High Priority</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

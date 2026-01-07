import { Vendor, InternalNeed } from "@/types";
import { TagChip } from "@/components/ui/TagChip";
import { LastUpdatesSection } from "./LastUpdatesSection";
import { MatchedNeedsSection } from "./MatchedNeedsSection";

interface OverviewTabProps {
    vendor: Vendor;
    internalNeeds: InternalNeed[];
}

export function OverviewTab({ vendor, internalNeeds }: OverviewTabProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col: Main Info */}
            <div className="lg:col-span-2 space-y-8">
                <section className="glass-panel p-6 rounded-2xl border border-[#ffffff10] bg-[#18181b]">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">The Solution</h3>
                    <p className="text-lg text-white leading-relaxed">
                        {vendor.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {vendor.tags.map(tag => (
                            <TagChip key={tag} label={tag} variant="outline" size="sm" />
                        ))}
                    </div>
                </section>

                <section className="glass-panel p-6 rounded-2xl border border-[#ffffff10] bg-[#18181b]">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Key Differentiators</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {vendor.keyDifferentiators.map((diff, i) => (
                            <li key={i} className="flex gap-3 p-4 rounded-xl bg-[#ffffff03] border border-[#ffffff05]">
                                <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                <span className="text-gray-300 font-medium">{diff}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* Right Col: Strategic Fit & Sidebar */}
            <div className="space-y-8">
                <section className="glass-panel p-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden">
                    {/* Decor */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full" />

                    <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-2">Primary Objective</h3>
                    <p className="text-2xl font-bold text-white mt-1 leading-tight">{vendor.okrImpact}</p>
                    <div className="mt-4 pt-4 border-t border-indigo-500/20 flex gap-2">
                        <span className="text-xs text-indigo-400 font-mono">STRATEGIC ALIGNMENT: HIGH</span>
                    </div>
                </section>

                <MatchedNeedsSection vendor={vendor} internalNeeds={internalNeeds} />

                <LastUpdatesSection vendor={vendor} />
            </div>
        </div>
    );
}

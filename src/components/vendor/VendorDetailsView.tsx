"use client";

import { useState } from "react";
import { Vendor, InternalNeed } from "@/types";
import { cn } from "@/lib/utils";
import { OverviewTab } from "./OverviewTab";
import { RatingsTab } from "./RatingsTab";
import { TimelineTab } from "./TimelineTab";
import { InvestmentSection } from "@/components/investment/InvestmentSection"; // Re-using section logic as tab content
import { ArtifactsTab } from "./ArtifactsTab";

interface VendorDetailsViewProps {
    vendor: Vendor;
    internalNeeds: InternalNeed[];
}

const TABS = ["Overview", "Ratings", "Timeline", "Investment", "Artifacts"] as const;
type Tab = typeof TABS[number];

export function VendorDetailsView({ vendor, internalNeeds }: VendorDetailsViewProps) {
    const [activeTab, setActiveTab] = useState<Tab>("Overview");

    return (
        <div className="space-y-8">
            {/* Segmented Control Nav */}
            <div className="flex justify-center">
                <div className="inline-flex p-1 bg-[#18181b] border border-[#ffffff10] rounded-xl">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                                activeTab === tab
                                    ? "bg-[#ffffff10] text-white shadow-sm"
                                    : "text-gray-400 hover:text-white hover:bg-[#ffffff05]"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === "Overview" && <OverviewTab vendor={vendor} internalNeeds={internalNeeds} />}
                {activeTab === "Ratings" && <RatingsTab vendor={vendor} />}
                {activeTab === "Timeline" && <TimelineTab vendor={vendor} />}
                {activeTab === "Investment" && (
                    <div className="glass-panel p-8 rounded-2xl border border-[#ffffff10] bg-[#18181b]">
                        <InvestmentSection vendor={vendor} />
                    </div>
                )}
                {activeTab === "Artifacts" && <ArtifactsTab vendor={vendor} />}
            </div>
        </div>
    );
}

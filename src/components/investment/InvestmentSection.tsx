import { Vendor } from "@/types";
import { InvestmentIndicator } from "./InvestmentIndicator";
import { SignalFeed } from "./SignalFeed";
import { BrainCircuit } from "lucide-react";

export function InvestmentSection({ vendor }: { vendor: Vendor }) {
    if (!vendor.investment) return null;

    return (
        <div className="mt-12 pt-8 border-t border-[#ffffff10]">
            <div className="flex items-center gap-2 mb-6 text-amber-500">
                <BrainCircuit className="w-5 h-5" />
                <h3 className="text-xl font-bold text-white">Investment Intelligence</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Status & Justification */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-panel p-6 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-400 mb-4">Investment Readiness</h4>
                        <div className="mb-4">
                            <InvestmentIndicator status={vendor.investment.status} size="lg" />
                        </div>
                        <p className="text-sm text-gray-200 leading-relaxed italic border-l-2 border-amber-500/50 pl-4">
                            &quot;{vendor.investment.justification}&quot;
                        </p>
                        <div className="mt-4 pt-4 border-t border-[#ffffff10] text-xs text-gray-500">
                            Last reviewed: {vendor.investment.lastReviewed}
                        </div>
                    </div>

                    <button className="w-full py-3 rounded-xl bg-[#ffffff05] border border-[#ffffff10] text-sm font-medium text-gray-300 hover:text-white hover:bg-[#ffffff08] transition-colors">
                        Request Investment Review
                    </button>
                </div>

                {/* Signals Feed */}
                <div className="lg:col-span-2">
                    <h4 className="text-sm font-semibold text-gray-400 mb-4">Internal & External Signals</h4>
                    <SignalFeed signals={vendor.investment.signals} />
                </div>
            </div>
        </div>
    );
}

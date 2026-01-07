import { Vendor } from "@/types";
import { Link } from "lucide-react";
import { InvestmentIndicator } from "../investment/InvestmentIndicator";

export function WatchlistWidget({ vendors }: { vendors: Vendor[] }) {
    const watchClosely = vendors.filter(v => v.investment?.status === 'Watch Closely');

    return (
        <div className="glass-panel p-6 rounded-xl h-full flex flex-col border border-[#ffffff10]">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Investment Watch</h3>
                {/* <a href="/watchlist" className="text-xs text-indigo-400 hover:text-indigo-300">View All</a> */}
            </div>

            <div className="space-y-4 flex-1">
                {watchClosely.slice(0, 3).map(v => (
                    <div key={v.id} className="flex items-center justify-between p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg group hover:bg-indigo-500/15 transition-colors">
                        <span className="font-medium text-white group-hover:text-indigo-200 transaction-colors">{v.name}</span>
                        <InvestmentIndicator status="Watch Closely" size="sm" />
                    </div>
                ))}

                {watchClosely.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-8 bg-[#ffffff02] rounded-xl border border-dashed border-[#ffffff05]">
                        No high potential vendors currently being tracked.
                    </div>
                )}
            </div>
        </div>
    );
}

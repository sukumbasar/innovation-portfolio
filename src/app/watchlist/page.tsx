import { getVendors } from "@/lib/data";
import { InvestmentStatus, Vendor } from "@/types";
import { VendorCard } from "@/components/portfolio/VendorCard";
import { InvestmentIndicator } from "@/components/investment/InvestmentIndicator";

function WatchlistColumn({ title, status, vendors }: { title: string; status: InvestmentStatus; vendors: Vendor[] }) {
    const filtered = vendors.filter(v => v.investment?.status === status);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#ffffff10]">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <span className="text-xs font-mono text-gray-500">{filtered.length}</span>
            </div>

            <div className="space-y-4">
                {filtered.map(vendor => (
                    <div key={vendor.id} className="relative">
                        {/* Overlay Indicator on Card */}
                        <div className="absolute top-4 right-4 z-10">
                            <InvestmentIndicator status={status} size="sm" />
                        </div>
                        <VendorCard vendor={vendor} />

                        {/* Justification Snippet */}
                        <div className="mt-2 ml-4 pl-4 border-l border-[#ffffff10] text-xs text-gray-400 italic">
                            {vendor.investment?.justification}
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="py-12 border-2 border-dashed border-[#ffffff05] rounded-xl flex items-center justify-center text-sm text-gray-600">
                        No vendors in this stage.
                    </div>
                )}
            </div>
        </div>
    );
}

export default async function WatchlistPage() {
    const allVendors = await getVendors();
    const investmentVendors = allVendors.filter(v => !!v.investment);

    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Investment Watchlist</h1>
                <p className="text-muted-foreground">Strategic and financial investment candidates.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <WatchlistColumn
                    title="Invest Ready"
                    status="Invest Ready"
                    vendors={investmentVendors}
                />
                <WatchlistColumn
                    title="Watch Closely"
                    status="Watch Closely"
                    vendors={investmentVendors}
                />
                <WatchlistColumn
                    title="Not Priority"
                    status="Not Priority"
                    vendors={investmentVendors}
                />
            </div>
        </div>
    );
}

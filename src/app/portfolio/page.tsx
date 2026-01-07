import { getVendors, getOKRs } from "@/lib/data";
import React from "react";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

export default async function PortfolioPage() {
    const vendors = await getVendors();
    const okrs = await getOKRs();

    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Innovation Portfolio</h1>
                <p className="text-muted-foreground">Browse and compare technology vendors.</p>
            </div>

            <React.Suspense fallback={<div>Loading portfolio...</div>}>
                <PortfolioGrid initialVendors={vendors} okrs={okrs} />
            </React.Suspense>
        </div>
    );
}

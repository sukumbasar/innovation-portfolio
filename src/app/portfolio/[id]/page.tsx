import { getVendor, getVendors, getInternalNeeds } from "@/lib/data";
import { VendorDetailsView } from "@/components/vendor/VendorDetailsView";
import { SimilarVendors } from "@/components/vendor/SimilarVendors";
import { InvestmentSection } from "@/components/investment/InvestmentSection";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TagChip } from "@/components/ui/TagChip";
import { CircularScore } from "@/components/ui/CircularScore";
import { InvestmentTrafficLight } from "@/components/investment/InvestmentTrafficLight";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VendorHeaderActions } from "@/components/vendor/VendorHeaderActions";

// Generate static params if we were doing SSG, but for now purely dynamic or mock
export async function generateStaticParams() {
    const vendors = await getVendors();
    return vendors.map((vendor) => ({
        id: vendor.id,
    }));
}

export default async function VendorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const vendor = await getVendor(id);
    const allVendors = await getVendors();
    const internalNeeds = await getInternalNeeds();
    const similarVendors = vendor ? allVendors.filter(v => vendor.similarVendorIds.includes(v.id)) : [];

    if (!vendor) {
        notFound();
    }

    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
            {/* Back Nav */}
            <Link href="/portfolio" className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
            </Link>

            {/* Premium Header */}
            <div className="relative glass-panel p-8 rounded-3xl overflow-hidden border border-[#ffffff10]">
                {/* Decorative Gradient */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-4xl font-bold text-white shadow-2xl border border-white/20">
                            {vendor.name.charAt(0)}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <TagChip label={vendor.category} />
                                <StatusBadge status={vendor.status} />
                                {vendor.investment && <InvestmentTrafficLight status={vendor.investment.status} className="ml-2" />}
                            </div>
                            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">{vendor.name}</h1>
                            <p className="text-lg text-muted-foreground">{vendor.description}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        {/* Score Block */}
                        <div className="flex items-center gap-4 bg-[#ffffff05] px-6 py-3 rounded-2xl border border-[#ffffff05]">
                            <div className="text-right">
                                <span className="block text-xs text-gray-400 uppercase font-bold tracking-wider">Overall</span>
                                <span className="block text-sm text-white/50">Score</span>
                            </div>
                            <CircularScore score={vendor.ratings.overall} size="lg" />
                        </div>

                        {/* Actions */}
                        {/* Actions */}
                        <VendorHeaderActions vendor={vendor} />
                    </div>
                </div>
            </div>

            {/* Tabs & Content */}
            <VendorDetailsView vendor={vendor} internalNeeds={internalNeeds} />

            {/* Similar Vendors */}
            <SimilarVendors vendors={similarVendors} />
        </div>
    );
}

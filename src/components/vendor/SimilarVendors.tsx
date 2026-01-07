import { Vendor } from "@/types";
import { VendorCard } from "@/components/portfolio/VendorCard";
import { Sparkles } from "lucide-react";

export function SimilarVendors({ vendors }: { vendors: Vendor[] }) {
    if (vendors.length === 0) return null;

    return (
        <div className="mt-12 pt-8 border-t border-[#ffffff10]">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="text-xl font-bold text-white">AI Recommendations & Similar Vendors</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {vendors.map(vendor => (
                    <VendorCard key={vendor.id} vendor={vendor} />
                ))}
            </div>
        </div>
    );
}

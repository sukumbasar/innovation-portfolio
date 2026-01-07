"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Objective, Vendor, Category } from "@/types";
import { VendorCard } from "./VendorCard";
import { EnhancedFilterBar } from "./EnhancedFilterBar";
import { Plus } from "lucide-react";
import { AddVendorModal } from "./AddVendorModal";

interface PortfolioGridProps {
    initialVendors: Vendor[];
    okrs?: Objective[];
}

const CATEGORIES: Category[] = [
    'AI / ML',
    'Computer Vision',
    'Supply Chain Tech',
    'Automation / RPA',
    'Data & Analytics',
    'Retail Experience'
];

export function PortfolioGrid({ initialVendors, okrs = [] }: PortfolioGridProps) {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('search') || "";

    const [search, setSearch] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
    const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Sync search state if URL changes (e.g. back navigation)
    useEffect(() => {
        const urlSearch = searchParams.get('search');
        if (urlSearch !== null && urlSearch !== search) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setSearch(urlSearch);
        }
    }, [searchParams]);

    // Create a map for quick KR lookup
    const krMap = useMemo(() => {
        const map = new Map<string, string>(); // id -> description
        okrs.forEach(o => {
            o.keyResults.forEach(kr => {
                map.set(kr.id, kr.description.toLowerCase());
            });
        });
        return map;
    }, [okrs]);

    const filteredVendors = useMemo(() => {
        return initialVendors
            .filter(v => {
                const searchLower = search.toLowerCase();

                // resolved KRs for this vendor
                const vendorKRs = v.keyResultIds?.map(id => krMap.get(id) || "") || [];

                const matchesSearch =
                    v.name.toLowerCase().includes(searchLower) ||
                    v.tags.some(t => t.toLowerCase().includes(searchLower)) ||
                    (v.okrImpact && v.okrImpact.toLowerCase().includes(searchLower)) ||
                    vendorKRs.some(krDesc => krDesc.includes(searchLower));

                const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;

                // URL Params Matching
                const statusParam = searchParams.get('status');
                const investmentParam = searchParams.get('investment');

                const matchesStatus = !statusParam || v.status === statusParam;
                const matchesInvestment = !investmentParam || v.investment?.status === investmentParam;

                return matchesSearch && matchesCategory && matchesStatus && matchesInvestment;
            })
            .sort((a, b) => {
                if (sortBy === 'rating') return b.ratings.overall - a.ratings.overall;
                return a.name.localeCompare(b.name);
            });
    }, [initialVendors, search, selectedCategory, sortBy, searchParams, krMap]);

    return (
        <div className="space-y-8">
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between">
                <EnhancedFilterBar
                    categories={CATEGORIES}
                    onSearchChange={setSearch}
                    onCategoryChange={(val) => setSelectedCategory(val as Category | 'All')}
                    onSortChange={(val) => setSortBy(val as 'rating' | 'name')}
                />
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 h-[42px] whitespace-nowrap shadow-lg shadow-pink-900/20"
                >
                    <Plus className="w-4 h-4" /> Add Vendor
                </button>
            </div>

            <AddVendorModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVendors.map(vendor => (
                    <VendorCard key={vendor.id} vendor={vendor} />
                ))}
            </div>

            {filteredVendors.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-[#ffffff10] rounded-3xl bg-[#ffffff03]">
                    <div className="w-16 h-16 rounded-full bg-[#ffffff05] flex items-center justify-center mb-4">
                        <span className="text-2xl">🔍</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No vendors found</h3>
                    <p className="text-muted-foreground max-w-sm">
                        Try adjusting your filters or search terms.
                    </p>
                    <button
                        onClick={() => {
                            setSearch('');
                            setSelectedCategory('All');
                            // Clean URL params
                            const url = new URL(window.location.href);
                            url.search = '';
                            window.history.pushState({}, '', url);
                        }}
                        className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}

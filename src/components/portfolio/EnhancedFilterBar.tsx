"use client";

import { Search, Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Category, VendorStatus } from "@/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface EnhancedFilterBarProps {
    onSearchChange: (val: string) => void;
    onCategoryChange: (val: string) => void;
    onSortChange: (val: string) => void;
    categories: Category[];
}

export function EnhancedFilterBar({ onSearchChange, onCategoryChange, onSortChange, categories }: EnhancedFilterBarProps) {
    const [activeSort, setActiveSort] = useState('rating');

    return (
        <div className="glass-panel p-4 rounded-2xl flex flex-col lg:flex-row gap-4 lg:items-center justify-between sticky top-0 z-30 transition-all border border-[#ffffff10]">

            {/* Left: Search & Primary Filters */}
            <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search vendors, tags, problems..."
                        className="w-full bg-[#18181b] border border-[#ffffff10] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                <div className="h-8 w-px bg-[#ffffff10] hidden lg:block" />

                <select
                    className="bg-[#18181b] border border-[#ffffff10] rounded-xl px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-indigo-500/50 hover:bg-[#ffffff05] transition-colors"
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {/* Right: Sort & View Options */}
            <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:block">Sort By</span>

                <button
                    onClick={() => { setActiveSort('rating'); onSortChange('rating'); }}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                        activeSort === 'rating'
                            ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                            : "bg-transparent text-gray-400 border-transparent hover:bg-[#ffffff05]"
                    )}
                >
                    <Filter className="w-4 h-4" /> Score
                </button>

                <button
                    onClick={() => { setActiveSort('name'); onSortChange('name'); }}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                        activeSort === 'name'
                            ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                            : "bg-transparent text-gray-400 border-transparent hover:bg-[#ffffff05]"
                    )}
                >
                    <ArrowUpDown className="w-4 h-4" /> Name
                </button>
            </div>
        </div>
    );
}

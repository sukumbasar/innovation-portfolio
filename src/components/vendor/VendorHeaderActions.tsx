"use client";

import { useState } from "react";
import { Vendor } from "@/types";
import { EditVendorModal } from "@/components/vendor/EditVendorModal";
import { AddInteractionModal } from "@/components/vendor/AddInteractionModal";

interface VendorHeaderActionsProps {
    vendor: Vendor;
}

export function VendorHeaderActions({ vendor }: VendorHeaderActionsProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isInteractionOpen, setIsInteractionOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col gap-2">
                <button
                    onClick={() => setIsEditOpen(true)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all shadow-[0_4px_20px_rgba(79,70,229,0.2)] hover:shadow-[0_4px_25px_rgba(79,70,229,0.4)]"
                >
                    Edit Vendor
                </button>
                <button
                    onClick={() => setIsInteractionOpen(true)}
                    className="px-5 py-2.5 bg-[#ffffff05] hover:bg-[#ffffff10] text-white border border-[#ffffff10] rounded-xl font-medium transition-colors"
                >
                    Add Interaction
                </button>
            </div>

            <EditVendorModal
                vendor={vendor}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
            />

            <AddInteractionModal
                isOpen={isInteractionOpen}
                onClose={() => setIsInteractionOpen(false)}
            />
        </>
    );
}

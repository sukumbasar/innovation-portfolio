"use client";

import { useState } from "react";
import { Vendor, Category, VendorStatus } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { updateVendorDetails } from "@/app/actions";
import { Loader2 } from "lucide-react";

interface EditVendorModalProps {
    vendor: Vendor;
    isOpen: boolean;
    onClose: () => void;
}

const CATEGORIES: Category[] = [
    'AI / ML',
    'Computer Vision',
    'Supply Chain Tech',
    'Automation / RPA',
    'Data & Analytics',
    'Retail Experience',
    'Other'
];

const STATUSES: VendorStatus[] = [
    'Discovered',
    'Met',
    'POC',
    'Working',
    'Parked',
    'Killed'
];

export function EditVendorModal({ vendor, isOpen, onClose }: EditVendorModalProps) {
    const [name, setName] = useState(vendor.name);
    const [description, setDescription] = useState(vendor.description);
    const [category, setCategory] = useState<Category>(vendor.category);
    const [status, setStatus] = useState<VendorStatus>(vendor.status);
    const [contactPerson, setContactPerson] = useState(vendor.contactPerson || '');
    const [email, setEmail] = useState(vendor.email || '');
    const [website, setWebsite] = useState(vendor.websiteUrl || '');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateVendorDetails(vendor.id, {
                name,
                description,
                category,
                status,
                contactPerson,
                email,
                website
            });
            onClose();
        } catch (error) {
            console.error("Failed to update vendor", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Vendor" className="max-w-xl">
            <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                        <label className="text-sm font-medium text-gray-300">Company Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 bg-[#ffffff03] border border-[#ffffff10] rounded-lg text-white focus:outline-none focus:border-indigo-500/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Category)}
                            className="w-full px-4 py-2 bg-[#ffffff03] border border-[#ffffff10] rounded-lg text-white focus:outline-none focus:border-indigo-500/50"
                        >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as VendorStatus)}
                            className="w-full px-4 py-2 bg-[#ffffff03] border border-[#ffffff10] rounded-lg text-white focus:outline-none focus:border-indigo-500/50"
                        >
                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 bg-[#ffffff03] border border-[#ffffff10] rounded-lg text-white focus:outline-none focus:border-indigo-500/50 resize-none"
                    />
                </div>

                <div className="space-y-4 pt-4 border-t border-[#ffffff05]">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Contact & Links</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Contact Person</label>
                            <input
                                value={contactPerson}
                                onChange={(e) => setContactPerson(e.target.value)}
                                placeholder="e.g. John Doe"
                                className="w-full px-4 py-2 bg-[#ffffff03] border border-[#ffffff10] rounded-lg text-white focus:outline-none focus:border-indigo-500/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="w-full px-4 py-2 bg-[#ffffff03] border border-[#ffffff10] rounded-lg text-white focus:outline-none focus:border-indigo-500/50"
                            />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-sm font-medium text-gray-300">Website</label>
                            <input
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                placeholder="https://..."
                                className="w-full px-4 py-2 bg-[#ffffff03] border border-[#ffffff10] rounded-lg text-white focus:outline-none focus:border-indigo-500/50"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-[#ffffff05] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                    >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        Save Changes
                    </button>
                </div>
            </form>
        </Modal>
    );
}

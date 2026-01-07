"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { addVendor } from "@/app/actions";
import { Category } from "@/types";

interface AddVendorModalProps {
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

export function AddVendorModal({ isOpen, onClose }: AddVendorModalProps) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState<Category>('AI / ML');
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addVendor({ name, category, description });
            onClose();
            // Reset form
            setName("");
            setCategory('AI / ML');
            setDescription("");
        } catch (error) {
            console.error("Failed to create vendor", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Vendor"
            className="max-w-md"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Company Name</label>
                    <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Acme AI"
                        className="w-full bg-[#09090b] border border-[#ffffff10] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Category</label>
                    <select
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="w-full bg-[#09090b] border border-[#ffffff10] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Description</label>
                    <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What do they do?"
                        rows={3}
                        className="w-full bg-[#09090b] border border-[#ffffff10] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                    />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 hover:bg-[#ffffff05] text-gray-400 text-sm font-medium rounded-lg transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isSubmitting ? 'Adding...' : 'Add Vendor'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

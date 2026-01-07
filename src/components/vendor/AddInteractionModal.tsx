"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Calendar, MessageSquare, Phone, Users } from "lucide-react";

interface AddInteractionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddInteractionModal({ isOpen, onClose }: AddInteractionModalProps) {
    const [type, setType] = useState('meeting');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Log Interaction">
            <form onSubmit={handleSave} className="space-y-6">

                {/* Type Selection */}
                <div className="grid grid-cols-4 gap-2">
                    {[
                        { id: 'meeting', icon: Users, label: 'Meeting' },
                        { id: 'contact', icon: MessageSquare, label: 'Email' },
                        { id: 'call', icon: Phone, label: 'Call' },
                        { id: 'note', icon: Calendar, label: 'Note' },
                    ].map(t => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setType(t.id)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${type === t.id
                                    ? 'bg-indigo-500/20 border-indigo-500/50 text-white'
                                    : 'bg-[#ffffff03] border-[#ffffff05] text-gray-400 hover:bg-[#ffffff05]'
                                }`}
                        >
                            <t.icon className="w-5 h-5" />
                            <span className="text-xs font-medium">{t.label}</span>
                        </button>
                    ))}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Title</label>
                    <input
                        placeholder="e.g. Intro Call with CEO"
                        className="w-full px-4 py-3 bg-[#ffffff03] border border-[#ffffff10] rounded-xl text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Notes</label>
                    <textarea
                        placeholder="Key takeaways..."
                        rows={4}
                        className="w-full px-4 py-3 bg-[#ffffff03] border border-[#ffffff10] rounded-xl text-white focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Date</label>
                    <input
                        type="date"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-[#ffffff03] border border-[#ffffff10] rounded-xl text-white focus:outline-none focus:border-indigo-500/50 transition-colors scheme-dark"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-[#ffffff05] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 transition-all"
                    >
                        Log Interaction
                    </button>
                </div>
            </form>
        </Modal>
    );
}

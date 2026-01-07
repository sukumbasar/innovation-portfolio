"use client";

import { Modal } from "@/components/ui/Modal";
import { Objective, KeyResult } from "@/types";
import { Plus, Trash, Save } from "lucide-react";
import { useState } from "react";

interface ManageOKRsModalProps {
    isOpen: boolean;
    onClose: () => void;
    okrs: Objective[];
    onSave: (okrs: Objective[]) => void;
}

export function ManageOKRsModal({ isOpen, onClose, okrs: initialOkrs, onSave }: ManageOKRsModalProps) {
    const [okrs, setOkrs] = useState<Objective[]>(initialOkrs);

    const addObjective = () => {
        const newObj: Objective = {
            id: `new_o_${Date.now()}`,
            title: "New Objective",
            description: "",
            keyResults: []
        };
        setOkrs([...okrs, newObj]);
    };

    const addKeyResult = (objId: string) => {
        setOkrs(okrs.map(o => {
            if (o.id === objId) {
                return {
                    ...o,
                    keyResults: [
                        ...o.keyResults,
                        { id: `new_kr_${Date.now()}`, description: "New Key Result", unit: '%' }
                    ]
                };
            }
            return o;
        }));
    };

    const updateObjective = (id: string, field: keyof Objective, value: string) => {
        setOkrs(okrs.map(o => o.id === id ? { ...o, [field]: value } : o));
    };

    const updateKR = (objId: string, krId: string, field: keyof KeyResult, value: string) => {
        setOkrs(okrs.map(o => {
            if (o.id === objId) {
                return {
                    ...o,
                    keyResults: o.keyResults.map(kr => kr.id === krId ? { ...kr, [field]: value } : kr)
                };
            }
            return o;
        }));
    };

    const deleteObjective = (id: string) => {
        setOkrs(okrs.filter(o => o.id !== id));
    };

    const deleteKeyResult = (objId: string, krId: string) => {
        setOkrs(okrs.map(o => {
            if (o.id === objId) {
                return {
                    ...o,
                    keyResults: o.keyResults.filter(kr => kr.id !== krId)
                };
            }
            return o;
        }));
    };

    const saveChanges = () => {
        onSave(okrs);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Manage Strategic OKRs" className="max-w-3xl">
            <div className="space-y-6">
                <div className="flex justify-end">
                    <button
                        onClick={addObjective}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#ffffff05] hover:bg-[#ffffff10] border border-[#ffffff10] rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Objective
                    </button>
                </div>

                <div className="space-y-6">
                    {okrs.map(o => (
                        <div key={o.id} className="p-4 rounded-xl bg-[#ffffff03] border border-[#ffffff10]">
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1 space-y-2">
                                    <input
                                        value={o.title}
                                        onChange={(e) => updateObjective(o.id, 'title', e.target.value)}
                                        className="w-full bg-transparent text-lg font-bold text-indigo-300 focus:outline-none placeholder-gray-600"
                                        placeholder="Objective Title"
                                    />
                                    <input
                                        value={o.description}
                                        onChange={(e) => updateObjective(o.id, 'description', e.target.value)}
                                        className="w-full bg-transparent text-sm text-gray-400 focus:outline-none placeholder-gray-600"
                                        placeholder="Description..."
                                    />
                                </div>
                                <button
                                    onClick={() => deleteObjective(o.id)}
                                    className="text-gray-600 hover:text-rose-500 transition-colors h-fit"
                                    title="Delete Objective"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="pl-4 border-l-2 border-[#ffffff05] space-y-3">
                                {o.keyResults.map(kr => (
                                    <div key={kr.id} className="flex items-center gap-3 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                                        <input
                                            value={kr.description}
                                            onChange={(e) => updateKR(o.id, kr.id, 'description', e.target.value)}
                                            className="flex-1 bg-transparent text-sm text-gray-300 focus:outline-none border-b border-transparent focus:border-indigo-500/50 py-1 transition-colors"
                                            placeholder="Key Result Description"
                                        />
                                        <button
                                            onClick={() => deleteKeyResult(o.id, kr.id)}
                                            className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-rose-500 transition-all"
                                        >
                                            <Trash className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addKeyResult(o.id)}
                                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-2"
                                >
                                    <Plus className="w-3 h-3" /> Add Key Result
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t border-[#ffffff10] flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
                    <button
                        onClick={saveChanges}
                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/20"
                    >
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>
            </div>
        </Modal>
    );
}

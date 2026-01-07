"use client";

import { useState } from "react";
import { Vendor } from "@/types";
import { FileText, Video, Presentation, Link as LinkIcon, Plus, ExternalLink } from "lucide-react";
import { AddArtifactModal } from "./AddArtifactModal";

interface ArtifactsTabProps {
    vendor: Vendor;
}

const getIcon = (type: string) => {
    switch (type) {
        case 'deck': return Presentation;
        case 'video': return Video;
        case 'doc': return FileText;
        default: return LinkIcon;
    }
};

export function ArtifactsTab({ vendor }: ArtifactsTabProps) {
    const [isAddOpen, setIsAddOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Documents & Links</h3>
                <button
                    onClick={() => setIsAddOpen(true)}
                    className="px-3 py-1.5 bg-[#ffffff05] hover:bg-[#ffffff10] border border-[#ffffff10] rounded-lg text-sm text-white transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Document
                </button>
            </div>

            {(!vendor.artifacts || vendor.artifacts.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground glass-panel rounded-2xl border border-[#ffffff10] bg-[#18181b]">
                    <div className="w-12 h-12 rounded-full bg-[#ffffff05] flex items-center justify-center mb-4 text-2xl">
                        📂
                    </div>
                    <p>No artifacts linked yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vendor.artifacts.map((artifact) => {
                        const Icon = getIcon(artifact.type);
                        return (
                            <a
                                key={artifact.id}
                                href={artifact.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-4 bg-[#18181b] border border-[#ffffff10] rounded-xl hover:border-indigo-500/30 transition-all hover:bg-[#ffffff03]"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-[#ffffff05] rounded-lg text-indigo-400 group-hover:text-indigo-300 transition-colors">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                                </div>
                                <h4 className="font-medium text-gray-200 group-hover:text-white transition-colors truncate">
                                    {artifact.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                    <span className="capitalize">{artifact.type}</span>
                                    <span>•</span>
                                    <span>{new Date(artifact.dateAdded).toLocaleDateString()}</span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            )}

            <AddArtifactModal
                vendorId={vendor.id}
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
            />
        </div>
    );
}

"use client";

import { useState, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { addArtifact, uploadArtifact } from "@/app/actions";
import { Loader2, Link as LinkIcon, FileText, Video, Presentation, UploadCloud } from "lucide-react";

interface AddArtifactModalProps {
    vendorId: string;
    isOpen: boolean;
    onClose: () => void;
}

const ARTIFACT_TYPES = [
    { value: 'deck', label: 'Pitch Deck', icon: Presentation },
    { value: 'doc', label: 'Document', icon: FileText },
    { value: 'video', label: 'Video Demo', icon: Video },
    { value: 'other', label: 'Other Link', icon: LinkIcon },
];

export function AddArtifactModal({ vendorId, isOpen, onClose }: AddArtifactModalProps) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("doc");
    const [url, setUrl] = useState("");
    const [mode, setMode] = useState<'link' | 'file'>('link');
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            let result;
            if (mode === 'file' && file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('title', title);
                formData.append('type', type);
                formData.append('vendorId', vendorId);
                result = await uploadArtifact(formData);
            } else {
                result = await addArtifact(vendorId, { title, type, url });
            }

            if (!result?.success) {
                throw new Error(result?.error || "Failed to add artifact");
            }

            onClose();
            // Reset
            setTitle("");
            setType("doc");
            setUrl("");
            setFile(null);
            setMode('link');
        } catch (err: any) {
            console.error("Failed to add artifact", err);
            setError(err.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Document / Link" className="max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm">
                        <span>⚠️</span> {error}
                    </div>
                )}
                {/* Mode Switcher */}
                <div className="flex bg-[#ffffff05] p-1 rounded-lg mb-4">
                    <button
                        type="button"
                        onClick={() => setMode('link')}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${mode === 'link' ? 'bg-[#ffffff10] text-white shadow-sm' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Link URL
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('file')}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${mode === 'file' ? 'bg-[#ffffff10] text-white shadow-sm' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Upload File
                    </button>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Title</label>
                    <input
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={mode === 'file' ? "e.g. Q4 Report.pdf" : "e.g. Q4 Pitch Deck"}
                        className="w-full px-4 py-2 bg-[#ffffff03] border border-[#ffffff10] rounded-lg text-white focus:outline-none focus:border-indigo-500/50"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Type</label>
                    <div className="grid grid-cols-2 gap-2">
                        {ARTIFACT_TYPES.map(t => {
                            const Icon = t.icon;
                            return (
                                <button
                                    key={t.value}
                                    type="button"
                                    onClick={() => setType(t.value)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${type === t.value
                                        ? 'bg-indigo-500/20 border-indigo-500/50 text-white'
                                        : 'bg-[#ffffff03] border-[#ffffff10] text-gray-400 hover:bg-[#ffffff05]'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {t.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {mode === 'link' ? (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">URL</label>
                        <input
                            required
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full px-4 py-2 bg-[#ffffff03] border border-[#ffffff10] rounded-lg text-white focus:outline-none focus:border-indigo-500/50"
                        />
                    </div>
                ) : (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">File</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-[#ffffff10] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-[#ffffff03] transition-colors"
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setFile(e.target.files[0]);
                                        // Auto-fill title if empty
                                        if (!title) setTitle(e.target.files[0].name);
                                    }
                                }}
                            />
                            <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
                            {file ? (
                                <p className="text-sm text-indigo-400 font-medium">{file.name}</p>
                            ) : (
                                <p className="text-sm text-gray-500">Click to upload file</p>
                            )}
                        </div>
                    </div>
                )}

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
                        disabled={isSubmitting || (mode === 'file' && !file)}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                    >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        {mode === 'file' ? 'Upload File' : 'Add Link'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

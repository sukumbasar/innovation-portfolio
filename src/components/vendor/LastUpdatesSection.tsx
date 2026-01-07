import { Vendor } from "@/types";
import { Globe, Linkedin, Newspaper, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";

interface LastUpdatesSectionProps {
    vendor: Vendor;
}

export function LastUpdatesSection({ vendor }: LastUpdatesSectionProps) {
    if (!vendor.externalUpdates || vendor.externalUpdates.length === 0) return null;

    const getIcon = (source: string) => {
        switch (source) {
            case 'linkedin': return <Linkedin className="w-4 h-4 text-[#0A66C2]" />;
            case 'website': return <Globe className="w-4 h-4 text-emerald-400" />;
            case 'news': return <Newspaper className="w-4 h-4 text-amber-400" />;
            default: return <ExternalLink className="w-4 h-4 text-gray-400" />;
        }
    };

    return (
        <section className="glass-panel p-6 rounded-2xl border border-[#ffffff10] bg-[#18181b]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Last Updates</h3>
                <div className="flex gap-2">
                    {vendor.websiteUrl && (
                        <Link
                            href={vendor.websiteUrl}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-[#ffffff05] hover:bg-[#ffffff10] hover:text-indigo-400 transition-colors"
                            title="Visit Website"
                        >
                            <Globe className="w-4 h-4" />
                        </Link>
                    )}
                    {vendor.linkedinUrl && (
                        <Link
                            href={vendor.linkedinUrl}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-[#ffffff05] hover:bg-[#ffffff10] hover:text-[#0A66C2] transition-colors"
                            title="Visit LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                {vendor.externalUpdates.map((update) => (
                    <div key={update.id} className="p-4 rounded-xl bg-[#ffffff03] border border-[#ffffff05] hover:border-indigo-500/20 transition-all group">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 p-1.5 rounded-lg bg-[#ffffff05] shrink-0">
                                {getIcon(update.source)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                                    {update.content}
                                </p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                    <span className="capitalize text-indigo-400/80 font-medium">{update.source}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3 opacity-70" />
                                        {update.date}
                                    </div>
                                    {update.url && (
                                        <Link
                                            href={update.url}
                                            target="_blank"
                                            className="ml-auto opacity-0 group-hover:opacity-100 flex items-center gap-1 text-indigo-400 hover:underline transition-opacity"
                                        >
                                            View <ExternalLink className="w-3 h-3" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

"use client";

import { UpdateItem } from "@/types";
import { cn } from "@/lib/utils";
import {
    Calendar,
    Link as LinkIcon,
    Newspaper,
    TrendingUp,
    AlertTriangle,
    MessageSquare,
    FileText,
    Activity,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";

interface UpdateLogCardProps {
    update: UpdateItem;
}

const ICONS: Record<string, any> = {
    // Timeline
    meeting: Calendar,
    contact: MessageSquare,
    note: FileText,

    // External
    news: Newspaper,
    linkedin: LinkIcon,
    website: LinkIcon,

    // Signals
    traction: TrendingUp,
    strategic: Activity,
    funding: TrendingUp
};

export function UpdateLogCard({ update }: UpdateLogCardProps) {
    const Icon = ICONS[update.subType] || Activity;

    // Color coding based on type
    const getTypeColor = (type: string, subType: string) => {
        if (type === 'signal') {
            return update.metadata?.impact === 'Positive' ? 'text-emerald-400' : 'text-amber-400';
        }
        if (type === 'external') return 'text-blue-400';
        return 'text-gray-400';
    };

    const colorClass = getTypeColor(update.type, update.subType);


    // Use a hydration-safe date format (e.g. ISO string or simple static format) initially, 
    // or use a client-side hook if local format is strictly required. 
    // To match server/client, we can just use a simple YYYY-MM-DD or standard format that doesn't depend on locale.
    const formattedDate = new Date(update.date).toISOString().split('T')[0];

    return (
        <div className="group relative flex gap-4 p-4 rounded-xl border border-[#ffffff05] bg-[#ffffff02] hover:bg-[#ffffff05] transition-all hover:border-[#ffffff10]">
            {/* Icon Column */}
            <div className="flex-shrink-0 mt-1">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-[#ffffff05]", colorClass)}>
                    <Icon className="w-4 h-4" />
                </div>
            </div>

            {/* Content Column */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                                {update.vendor.name}
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-400 font-medium capitalize">
                                {update.type === 'signal' ? `${update.subType} Signal` : update.subType.replace('_', ' ')}
                            </span>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                            {update.title}
                        </h3>
                    </div>
                    <div className="text-[10px] font-mono text-gray-600 whitespace-nowrap">
                        {formattedDate}
                    </div>
                </div>

                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {update.description}
                </p>

                {/* Metadata / Actions */}
                {update.metadata?.url && (
                    <div className="mt-3">
                        <Link
                            href={update.metadata.url}
                            target="_blank"
                            className="inline-flex items-center text-[10px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            View Source <ArrowUpRight className="ml-1 w-3 h-3" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

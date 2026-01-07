import { TimelineEvent } from "@/types";
import { cn } from "@/lib/utils";
import {
    Calendar,
    FlaskConical,
    CheckCircle2,
    FileText,
    MessageSquare,
    Zap
} from "lucide-react";

interface TimelineItemProps {
    event: TimelineEvent;
    isLast?: boolean;
}

const ICONS = {
    meeting: Calendar,
    poc_start: FlaskConical,
    poc_end: FlaskConical,
    status_change: CheckCircle2,
    contact: MessageSquare,
    note: FileText,
};

export function TimelineItem({ event, isLast = false }: TimelineItemProps) {
    const Icon = ICONS[event.type] || Zap;

    return (
        <div className="relative flex gap-4 group">
            {/* Vertical Line */}
            {!isLast && (
                <div className="absolute left-[19px] top-10 bottom-[-10px] w-px bg-[#ffffff08] group-hover:bg-[#ffffff15] transition-colors" />
            )}

            {/* Icon Bubble */}
            <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#18181b] border border-[#ffffff10] shadow-sm group-hover:border-indigo-500/50 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all">
                <Icon className="w-4 h-4 text-gray-400 group-hover:text-indigo-400 transition-colors" />
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
                <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {event.title}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                        {event.date}
                    </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {event.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] text-[#ffffff30]">
                        by {event.author}
                    </span>
                </div>
            </div>
        </div>
    );
}

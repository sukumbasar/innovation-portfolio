import { Vendor } from "@/types";
import { Circle, CheckCircle2, FlaskConical, Calendar } from "lucide-react";

export function TimelineTab({ vendor }: { vendor: Vendor }) {
    // Sort timeline latest first
    const sorted = [...vendor.timeline].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="max-w-3xl relative">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-6 w-px bg-[#ffffff10]" />

            <div className="space-y-8">
                {sorted.map((item) => (
                    <div key={item.id} className="relative flex gap-6 group">
                        {/* Icon Node */}
                        <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-[#09090b] border border-[#ffffff20] group-hover:border-indigo-500 transition-colors">
                            {item.type === 'meeting' && <Calendar className="w-5 h-5 text-indigo-400" />}
                            {item.type === 'poc_start' && <FlaskConical className="w-5 h-5 text-amber-400" />}
                            {item.type === 'status_change' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                            {['contact', 'note', 'poc_end'].includes(item.type) && <Circle className="w-4 h-4 text-gray-400" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 glass-panel p-5 rounded-lg border border-[#ffffff10] group-hover:border-indigo-500/30 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-sm font-semibold text-white capitalize">{item.type.replace('_', ' ')}</span>
                                <span className="text-xs text-gray-500 font-mono">{item.date}</span>
                            </div>
                            <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                            <div className="mt-3 text-xs text-indigo-300 font-medium">
                                by {item.author}
                            </div>
                        </div>
                    </div>
                ))}

                {sorted.length === 0 && (
                    <div className="pl-20 py-8 text-gray-500">No recorded history.</div>
                )}
            </div>
        </div>
    );
}

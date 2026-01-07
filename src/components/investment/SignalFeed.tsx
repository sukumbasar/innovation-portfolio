import { Signal } from "@/types";
import { ArrowUpRight, Radio, TrendingUp, DollarSign, Users, Target } from "lucide-react";

const ICONS = {
    Traction: TrendingUp,
    Strategic: Target,
    Market: Radio,
    Team: Users,
    Funding: DollarSign,
    Product: ArrowUpRight
};

export function SignalFeed({ signals }: { signals: Signal[] }) {
    if (!signals?.length) return <div className="text-muted-foreground text-sm">No signals recorded.</div>;

    return (
        <div className="space-y-4">
            {signals.map(signal => {
                const Icon = ICONS[signal.category] || Radio;

                return (
                    <div key={signal.id} className="glass-panel p-4 rounded-lg flex gap-4 items-start">
                        <div className={`p-2 rounded-md ${signal.type === 'Internal' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            <Icon className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${signal.type === 'Internal' ? 'border-indigo-500/30 text-indigo-400' : 'border-blue-500/30 text-blue-400'
                                    }`}>
                                    {signal.type}
                                </span>
                                <span className="text-xs text-muted-foreground">{signal.date}</span>
                            </div>
                            <h4 className="text-sm font-semibold text-white">{signal.title}</h4>
                            <p className="text-xs text-gray-400 mt-1">{signal.description}</p>
                            {signal.source && <p className="text-[10px] text-gray-500 mt-2">Source: {signal.source}</p>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

import { getVendors, getOKRs } from "@/lib/data";
import { HistoryTimeline } from "@/components/history/HistoryTimeline";
import { Clock } from "lucide-react";

export default async function HistoryPage() {
    const vendors = await getVendors();
    const okrs = await getOKRs();

    return (
        <div className="p-8 max-w-[1600px] mx-auto min-h-screen">
            <div className="mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-pink-500/10">
                    <Clock className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Strategic Timeline</h1>
                    <p className="text-sm text-muted-foreground">Portfolio lifecycle analysis and key milestones.</p>
                </div>
            </div>

            <HistoryTimeline vendors={vendors} okrs={okrs} />
        </div>
    );
}

import { getAllUpdates } from "@/lib/data";
import { UpdateLogCard } from "@/components/updates/UpdateLogCard";
import { Activity } from "lucide-react";

export default async function UpdatesPage() {
    const updates = await getAllUpdates();

    return (
        <div className="p-8 max-w-[1000px] mx-auto min-h-screen">
            <div className="mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10">
                    <Activity className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">System Logs</h1>
                    <p className="text-sm text-muted-foreground">Real-time activity stream across the portfolio.</p>
                </div>
            </div>

            <div className="space-y-2 relative">
                {/* Timeline Line (Visual Only) */}
                <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-[#ffffff10] via-[#ffffff05] to-transparent z-0" />

                {updates.map((update) => (
                    <div key={update.id} className="relative z-10 pl-2">
                        <UpdateLogCard update={update} />
                    </div>
                ))}

                {updates.length === 0 && (
                    <div className="py-12 text-center text-gray-500 text-sm">
                        No updates found.
                    </div>
                )}
            </div>
        </div>
    );
}

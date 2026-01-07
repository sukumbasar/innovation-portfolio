import { Vendor } from "@/types";
import { Clock } from "lucide-react";

interface ActivityFeedProps {
    vendors: Vendor[]; // Pass all vendors to extract latest activity
}

export function ActivityFeed({ vendors }: ActivityFeedProps) {
    // Flatten all timeline events and sort by date descending
    const activities = vendors
        .flatMap(v => v.timeline.map(t => ({ ...t, vendorName: v.name, vendorId: v.id })))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5); // Top 5

    return (
        <div className="glass-panel p-6 rounded-xl h-full">
            <div className="flex items-center mb-6">
                <Clock className="h-5 w-5 text-indigo-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Recent Updates</h3>
            </div>

            <div className="space-y-6">
                {activities.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No recent activity.</p>
                ) : (
                    activities.map((activity) => (
                        <div key={`${activity.vendorId}-${activity.id}`} className="flex gap-4">
                            <div className="relative">
                                <div className="absolute top-2 left-2 w-px h-full bg-[#ffffff10] -z-10" />
                                <div className="w-4 h-4 rounded-full bg-indigo-500/20 border border-indigo-500 mt-1.5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">
                                    {activity.title} <span className="text-muted-foreground">@ {activity.vendorName}</span>
                                </p>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {activity.description}
                                </p>
                                <p className="text-xs text-[#ffffff40] mt-2">
                                    {activity.date} by {activity.author}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

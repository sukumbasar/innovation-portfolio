import { getVendors, getOKRs } from "@/lib/data";
import { HeroMetrics } from "@/components/dashboard/HeroMetrics";
import { FocusCard } from "@/components/dashboard/FocusCard";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { OKRDistribution } from "@/components/dashboard/OKRDistribution";
import { Activity, Zap } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  const vendors = await getVendors();
  const okrs = await getOKRs();

  // Metrics
  const total = vendors.length;
  const activePocs = vendors.filter(v => v.status === 'POC').length;
  const activeSolutions = vendors.filter(v => v.status === 'Working').length;
  const highPotentials = vendors.filter(v => v.investment?.status === 'Watch Closely').length;

  // Focus Items (Mock logic: POCs or High Potential)
  const focusItems = vendors.filter(v => v.status === 'POC' || v.investment?.status === 'Watch Closely').slice(0, 3);

  // Recent Activity (Flattened)
  const activities = vendors
    .flatMap(v => v.timeline.map(t => ({ ...t, vendorName: v.name })))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Executive Overview</h1>
        <p className="text-muted-foreground mt-1 text-lg">System health & decision focus.</p>
      </div>

      {/* Hero Row */}
      <HeroMetrics total={total} activePocs={activePocs} working={activeSolutions} investReady={highPotentials} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Column: Focus & Feed */}
        <div className="lg:col-span-2 space-y-10">

          {/* OKR Distribution */}
          <section>
            <OKRDistribution vendors={vendors} okrs={okrs} />
          </section>

          {/* Focus Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Focus Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {focusItems.map(v => (
                <FocusCard
                  key={v.id}
                  vendor={v}
                  reason={v.status === 'POC' ? 'POC In Progress' : 'Investment Candidate'}
                />
              ))}
              {/* Add Vendor CTA */}
              <Link href="/portfolio" className="border border-dashed border-[#ffffff10] rounded-2xl flex items-center justify-center text-sm text-gray-500 hover:text-white hover:border-[#ffffff20] transition-colors bg-[#ffffff03] min-h-[140px]">
                + Explore Portfolio
              </Link>
            </div>
          </section>
        </div>

        {/* Side Column: Updates */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-bold text-white">Recent Updates</h2>
            </div>
            <div className="p-6 rounded-2xl bg-[#18181b] border border-[#ffffff08]">
              <div className="space-y-2">
                {activities.map((item, i) => (
                  <TimelineItem key={`${item.id}-${i}`} event={item} isLast={i === activities.length - 1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

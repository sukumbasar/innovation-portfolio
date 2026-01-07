import { Vendor } from "@/types";

function RatingRow({ label, value, max = 20 }: { label: string; value: number; max?: number }) {
    const percentage = (value / max) * 100;
    let color = "bg-indigo-500";
    if (percentage < 40) color = "bg-red-500";
    else if (percentage < 70) color = "bg-amber-500";
    else color = "bg-green-500";

    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-gray-300 font-medium">{label}</span>
                <span className="text-white font-mono">{value}/{max}</span>
            </div>
            <div className="h-2 w-full bg-[#ffffff10] rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export function RatingsTab({ vendor }: { vendor: Vendor }) {
    const r = vendor.ratings;

    return (
        <div className="glass-panel p-8 rounded-xl max-w-3xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                Score Breakdown
                <span className="ml-auto text-3xl font-black text-indigo-400">{r.overall}<span className="text-lg text-gray-500 font-normal">/100</span></span>
            </h3>

            <div className="space-y-6">
                <RatingRow label="Problem Fit" value={r.problemFit} />
                <RatingRow label="Solution Maturity" value={r.solutionMaturity} />
                <RatingRow label="Evidence / Traction" value={r.evidence} />
                <RatingRow label="Differentiation" value={r.differentiation} />
                <RatingRow label="Strategic Fit" value={r.strategicFit} />
            </div>

            <div className="mt-8 p-4 bg-[#ffffff05] rounded-lg border border-[#ffffff10]">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">AI Assessment</h4>
                <p className="text-sm text-gray-400">
                    This vendor shows strong differentiation but lacks mature evidence. Recommended for POC to validate claims.
                </p>
            </div>
        </div>
    );
}

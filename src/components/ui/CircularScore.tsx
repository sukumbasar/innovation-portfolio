import { cn } from "@/lib/utils";

interface CircularScoreProps {
    score: number;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    showLabel?: boolean;
}

export function CircularScore({ score, size = 'md', className, showLabel = true }: CircularScoreProps) {
    // Dimensions
    const sizes = {
        sm: { w: 32, stroke: 3, text: 'text-[10px]' },
        md: { w: 48, stroke: 4, text: 'text-xs' },
        lg: { w: 80, stroke: 6, text: 'text-xl' },
    };
    const { w, stroke, text } = sizes[size];

    const radius = (w - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(score, 100);
    const offset = circumference - (progress / 100) * circumference;

    // Colors
    let color = "text-indigo-500";
    if (score >= 80) color = "text-emerald-400"; // High
    else if (score >= 60) color = "text-amber-400"; // Mid
    else color = "text-rose-400"; // Low

    return (
        <div className={cn("relative flex items-center justify-center", className)} style={{ width: w, height: w }}>
            {/* Background Circle */}
            <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                    cx={w / 2}
                    cy={w / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={stroke}
                    fill="transparent"
                    className="text-[#ffffff08]"
                />
                {/* Progress Circle */}
                <circle
                    cx={w / 2}
                    cy={w / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={cn("transition-all duration-1000 ease-out", color)}
                />
            </svg>
            {/* Score Text */}
            {showLabel && (
                <span className={cn("font-bold tabular-nums text-white", text)}>
                    {score}
                </span>
            )}
        </div>
    );
}

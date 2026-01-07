import { cn } from "@/lib/utils";

interface TagChipProps {
    label: string;
    variant?: 'default' | 'outline' | 'ghost' | 'glass';
    className?: string;
    size?: 'sm' | 'xs';
}

export function TagChip({ label, variant = 'glass', className, size = 'xs' }: TagChipProps) {
    const baseStyles = "inline-flex items-center rounded-md font-medium transition-colors";

    const variants = {
        default: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/20",
        outline: "border border-[#ffffff20] text-gray-400",
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-[#ffffff05]",
        glass: "bg-[#ffffff08] border border-[#ffffff08] text-gray-300 backdrop-blur-sm",
    };

    const sizes = {
        xs: "px-2 py-0.5 text-[10px]",
        sm: "px-2.5 py-1 text-xs",
    };

    return (
        <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
            {label}
        </span>
    );
}

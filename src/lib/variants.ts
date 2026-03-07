import { cva } from "class-variance-authority"

export const badgeVariants = cva(
    "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus-visible:outline-none",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary/15 text-primary",
                secondary:
                    "border-transparent bg-surface-2 text-text-secondary",
                destructive:
                    "border-transparent bg-destructive/15 text-destructive",
                outline: "border-border text-text-secondary",
                success: "border-transparent bg-emerald-500/15 text-emerald-400",
                warning: "border-transparent bg-amber-500/15 text-amber-400",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
                destructive:
                    "bg-destructive/15 text-destructive hover:bg-destructive/25 border border-destructive/20",
                outline:
                    "border border-border bg-transparent hover:bg-surface-2 text-text-secondary hover:text-text-primary",
                secondary:
                    "bg-surface-2 text-text-secondary hover:bg-surface-3 hover:text-text-primary border border-border",
                ghost: "hover:bg-surface-2 text-text-secondary hover:text-text-primary",
                link: "text-primary underline-offset-4 hover:underline",
                accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-11 rounded-lg px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

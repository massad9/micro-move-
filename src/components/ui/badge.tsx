import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { badgeVariants } from "@/lib/variants"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

export type BadgeVariantProps = VariantProps<typeof badgeVariants>

export type BadgeProps2 = React.HTMLAttributes<HTMLDivElement> & BadgeVariantProps

function Badge({ className, variant, ...props }: BadgeProps2) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export default Badge

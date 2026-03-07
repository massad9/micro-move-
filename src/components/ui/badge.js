import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import {} from "class-variance-authority";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/lib/variants";
function Badge({ className, variant, ...props }) {
    return (_jsx("div", { className: cn(badgeVariants({ variant }), className), ...props }));
}
export default Badge;

"use client"

import { TooltipProvider as Tooltip } from "@/components/ui/tooltip"
import { TooltipProviderProps } from "@radix-ui/react-tooltip"

export function TooltipProvider({ children, ...props }: TooltipProviderProps) {
    return <Tooltip {...props}>{children}</Tooltip>
}

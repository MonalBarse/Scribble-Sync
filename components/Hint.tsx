import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import React from 'react'

export interface HintProps {
    lable: string;
    children: React.ReactNode;
    side?: 'top' | 'left' | 'right' | 'bottom';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    alignOffset?: number;
}

const Hint = ({
    lable,
    children,
    side = 'top',
    align = 'center',
    sideOffset = 0,
    alignOffset = 0, }: HintProps) => {
    return (

        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    className="border-gray-900   bg-[#27272a] bg-opacity-40 p-2 rounded-lg text-gray-400 text-xs w-[170px]"
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                >
                    <p className="font-semibold  capitalize text-gray-400">{lable}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default Hint
"use client"
import React from 'react'
import Image from 'next/image'

import {
    useOrganizationList,
    useOrganization,
} from '@clerk/nextjs'

import { cn } from "@/lib/utils"

import Hint from '@/components/Hint'

interface ItemProps {
    id: string
    name: string
    imageUrl: string
}

const Item = ({ id, name, imageUrl }: ItemProps) => {
    const { organization } = useOrganization()
    const { setActive } = useOrganizationList()

    const isActive = organization?.id === id;

    const handleClick = () => {
        if (!setActive) return;
        setActive({ organization: id })
    }
    return (
        <div className='aspect-square relative'>
            <Hint
                lable={name}
                side='right'
                align='center'
                sideOffset={18}
            >
            <Image
                src={imageUrl}
                alt={name}
                onClick={handleClick}
                fill
                className={cn("rounded-xl cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out",
                    isActive && "opacity-100"
                )}
            />
            </Hint>
        </div>
    )
}
 
export default Item
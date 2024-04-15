
"use client"
import React from 'react'
import { Plus } from "lucide-react"
import { CreateOrganization } from "@clerk/nextjs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Hint from '@/components/Hint'

const newButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='aspect-square'>
                    <Hint lable='Create new organization'
                        side='right'
                        align='center'
                        sideOffset={18}
                    >
                    <button
                        className='bg-black h-full w-full rounded-xl flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out'
                    >
                        <Plus size={20} />
                    </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className='p-0 bg-transparent border-none max-w-[500px]'>

                <CreateOrganization
                />
            </DialogContent>
        </Dialog>
    )
}

export default newButton
"use client"
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { Link2, Trash2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import ConfirmModal from "./ConfirmModal";

import { api } from '@/convex/_generated/api';
import React from 'react'
import { toast } from 'sonner';
import { useApiMutation } from '@/hooks/useApiMutation';
import { Button } from './ui/button';
import { useRename } from '@/store/useRename';


interface ActionProps {
    children: React.ReactNode;
    title: string;
    id: string;
    side?: DropdownMenuContentProps['side'];
    sideOffset?: DropdownMenuContentProps['sideOffset'];
}
const Actions = ({ children, title, id, side, sideOffset }: ActionProps) => {

    const { mutate, pending } = useApiMutation(api.board.remove)

    const {onOpen} = useRename()

    // Copy Functionality
    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`).then(() => {
            toast.success('Link copied to clipboard')
        }).catch((e) => {
            console.error(e)
        })
    }
    // Delete Functionality
    const onDelete = () => {
        mutate({ id }).then(() => {
            toast.success('Board Deleted')
        }).catch((e) => {
            console.error(e)
        })
    }


    return (
        /*   <div
              className='absolute top-1 right-1 z-10'
          >Actions</div> */
        <DropdownMenu
        >
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffset}
                onClick={(e) => e.stopPropagation()}
                className="border-gray-900   bg-gray-700 bg-opacity-50 p-4 rounded-lg text-gray-400 "

            >

                <DropdownMenuItem
                    className='p-3 cursor-pointer'
                    onClick={onCopyLink} >
                    <Link2 className=' mr-2 h-4 w-4' />
                    Copy Board Link
                </DropdownMenuItem>
                <DropdownMenuItem
                    className='p-3 cursor-pointer'
                    onClick={()=>onOpen(id,title)} >
                    <Link2 className=' mr-2 h-4 w-4' />
                    Rename Board
                </DropdownMenuItem>
                <ConfirmModal

                    header='Delete Board'
                    description={`Are you sure you want to delete ${title}?`}
                    onConfirm={onDelete}
                    disabled={pending}
                >
                    <Button
                        className='p-3 cursor-pointer '
                    >
                        <Trash2 className=' mr-2 h-4 w-4' />
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>


    )
}

export default Actions
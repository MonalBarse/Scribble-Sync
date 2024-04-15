"use client"
import React from 'react'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react';
import { useApiMutation } from '@/hooks/useApiMutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
}

const NewBoardButton = ({
    orgId,
    disabled
}: NewBoardButtonProps) => {
    const router = useRouter()

    const { mutate, pending } = useApiMutation(api.board.create)
    
    const onClick=()=>{
        mutate({
            orgId: orgId,
            title: "Untitled!",
        }).then(
            (id) => {
                 toast.success("Board created successfully")
                // router.push(`/board/${id}`)
            }
        ).catch((err) => {
            return toast.error("Failed to create board")
        }
        )
    }

    return (
        <button
            disabled={pending || disabled}
            onClick={onClick}
            className={cn(
                "col-span-1 aspect-[100/127] bg-gray-800 rounded-md hover:bg-slate-600 flex flex-col items-center justify-center py-6",
                (disabled || pending) && 'opacity-75'
            )}
        >
            <div></div>
            <Plus className='h-12 w-12 text-white stroke-1' />
            <p className='text-white text-sm mt-2'>New Board</p>
        </button>
    )
}

export default NewBoardButton
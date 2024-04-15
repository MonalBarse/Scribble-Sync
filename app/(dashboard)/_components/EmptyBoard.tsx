"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api"
import React from 'react'

import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const EmptyBoard = () => {
    const router = useRouter()
    const { organization } = useOrganization()
    const { mutate, pending } = useApiMutation(api.board.create)
    const onClick = () => {
        if (!organization) return;

        mutate({
            orgId: organization.id,
            title: "Untitled!",
        }).then(
            (id) => {
                toast.success("Board created successfully")
                router.push(`/board/${id}`)
            }
        ).catch((err) => {
            return toast.error("Failed to create board")
        }
        )
    }
    return (
        <div
            className="flex flex-col h-full items-center justify-center"
        >
            <Image
                src="/Create.svg"
                alt="Empty Boards"
                width={320}
                height={300}
            ></Image>
            <h2
                className="text-2xl font-semibold mt-5 "
            >Create a new board to get started.
            </h2>
            <div className="mt-6">
                <Button
                    disabled={pending}
                    onClick={onClick}
                    className='bg-black hover:bg-gray-900  hover:border-black'>
                    Create Scribble Board
                </Button>
            </div>
        </div>
    )
}
export default EmptyBoard
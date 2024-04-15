"use client"

import { useRename } from "@/store/useRename"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog"
import {  FormEventHandler, useEffect, useState } from "react"
import { api } from "@/convex/_generated/api"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useApiMutation } from "@/hooks/useApiMutation"
import { toast } from "sonner"
  
export const RenameModal = () => {
    const{ isOpen, onClose, initialValues } = useRename()
    const [title, setTitle] = useState(initialValues.title)

    const {pending, mutate} = useApiMutation(api.board.update);


    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        mutate({id: initialValues.id, title}).then(() => {
            toast.success('Board Renamed')
            onClose()
        }).catch((e) => {
            console.error(e)
        })
    }

    return(
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
                className="border border-gray-900   bg-gray-800 bg-opacity-60 p-6 rounded-lg text-gray-300 "
                >
            <DialogHeader>
                <DialogTitle> Edit Board Title</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Enter a new title for the board
            </DialogDescription>
            <form onSubmit={onSubmit}
            className="space-y-4 mt-4 w-full"
            >
                <Input
                    disabled={pending}
                    style={{backgroundColor: 'transparent',
                    border: '1px solid #4B5563',

                    }}
                    required={true}
                    maxLength={50}
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a new title"

                ></Input>
            <DialogFooter >
                <DialogClose
                    asChild
                >
                    <Button
                        type="button"
                        variant={'secondary'}
                    >
                        Cancel
                    </Button>

                </DialogClose>
                <Button
                disabled={pending}
                    type="submit"
                    className="hover:bg-primary-green/70 hover:text-black transition-colors"
                >
                    Save
                </Button>

            </DialogFooter>
            </form>
        </DialogContent>
</Dialog>
    )
}

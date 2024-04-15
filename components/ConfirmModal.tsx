"use client"
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface ConfirmModalProps {
    children: React.ReactNode;
    header: string;
    description?: string;
    onConfirm: () => void;
    disabled?: boolean;
}

const ConfirmModal = ({
    children,
    header,
    description,
    onConfirm,
    disabled
}: ConfirmModalProps) => {
    return (
        <AlertDialog

        >
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent
                className="border-gray-900   bg-gray-800 bg-opacity-70 p-6 rounded-lg text-gray-400 "
            >
                <AlertDialogHeader>
                    <AlertDialogTitle>{header}</AlertDialogTitle>
                </AlertDialogHeader>
                {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={disabled} onClick={onConfirm} className='hover:bg-red-700/60'>Confirm</AlertDialogAction>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmModal
import React from 'react'
import { Plus } from 'lucide-react'
import { OrganizationProfile } from '@clerk/nextjs'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'


const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className='w-6 h-6 mr-2' />
                    Invite
                </Button>
            </DialogTrigger>
            <DialogContent
                className='p-0 bg-transparent border-none max-w-[880px]'
            >
                <OrganizationProfile />
            </DialogContent>

        </Dialog>
    )
}

export default InviteButton
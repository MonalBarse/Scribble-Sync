import React from 'react'

import Image from 'next/image'
import {Button} from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { CreateOrganization } from '@clerk/nextjs'
  

const EmptyOrg = () => {
    return (
        <div
            className='h-full flex flex-col items-center justify-center '
        >
            <Image
                src='/Emppty.svg'
                height={380}
                alt='empty org'
                width={422}

            ></Image>
            <h2 className="text-2xl font-semibold mt-5"
            >WELCOME TO SCRIBBLE SYNC</h2>
            <p className="text-gray-400 mt-5 text-base"
            >Create a new organization or select an existing one to get started.</p>
            <div className='mt-6'>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='bg-black hover:bg-gray-900  hover:border-black'>
                            Create Organization
                        </Button>

                    </DialogTrigger>
                    <DialogContent
                        className='p-0 bg-transparent border-none max-w-[480px]'
                    >
                    <CreateOrganization />
                    </DialogContent>
                </Dialog>
            </div>

        </div>
    )
}

export default EmptyOrg
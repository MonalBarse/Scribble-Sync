"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { OrganizationSwitcher } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button';
import { Presentation } from 'lucide-react';
import { useSearchParams } from 'next/navigation';


const OrgSidebar = () => {
  const searchParams = useSearchParams();
  
  return (
    <div
      className='hidden lg:flex flex-col space-y-5 w-[240px] m-0 pt-[21px] bg-black '
    >
      <Link href='/' >
        <div className='flex items-center pb-[11px] justify-center '>
          <Image src="/assets/Logo.png" height={58} width={160} alt="logo" />
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={
          {
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '5px',
              },
              organizationSwitcherTrigger: {
                padding: '5px',
                width: '80%',
                borderRadius: '5px',
                border: '1px solid #1F2937',
                justifyContent: 'space-between',
                backgroundColor: '#0d0f14',
              },
            }
          }
        }
      />
      <div
        className=' flex space-y-1 w-full justify-center'
      >
        <Button asChild
          className='justify-normal w-5/6 text-left hover:bg-gray-900/40'
          size={"lg"}>
          <Link href='/' className='text-gray-300'>
            <Presentation
              className='h-6 w-6 mr-2 text-gray-400 '
              size={24} />
            Team Boards
          </Link>
        </Button>

      </div>



    </div>
  )
}

export default OrgSidebar
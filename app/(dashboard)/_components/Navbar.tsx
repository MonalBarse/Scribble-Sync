"use client"
import React from 'react'
import { UserButton, OrganizationSwitcher, useOrganization } from '@clerk/nextjs'
import SearchInput from './SearchInput'
import InviteButton from './InviteButton'

const Navbar = () => {
    const { organization } = useOrganization()
    return (

        <div
            className='flex items-center gap-x-4 pr-5 pt-5 pb-5 pl-0 bg-black border-b border-gray-900'>

            <div className='hidden lg:flex lg:flex-1 '>
                {/* Add Search */}
                <SearchInput />
            </div>
            {organization && (<InviteButton />)}

            <UserButton />


        </div>
    )
}

export default Navbar
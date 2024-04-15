"use client"

import { useOrganizationList } from '@clerk/nextjs'
import Item from './Item'

const list = () => {
    const { userMemberships } = useOrganizationList(
        {
            userMemberships: {
                infinite: true
            }
        }
    )
    if (!userMemberships.data?.length) return null
    return (
        <ul className='space-y-3'>
            {userMemberships.data?.map(({ organization }) => (
                <Item id={organization.id} name={organization.name} imageUrl={organization.imageUrl} />
            ))}

        </ul>

    )
}

export default list
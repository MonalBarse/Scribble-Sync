"use client"
import React from 'react'
import EmptyOrg from './_components/EmptyOrg'
import { useOrganization } from '@clerk/nextjs'
import BoardList from './_components/BoardList'

interface dashboardPageProps {
  searchParams: {
    search?: string
  }
}

const DashboardPage = ({
  searchParams
}: dashboardPageProps) => {

  const { organization } = useOrganization()
  return (
    <div
      className='p-7 h-full '
    >      


      {!organization ? (<EmptyOrg />) : (
        <BoardList
          orgId={organization.id}
          query={searchParams} />
      )}

    </div>
  )
}

export default DashboardPage
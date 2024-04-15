import React from 'react'
import Sidebar from './_components/sidebar'
import OrgSidebar from './_components/OrgSidebar'
import Navbar from './_components/Navbar'


interface DashboardLayoutProps {
    children: React.ReactNode;
};


const DashBoardLayout = ({
    children
}: DashboardLayoutProps) => {
    return (
        <main className='h-full '>
            <Sidebar />
            <div className='pl-[80px] h-full'>
                <div className='flex  h-full'>
                    <OrgSidebar />
                    <div className='h-full flex-1'>
                        {/* NavBar */}
                        <Navbar />
                        {children}
                    </div>

                </div>
            </div>
        </main>
    )
}

export default DashBoardLayout
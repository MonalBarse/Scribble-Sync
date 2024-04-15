import React from 'react'
import NewButton from "./newButton"
import List from "./list"
import { LayoutDashboard } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside
        className='fixed z-[1] left-0 bg-black h-full border-r border-gray-800 w-[80px] flex p-4  flex-col gap-y-3'
    >
      <LayoutDashboard
        className='h-10 w-12 text-gray-400 mt-2 mb-5'
      ></LayoutDashboard>
        <List />
        <NewButton />
    </aside>
  )
}

export default Sidebar
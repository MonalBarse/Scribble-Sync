import React from 'react'
import {cn } from '@/lib/utils'

interface FooterProps {
  title: string;
  authorLable: string;
  createdAtLable: string;
  onclick: () => void;
  disabled: boolean;
}
const Footer = ({
  title,
  authorLable,
  createdAtLable,
  onclick,
  disabled
}: FooterProps) => {

  return (
    <div
      className='relative bg-transparent'
    >
      <p className='text-[15px] pl-5 pt-1 truncate max-w-[calc(100%-20px)]'>{title}</p>
      <p className='opacity-0  pl-5 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate'
      >{authorLable}, {createdAtLable}</p>
    </div>
  )
}

export default Footer
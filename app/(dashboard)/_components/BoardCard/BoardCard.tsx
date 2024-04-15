"use client"
import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { formatDistanceToNow } from 'date-fns'
import Footer from './Footer'
import Image from 'next/image'
import Link from 'next/link'
import Overlay from './Overlay';
import { useAuth } from '@clerk/nextjs'
import Actions from '@/components/Actions'
import { MoreHorizontal } from 'lucide-react'

interface BoardCardProps {
  title: string;
  id: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;


}
const BoardCard = (
  {
    id,
    title,
    authorName,
    authorId,
    createdAt,
    imageUrl,
    orgId
  }: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLable = userId === authorId ? "You" : authorName;
  const createdAtLable = formatDistanceToNow(createdAt, {
    addSuffix: true
  })
  return (
    <Link href={`/board/${id}`}
    >
      <div className='group aspect-[100/127]  border border-gray-600 rounded-md flex flex-col justify-between overflow-hidden'>
        <div className='relative flex-1 bg-gray-900/50'
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className='object-fit'
          />
          <Overlay />
          <Actions title={title} id={id} side='right'>
            <button className='absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'
            >
              <MoreHorizontal
                className='text-white opacity-80 hover:opacity-100 transition-opacity'
              > </MoreHorizontal>
            </button>
          </Actions>
        </div>
        <Footer
          title={title}
          authorLable={authorLable}
          createdAtLable={createdAtLable}
          onclick={() => { }}
          disabled={false}
        />
      </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className='aspect-[100/127]  rounded-md  justify-between overflow-hidden'>
      <Skeleton className='bg-gray-900 h-full w-full' />
      <div className='relative bg-transparent'>
        <Skeleton className='p-1' />
        <Skeleton className='opacity-0 group-hover:opacity-100 transition-opacity' />
      </div>
    </div>
  )
}

export default BoardCard
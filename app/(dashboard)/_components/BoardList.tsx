"use client"
import React from 'react';
import Image from 'next/image';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import EmptySearch from './EmptySearch';
import EmptyBoard from './EmptyBoard';
import BoardCard from './BoardCard/BoardCard';
import NewBoardButton from './NewBoardButton';

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
    };
}

const BoardList = ({ orgId, query }: BoardListProps) => {

    // const data = [];
    const data = useQuery(api.boards.get, { orgId, search: query.search});
    if (data === undefined) {
        return <div className="flex flex-col h-full items-center justify-center">
            <Image
                src="/Loading.svg"
                alt="Loading"
                width={320}
                height={300}
            />
            <h1 className="text-2xl font-semibold mt-5 ">Loading</h1>
        </div>
    }/* There can be no 'data' is 'undefined' as convex will return null only case when data is undefined is when Content is loading */

    if (query.search && !data?.length) {
        return (
            <div className='h-full'>
                <EmptySearch />
            </div>
        );
    }
    if (!data?.length) {
        return (
            <div className='h-full'>
                <EmptyBoard />
            </div>
        );
    }

    return (
        <div>
            <h2 className='text-3xl'>
                {query ? "Scribble Boards" : " Scribble Boards"}
            </h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
                <NewBoardButton
                    orgId={orgId}
                    disabled={false}
                />
                {data?.map((board: any) => (
                    <BoardCard  
                        key={board._id}
                        id={board._id}
                        title={board.title}
                        imageUrl={board.imageUrl}
                        authorName={board.authorName}
                        authorId={board.authorId}
                        createdAt={board._creationTime}
                        orgId={board.orgId}
                    />
                ))
                }
            </div>
        </div>
    );
};

export default BoardList;

import Image from "next/image";
import React from 'react'

const EmptySearch = () => {
  return (
    <div
        className="flex flex-col h-full items-center justify-center"
    >
        <Image
            src="/Nothing.svg"
            alt="Empty search"
            width={320}
            height={300}
        ></Image>
        <h2 
        className="text-2xl font-semibold mt-5 "
        >
            No results found
        </h2>
        <p className="text-gray-400 mt-2 text-base">
            We couldn't find any results for your search. Try searching for something else.
        </p>
    </div>
  )
}

export default EmptySearch
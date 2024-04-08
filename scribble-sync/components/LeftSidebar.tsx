"use client";

import { useMemo } from "react";
import Image from "next/image";
import { getShapeInfo } from "@/lib/utils";


const LeftSidebar = () => {
  return (
    <section className="flex flex-col border-r border-gray-800 bg-primary-black text-primary-grey-300 min-w-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto pb-20">
      <h3 className="border-b border-primary-grey-200 px-5 py-4 text-xs uppercase">
            Layers
        </h3>
    </section>
  )
}

export default LeftSidebar
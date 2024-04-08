"use client";

import Image from "next/image";
import { memo } from "react";
import { ActiveElement, NavbarProps } from "@/types/type";
import ActiveUsers from "./users/ActiveUsers";
import { navElements } from "@/constants";
const Navbar = ({ activeElement }: NavbarProps) => {
  return (
    <nav className="flex select-none items-center justify-between gap-4 px-6 text-white bg-primary-black border-b border-gray-800">
      <Image src="/assets/Logo.png" height={58} width={130} alt="logo" />
      <ul className="flex flex-row">
        {navElements.map((element: ActiveElement | any) => (
          <li
            key={element.id}
            className={`cursor-pointer ${
              activeElement === element.id ? "text-primary-blue" : ""
            }`}
          >
            {Array.isArray(element.value)?(
              // <ShapesMenu />
              <></>
            ):
              element?.value === 'comments'? (
                <NewThread></NewThread>
              ):(
                <button
                  className=""
                  >Hi</button>
              )
              
              }
            

          </li>
        ))}
      </ul>
      <ActiveUsers />
    </nav>
  );
};

export default memo(
  Navbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
);

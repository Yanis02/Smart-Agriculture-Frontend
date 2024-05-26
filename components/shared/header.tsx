"use client";

import React from "react";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { User } from "@/app/typings/authForms";
import useScroll from "@/hooks/useScroll";

const Header = ({ user }: { user: User | null }) => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        }
      )}
    >
      <div className="flex h-[2.97rem] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <p className="  text-primary text-3xl font-extrabold ">
              Welcome Farmer
            </p>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-8 w-8 overflow-hidden rounded-full relative bg-zinc-300 flex items-center justify-center text-center">
            {user ? (
              <img
                alt="user image"
                src={
                    `https://ui-avatars.com/api/?name=${user.fullname}`
                }
              />
            ) : (
              <span className="font-semibold text-sm">HQ</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
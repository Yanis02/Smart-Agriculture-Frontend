"use client";


import { Cow } from "@/app/typings/myfarm";
import { ColumnDef } from "@tanstack/react-table";

import { useRouter } from "next/navigation";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { RxCaretSort } from "react-icons/rx";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const AdminCowsColumns = (): ColumnDef<Cow>[] => {
  const router = useRouter();

  const columns: ColumnDef<Cow>[] = [
    {
      accessorKey: "cow_id",
      header: "Cow ID",
      cell: ({ row }) => {
        const cow = row.original;
        return <div className="capitalize">{cow.cow_id}</div>;
      },
    },
    {
        accessorKey: "health_status",
        header: "Health status",
        cell: ({ row }) => {
          const cow = row.original;
          return <div className={cow.health_status==="Critical" ? "text-[#FF0033]" : "text-black"}>{cow.health_status}</div>;
        },
      },
    

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const cow = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <HiMiniEllipsisHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(cow.cow_id.toString())
                }
              >
                Copy Cow ID
              </DropdownMenuItem>
              <DropdownMenuItem 
              onClick={
                ()=>
                    router.push(`/admin/cows/${cow.cow_id}`)
            }>
                View cow's activity
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};

export default AdminCowsColumns;
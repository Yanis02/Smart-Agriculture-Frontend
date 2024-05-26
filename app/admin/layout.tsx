
import { Metadata } from "next";
import React from "react";
import { ReactNode } from "react";
import { SideNavItem } from "../typings/authForms";
import SideNav from "@/components/shared/sideNave";
import { MdAgriculture, MdDashboard, MdPerson, MdReportProblem, MdSettings } from "react-icons/md";
import { FaBox, FaFolder, FaUser } from "react-icons/fa";
import { ImProfile, ImStatsDots } from "react-icons/im";
import MarginWidthWrapper from "@/components/shared/marginWidthWrapper";
import HeaderUserActions from "@/components/shared/headerUserActions";
import HeaderMobile from "@/components/shared/headerMobile";
import PageWrapper from "@/components/shared/pageWrapper";
import { AlertCircleIcon } from "lucide-react";
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ADMIN_SIDENAV_ITEMS: SideNavItem[] = [
    
    {
      title: "My Farm",
      path: "/admin/myfarm",
      icon: React.createElement(MdAgriculture),
    },
    {
      title: "Alerts",
      path: "/admin/alerts",
      icon: React.createElement(AlertCircleIcon),
    },
    {
      title: "profile",
      path: "/admin/profile",
      icon: React.createElement(MdPerson),
    },
  ];
  
  return (
    <div className="flex">
      <SideNav items={ADMIN_SIDENAV_ITEMS} />
      <main className="flex-1">
        <MarginWidthWrapper>
          <HeaderUserActions />
          <HeaderMobile items={ADMIN_SIDENAV_ITEMS} />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
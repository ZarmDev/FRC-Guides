"use client";

import { AppSidebar } from "@/components/app-sidebar"
import Navbar from "@/components/navbar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

export default function MainApp(props: any) {
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar();

    return (
        <div>
            <Navbar />
            {!isMobile ? <AppSidebar /> : <></>}
            {isMobile ? <SidebarTrigger className="fixed mt-[25vh]" /> : <></>}
            {props.children}
        </div>
    )
}
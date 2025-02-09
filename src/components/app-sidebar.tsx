"use client";

import { usePathname } from 'next/navigation'
import getItems from '../lib/items'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

export function AppSidebar() {
    const pathname = usePathname();
    const items = getItems(pathname);

    return (
        <>
            <div>
                {items.length != 0 && (<Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            {/* <SidebarGroupLabel>{pathname.slice(1)}</SidebarGroupLabel> */}
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url}>
                                                    {/* TODO: Add if you want icons! */}
                                                    {/* {item.icon != null ? <item.icon /> : <></>} */}
                                                    <span>{item.title.replace('-', ' ')}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>)}
            </div>
        </>
    );
}

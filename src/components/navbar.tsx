"use client";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarBrand
} from "@heroui/navbar";

import {
  Link
} from "@heroui/link";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { useState } from 'react';

import ThemeToggle from "./ui/themetoggle";

function Team334() {
  return (
    <img className="w-10 h-10 cursor-pointer rounded-xl hover:opacity-50 duration-500" onClick={() => {
      window.location.href = "https://github.com/Team334";
    }} src="https://avatars.githubusercontent.com/u/16625427?s=200&v=4"></img>
  )
}

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Link color="foreground" href="/">
          <b>FRC-Guides</b>
        </Link>
                    <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                                <Button
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        radius="sm"
                      >
                        Guides on third party libraries
                      </Button>
                        </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu aria-label="Static Actions"
            itemClasses={{
              base: "gap-4",
            }}>
                            <DropdownItem key="Phoenix6" href="/Phoenix6">Phoenix6</DropdownItem>
<DropdownItem key="PhotonVision" href="/PhotonVision">PhotonVision</DropdownItem>
                        </DropdownMenu>
                </Dropdown><NavbarItem>
                    <Link color="foreground" href="/Getting-started">
                        Getting started
                    </Link>
                </NavbarItem></NavbarContent>
<NavbarContent>
            <ThemeToggle></ThemeToggle>
            <NavbarBrand>
        <Team334 />
      </NavbarBrand>
      </NavbarContent>
            <NavbarMenu><NavbarMenuItem key="Phoenix6">
            <Link
              className="w-full"
              href="Phoenix6"
              size="lg"
            >
              Phoenix6
            </Link>
          </NavbarMenuItem><NavbarMenuItem key="PhotonVision">
            <Link
              className="w-full"
              href="PhotonVision"
              size="lg"
            >
              PhotonVision
            </Link>
          </NavbarMenuItem><NavbarMenuItem key="Getting started">
            <Link
              className="w-full"
              href="Getting-started"
              size="lg"
            >
              Getting started
            </Link>
          </NavbarMenuItem></NavbarMenu>
        </Navbar>
    )
}
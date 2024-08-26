"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "@nextui-org/card";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

export function SidebarMenu() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    // <div
    //   className={cn(
    //     "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
    //     "h-[60vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
    //   )}
    // >
    <Sidebar open={open} setOpen={setOpen} animate={false}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <>
            <Logo />
          </>
          <div className="mt-8 flex flex-col gap-2 p-2">
            {/* {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))} */}
            <Card className="p-2">
              <Accordion isCompact defaultExpandedKeys={["1"]}>
                <AccordionItem
                  key="1"
                  aria-label="Accordion 1"
                  title="Kategori"
                >
                  <div className="flex flex-wrap gap-2">
                    <div className="border p-1 text-xs text-slate-500">
                      Fantasi
                    </div>
                    <div className="border p-1 text-xs text-slate-500">
                      Petualang
                    </div>
                    <div className="border p-1 text-xs text-slate-500">
                      Religi
                    </div>
                    <div className="border p-1 text-xs text-slate-500">
                      Hukum
                    </div>
                    <div className="border p-1 text-xs text-slate-500">
                      Motivasi
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </Card>
            <Card className="p-2">
              <Accordion isCompact defaultExpandedKeys={["1"]}>
                <AccordionItem key="1" aria-label="Accordion 1" title="Penulis">
                  <div className="flex flex-wrap gap-2">
                    <div className="border p-1 text-xs text-slate-500">
                      KH Taufiqul Hakim
                    </div>
                    <div className="border p-1 text-xs text-slate-500">
                      Tere liye
                    </div>
                    <div className="border p-1 text-xs text-slate-500">
                      Andrea Hirata
                    </div>
                    <div className="border p-1 text-xs text-slate-500">
                      Eka Kurniawan
                    </div>
                    <div className="border p-1 text-xs text-slate-500">
                      Ahmad Fuadi
                    </div>
                    <div className="border p-1 text-xs text-slate-500">
                      Ayu Utami
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </Card>
            <Card className="p-2">
              <Accordion isCompact defaultExpandedKeys={["1"]}>
                <AccordionItem
                  key="1"
                  aria-label="Accordion 1"
                  title="Penerbit"
                >
                  <div className="flex flex-wrap gap-2">
                    <div className="border p-1 text-xs text-slate-500">
                      Percetakan Amtsilati
                    </div>
                    <div className="border p-1 text-xs text-slate-500">
                      Gramedia
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "Manu Arora",
              href: "#",
              icon: (
                <Image
                  src="https://assets.aceternity.com/manu.png"
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
    //   {/* <Dashboard /> */}
    // </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Amtsilati Store
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

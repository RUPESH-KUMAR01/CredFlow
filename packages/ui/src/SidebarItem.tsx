"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;

    return (
        <div 
            className={`flex items-center rounded-lg mx-3 my-1 px-4 py-3 cursor-pointer transition-all duration-200 ${
                selected 
                    ? "bg-slate-100 text-black" 
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            }`} 
            onClick={() => {
                router.push(href);
            }}
        >
            <div className="mr-3 text-lg">
                {icon}
            </div>
            <div className="font-medium">
                {title}
            </div>
        </div>
    );
};
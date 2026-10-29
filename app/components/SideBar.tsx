'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
const [isOpen, setIsOpen] = useState(false);
const pathname = usePathname();
const closeSidebar = () => {
    setIsOpen(false);
};

return (
    <>
        {/* Mobile header */}
        <header className="fixed left-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white px-4 shadow-sm lg:hidden">

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Zatvori navigaciju" : "Otvori navigaciju"}
                aria-expanded={isOpen}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-zinc-800 transition hover:bg-zinc-100"
            >
                {isOpen ? "✕" : "☰"}
            </button>

            <span className="text-lg font-bold text-zinc-900">
                Početna strana
            </span>

            <div className="w-10" />

        </header>

        {/* Mobile overlay */}
        {isOpen && (
            <button
                type="button"
                aria-label="Zatvori navigaciju"
                onClick={closeSidebar}
                className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />
        )}

        {/* Sidebar */}
        <aside
            className={`fixed left-0 top-0 z-50 flex h-dvh w-[260px] flex-col border-r border-zinc-200 bg-olive-900 text-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >

            {/* User profile */}
            <div className="flex shrink-0 items-center gap-3 border-b border-white/20 p-6">

                <Image
                    className="rounded-full border-2 border-violet-200 object-cover"
                    alt="Profilna slika korisnika"
                    src="/user.jpg"
                    width={44}
                    height={44}
                />

                <div className="flex min-w-0 flex-col">
                    <h2 className="truncate font-semibold text-white">
                        USER123
                    </h2>

                    <span className="text-xs text-zinc-300">
                        Korisnički nalog
                    </span>
                </div>

            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">

                <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Navigacija
                </p>

                <ul className="flex flex-col gap-2">

                        <li>
                            <Link
                                href="/mainPage"
                                onClick={closeSidebar}
                                className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition duration-200 ${
                                    pathname === "/mainPage"
                                        ? "bg-violet-600 text-white shadow-md"
                                        : "text-white hover:bg-white hover:text-violet-700"
                                }`}
                            >
                                <span className="text-xl">⌂</span>
                                Početna strana
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/dataPage"
                                onClick={closeSidebar}
                                className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition duration-200 ${
                                    pathname === "/dataPage"
                                        ? "bg-violet-600 text-white shadow-md"
                                        : "text-white hover:bg-white hover:text-violet-700"
                                }`}
                            >
                                <span className="text-xl">▣</span>
                                Aktivna zaduženja
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/ppPage"
                                onClick={closeSidebar}
                                className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition duration-200 ${
                                    pathname === "/ppPage"
                                        ? "bg-violet-600 text-white shadow-md"
                                        : "text-white hover:bg-white hover:text-violet-700"
                                }`}
                            >
                                <span className="text-xl">♧</span>
                                Kontakti
                            </Link>
                        </li>

                    </ul>
            </nav>

            {/* Logout */}
            <div className="shrink-0 border-t border-white/20 p-4">

                <button
                    type="button"
                    onClick={closeSidebar}
                    className="h-11 w-full rounded-lg border border-zinc-200 bg-white font-semibold text-zinc-700 transition duration-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 active:scale-[0.98]"
                >
                    Odjava
                </button>
                {/* <p className="text-gray-700 font-semibold text-xs">Developed by:<span className="text-xs text-violet-700">SPARDA SYSTEMS</span></p> */}
            </div>

        </aside>
    </>
);
};

export default Sidebar;

import Image from "next/image"

const Sidebar = () =>{
return(
      <aside className="fixed left-0 top-0 flex h-screen w-[260px] flex-col border-r border-zinc-200 text-white bg-olive-900 shadow-sm">

                {/* User profile */}
                <div className="flex items-center gap-3 border-b border-zinc-200 p-6 text-white">
                    <Image
                        className="rounded-full border-2 border-violet-200"
                        alt="user-image"
                        src="/user.jpg"
                        width={44}
                        height={44}
                    />

                    <div className="flex flex-col text-white">
                        <h2 className="font-semibold text-white">
                            USER123
                        </h2>
                        <span className="text-xs text-zinc-500">
                            Korisnički nalog
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 text-white">
                    <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Navigacija
                    </p>

                    <ul className="flex flex-col gap-2">

                        <li>
                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-lg bg-violet-600 px-4 py-3 font-medium text-white shadow-md transition duration-200 hover:bg-violet-700"
                            >
                                <span>⌂</span>
                                Početna strana
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition text-white duration-200 hover:bg-violet-50 hover:text-violet-700"
                            >
                                <span>▣</span>
                                Aktivna zaduženja
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-white transition duration-200 hover:bg-violet-50 hover:text-violet-700"
                            >
                                <span>♧</span>
                                Poslovni partneri
                            </a>
                        </li>

                    </ul>
                </nav>

                {/* Logout */}
                <div className="border-t border-zinc-200 p-4">
                    <button
                        type="button"
                        className="h-11 w-full rounded-lg border border-zinc-200 bg-white font-semibold text-zinc-600 transition duration-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 active:scale-[0.98]"
                    >
                        Odjava
                    </button>
                </div>

            </aside>
)
}
export default Sidebar
'use client';

import Sidebar from "../components/SideBar";

const PP = () => {
return ( <div className="min-h-screen w-full bg-zinc-50 font-sans text-zinc-900"> <Sidebar />

        <main className="min-h-screen w-full px-4 pb-6 pt-20 sm:px-6 lg:ml-[260px] lg:w-[calc(100%-260px)] lg:p-8">

            {/* Search input + button */}
            <div className="mb-6 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                <input
                    type="text"
                    placeholder="Pretraži poslovne partnere..."
                    className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />

                <button
                    type="button"
                    className="h-11 shrink-0 rounded-lg bg-violet-600 px-5 font-medium text-white transition hover:bg-violet-700 active:scale-[0.98]"
                >
                    + Dodaj kontakt
                </button>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
                <table className="w-full min-w-[600px] text-left text-sm">

                    <thead className="bg-zinc-100 text-xs uppercase tracking-wider text-zinc-600">
                        <tr>
                            <th className="px-6 py-4 font-semibold">
                                Naziv kontakta
                            </th>
                            <th className="px-6 py-4 font-semibold">
                                Broj telefona
                            </th>
                            <th className="px-6 py-4 font-semibold">
                                Status poslate poruke
                            </th>
                            <th className="px-6 py-4 text-right font-semibold">
                                Detalji
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-200">
                        <tr className="transition hover:bg-zinc-50">
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-zinc-900">
                                TEST1
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 text-zinc-600">
                                063434334
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                    Poslato
                                </span>
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                <button
                                    type="button"
                                    className="rounded-lg bg-violet-600 px-4 py-2 font-medium text-white transition hover:bg-violet-700 active:scale-[0.98]"
                                >
                                    Detalji
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </main>
    </div>
);
};
export default PP;

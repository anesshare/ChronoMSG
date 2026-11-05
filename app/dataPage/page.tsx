'use client';

import { useEffect, useState } from "react";
import { Transaction } from "../types";
import Sidebar from "../components/SideBar";
import axios from "axios";
import { Trash2 } from "lucide-react";

const DataPage = () => {
    const [transData, setTransData] = useState<Transaction[]>([]);

    const deleteTransaction = async (id: number) => {
        try {
            await axios.delete(`/dataPage/api/`, { params: { id } });
            getTransData(); // Osveži podatke nakon brisanja
        } catch (error) {
            console.error("Greška pri brisanju transakcije: ", error);
        }
    };

    const getTransData = async () => {
        try {
            const res = await axios.get("/dataPage/api");
            setTransData(res.data.data);
        } catch (error) {
            console.error("Greška pri preuzimanju transakcija: ", error);
        }
    };

    useEffect(() => {
        getTransData();
    }, []);

    return (
        <div className="min-h-screen w-full bg-zinc-50 font-sans text-zinc-900 flex flex-col lg:flex-row">
            <Sidebar />

            {/* Main content */}
            <main className="min-h-screen w-full flex-1 px-4 pb-8 pt-20 sm:px-6 lg:ml-[260px] lg:w-[calc(100%-260px)] lg:p-8">
                <div className="mx-auto max-w-6xl">
                    
                    {/* Page header */}
                    <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                                Evidencija dugovanja
                            </h1>
                            <p className="mt-1 text-sm text-zinc-500 sm:text-base">
                                Pregled svih unetih zaduženja i statusa slanja poruka.
                            </p>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-zinc-50 text-zinc-600 border-b border-zinc-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">ID</th>
                                        <th className="px-6 py-4 font-semibold">Ime dužnika</th>
                                        <th className="px-6 py-4 font-semibold">Telefon</th>
                                        <th className="px-6 py-4 font-semibold">Iznos</th>
                                        <th className="px-6 py-4 font-semibold">Početak</th>
                                        <th className="px-6 py-4 font-semibold">Kraj</th>
                                        <th className="px-6 py-4 font-semibold text-center">Poruka poslata</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-zinc-200">
                                    {transData.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-8 text-center text-zinc-500">
                                                Nema unetih zaduženja.
                                            </td>
                                        </tr>
                                    ) : (
                                        transData.map((item, index) => (
                                            <tr key={item.id || index} className="transition hover:bg-zinc-50/80">
                                                <td className="px-6 py-4 text-zinc-600 font-medium">
                                                    {item.id}
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-zinc-900">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4 text-zinc-600">
                                                    {item.number}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-zinc-900">
                                                    {item.trans_value} RSD
                                                </td>
                                                <td className="px-6 py-4 text-zinc-600">
                                                    {new Date(item.start_date).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-zinc-600">
                                                    {new Date(item.end_date).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="inline-flex items-center gap-3">
                                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                                            item.active ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                                        }`}>
                                                            {item.active ? "Da" : "Ne"}
                                                        </span>
                                                        <button 
                                                            className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-rose-50 hover:text-rose-600"
                                                            onClick={() => deleteTransaction(item.id)}
                                                            title="Obriši zaduženje"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default DataPage;
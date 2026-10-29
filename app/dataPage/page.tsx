'use client';

import { useEffect, useState } from "react";
import { Transaction } from "../types";
import Sidebar from "../components/SideBar";
import axios from "axios";
import { Trash2 } from "lucide-react"

const DataPage = () => {
    const [transData, setTransData] = useState<Transaction[]>([]);

    const getTransData = async () => {
        try {
            const res = await axios.get("/dataPage/api");
            console.log(res.data.data);
            setTransData(res.data.data);
        } catch (error) {
            console.error("Greška pri preuzimanju transakcija: ", error);
        }
    };

    useEffect(() => {
        getTransData();
    }, []);

   return (
        <div className="min-h-screen bg-gray-100 p-6 pt-20 lg:ml-[260px] lg:w-[calc(100%-260px)] lg:p-10">
            <Sidebar />
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Evidencija dugovanja
                </h1>

                <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Ime dužnika</th>
                                <th className="px-6 py-4 font-semibold">Telefon</th>
                                <th className="px-6 py-4 font-semibold">Iznos</th>
                                <th className="px-6 py-4 font-semibold">Početak</th>
                                <th className="px-6 py-4 font-semibold">Kraj</th>
                                <th className="px-6 py-4 font-semibold">Poruka nezavršena</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {transData.map((item, index) => (
                                <tr key={item.id || index} className="transition hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {item.number}
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {item.trans_value} RSD
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {new Date(item.start_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {new Date(item.end_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            item.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        }`}>
                                            {item.active ? "Da" : "Ne"}
                                        </span>
                                        <button className="ml-2 text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataPage;
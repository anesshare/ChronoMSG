'use client';

import Sidebar from "../components/SideBar";

const dataPage = () => {
return ( 
        <div className="min-h-screen bg-gray-100 p-6 pt-20 lg:ml-[260px] lg:w-[calc(100%-260px)] lg:p-10">
                 <Sidebar/>
            <div className="mx-auto max-w-6xl">
            <h1 className="mb-6 text-2xl font-bold text-gray-800">
                Evidencija dugovanja
            </h1>

            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Ime dužnika</th>
                            <th className="px-6 py-4 font-semibold">Iznos</th>
                            <th className="px-6 py-4 font-semibold">Datum</th>
                            <th className="px-6 py-4 font-semibold">Aktivan dug</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        <tr className="transition hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-800">
                                Marko Marković
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                                15.000 RSD
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                                12.10.2026.
                            </td>
                            <td className="px-6 py-4">
                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                    Da
                                </span>
                            </td>
                        </tr> 
                    </tbody>
                </table>
            </div>

        </div>
    </div>
);
};

export default dataPage;

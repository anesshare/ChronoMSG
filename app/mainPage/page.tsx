'use client'
import { useState,useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/SideBar";
const MainPage = () => {

const [userData,setUserData ]= useState<string>("")
const [number,setNumber] = useState<string>("")
const [val,setVal] = useState<number>(0)
const [startDate,setStartDate] = useState<string>("")
const [endDate ,setEndDate] = useState<string>("")

const sendData = async (e: any) => {
    e.preventDefault();
    if (!userData || !number || !val) {
        alert("Molimo Vas da popunite sva obavezna polja (userData, number, val)!");
        return; 
    }

    try {
        const res = await axios.post('/mainPage/api', {
            username: userData,
            number: number,
            val: val,
            startDate: startDate,
            endDate: endDate
        });
        
        alert("Zaduženje je uspešno dodato!");
    } catch (error) {
        console.error("Greška prilikom dodavanja zaduženja:", error);
    }
};

useEffect(() => {
    const today = new Date();

    const start = today.toISOString().split("T")[0];

    setStartDate(start);

    const futureDay = new Date(today);
    futureDay.setDate(futureDay.getDate() + 33);

    setEndDate(futureDay.toISOString().split("T")[0]);
}, []);

return ( <div className="min-h-screen w-full bg-zinc-50 font-sans text-zinc-900">
        <Sidebar />
        {/* Main content */}
        <main className="min-h-screen w-full px-4 pb-6 pt-20 sm:px-6 lg:ml-[260px] lg:w-[calc(100%-260px)] lg:p-8">

            {/* Page header */}
            <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                        Početna strana
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500 sm:text-base">
                        Upravljajte svojim zaduženjima na jednom mestu.
                    </p>
                </div>
            </div>

            {/* Main card */}
            <section className="w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition duration-200 hover:shadow-md sm:p-6 lg:p-8">

                <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl">
                    Unesite zaduženje
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                    Popunite podatke za novo zaduženje.
                </p>

                {/* Form */}
               <form onSubmit={sendData} className="mt-6 w-full rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">

                {/* Ime i prezime */}
                <div className="flex min-w-0 flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-700">
                        Ime i prezime dužnika
                    </label>

                    <input
                        onChange={(e)=>setUserData(e.target.value)}
                        type="text"
                        placeholder="Unesite ime i prezime"
                        className="h-11 w-full min-w-0 rounded-lg border border-zinc-300 bg-zinc-50 px-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-200"
                    />
                </div>

                {/* Broj telefona */}
                <div className="flex min-w-0 flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-700">
                        Broj telefona
                    </label>

                    <input
                        onChange={(e)=>setNumber(e.target.value)}
                        type="tel"
                        placeholder="06x xxx xxxx"
                        className="h-11 w-full min-w-0 rounded-lg border border-zinc-300 bg-zinc-50 px-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-200"
                    />
                </div>

                {/* Iznos zaduženja */}
                <div className="flex min-w-0 flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-700">
                        Iznos zaduženja
                    </label>

                    <input
                        onChange={(e)=>setVal(Number(e.target.value))}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0,00"
                        className="h-11 w-full min-w-0 rounded-lg border border-zinc-300 bg-zinc-50 px-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-200"
                    />
                </div>

                {/* Datum početka */}
                <div className="flex min-w-0 flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-700">
                        Datum početka
                    </label>

                    <input
                        value={startDate}
                        onChange={(e)=>setStartDate(e.target.value)}
                        type="date"
                        className="h-11 w-full min-w-0 rounded-lg border border-zinc-300 bg-zinc-50 px-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-200"
                    />
                </div>

                {/* Datum isteka */}
                <div className="flex min-w-0 flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-700">
                        Datum isteka
                    </label>

                    <input
                        value={endDate}
                        onChange={(e)=>setEndDate(e.target.value)}
                        type="date"
                        className="h-11 w-full min-w-0 rounded-lg border border-zinc-300 bg-zinc-50 px-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-200"
                    />
                </div>
                {/* Dugme */}
                <div className="flex flex-col justify-end">
                    <button
                        type="submit"
                        className="inline-flex h-11 w-full items-center justify-center whitespace-nowrap rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md active:scale-[0.98]"
                    >
                        + Dodaj zaduženje
                    </button>
                </div>

                            </div>
                            </form>
                        </section>
                    </main>
                </div>
            );
            };

export default MainPage;

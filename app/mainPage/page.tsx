import Image from "next/image";
import Sidebar from "../components/SideBar";
const MainPage = () => {
    return (
        <div className="min-h-screen w-full flex bg-zinc-50 font-sans text-zinc-900">

            <Sidebar/>

            {/* Main content */}
            <main className="ml-[260px] min-h-screen flex-1 p-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                        Početna strana
                    </h1>

                     <button
                        type="button"
                        className="mt-5 h-11 rounded-lg bg-violet-600 px-6 font-semibold text-white shadow-md transition duration-200 hover:bg-violet-700 hover:shadow-lg active:scale-[0.98]"
                    >
                     Dodaj zaduženje   
                    </button>
                </div>

                {/* Example card */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md">
                    <h2 className="text-lg font-semibold text-zinc-900">
                        Unesite zaduzenje
                    </h2>
                <form className="flex w-full max-w-md flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl sm:p-10">

                </form>
                    
                </div>
            </main>
        </div>
    );
};

export default MainPage;

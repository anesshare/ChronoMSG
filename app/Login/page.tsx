'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginPage = () => {
  const [user, setUser] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()

  const submitLogin = async(e:any)=>{
    e.preventDefault()
    try{
    const res = await axios.post("/login/api",{
      username:user,
      password:password
    })
    res.data
    router.push("/mainPage")
  }catch(error){
    console.log("Greska prilikom logovanja:" ,error)
  }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 font-sans text-zinc-900">

      <h1 className="mb-8 text-3xl font-light tracking-widest text-zinc-800">
        SANDZAKTRANS <span className="font-bold text-violet-600">IS</span>
      </h1>

      <form onSubmit={submitLogin} className="flex w-full max-w-md flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl sm:p-10">

        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-800">
            Prijava
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Prijavite se
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">
            Korisničko ime
          </label>

          <input
            type="text"
            placeholder="Unesite korisničko ime"
            className="h-11 w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700">
            Lozinka
          </label>

          <input
            type="password"
            placeholder="Unesite lozinku"
            className="h-11 w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-2 h-11 w-full rounded-lg bg-violet-600 font-semibold text-white shadow-md transition duration-200 hover:bg-violet-700 hover:shadow-lg active:scale-[0.98]"
        >
          POTVRDI
        </button>

        <p className="text-center text-sm text-zinc-500">
          Nemate nalog?{' '}
          <span className="cursor-pointer font-semibold text-violet-600 transition hover:text-violet-800">
            <Link href="/register">Registrujte se!</Link>
          </span>
        </p>

      </form>

      <p className="mt-8 text-xs text-zinc-400">
        © 2026 SANDZAKTRANS IS. Sva prava zadržana.
      </p>

    </div>
  )
}

export default LoginPage
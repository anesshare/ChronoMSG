import { pool } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try{
        const res = await pool.query("SELECT * from active_trans")
        return NextResponse.json({success:true,data:res.rows})
    }catch(error){
        console.error("Greska prilikom ucitavanja podataka!",error)
    }
}
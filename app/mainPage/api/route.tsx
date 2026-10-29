import { pool } from "@/app/lib/db";
import { Transaction } from "@/app/types";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const body = await req.json()
    const newTransaction:Transaction = body || {};
   try{
         const res = await pool.query("INSERT into active_trans (name,number,trans_value,start_date,end_date,active) VALUES ($1,$2,$3,$4,$5,$6)",
        [newTransaction.name,newTransaction.number,newTransaction.trans_value,newTransaction.start_date,newTransaction.end_date,true])
        return NextResponse.json({success:true,message:"Uspesno kreirano zaduzenje!"})
   }catch(error){
        console.error("Greska prilikom dodavanja zaduzenja: ",error)
        return NextResponse.json({message:"Greska prilikom dodavanja zaduzenja"})
   }
}
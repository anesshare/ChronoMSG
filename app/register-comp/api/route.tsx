import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { User } from "@/app/types";

export async function POST(request: Request) {
    try {
        const body = await request.json();    
        const newUser:User = body || {};
        const hashed = await bcrypt.hash(newUser.password,10)

        if (!newUser.username || !newUser.password || !newUser.number) {
            return NextResponse.json({ error: "Nedostaju obavezni podaci!" }, { status: 400 });
        }

        await pool.query(
            `INSERT INTO users (username, password, number) VALUES ($1, $2, $3)`, 
            [newUser.username, hashed, newUser.number]
        );

        return NextResponse.json({ success: true, message: "Uspesno registrovan korisnik!" });
    } catch (error: any) {
        console.error("Greška pri upisu u bazu:", error);
        return NextResponse.json({ error: error.message || "Greška na serveru!" }, { status: 500 });
    }
}
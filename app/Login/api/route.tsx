import { pool } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, password } = body || {};

        if (!username || !password) {
            return NextResponse.json({ success: false, error: "Nedostaju podaci!" }, { status: 400 });
        }

        const userData = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = userData.rows[0];

        if (!user) {
            return NextResponse.json({ success: false, error: "Korisnik ne postoji!" }, { status: 404 });
        }

        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return NextResponse.json({ success: false, error: "Netačan username ili lozinka!" }, { status: 401 });
        }

        // 2. Generisanje JWT tokena (Preporuka: tajni ključ prebaci u .env fajl, npr. process.env.JWT_SECRET)
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || "1237777",
            { expiresIn: "1h" }
        );

        // 3. Kreiranje Next.js odgovora i postavljanje kolačića (Cookie)
        const response = NextResponse.json({ success: true, message: "Uspešno ulogovan" }, { status: 200 });

        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600 // u sekundama (1 sat)
        });

        return response;

    } catch (err: any) {
        console.error("Greška pri prijavljivanju:", err);
        return NextResponse.json({ success: false, error: "Greška na serveru!" }, { status: 500 });
    }
}


export async function GET() {
  const cookieStore = await cookies();
  // Zeni 'tvoj_naziv_kolacica' sa stvarnim imenom tvog kolačića (npr. 'token')
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Niste prijavljeni' }, { status: 401 });
  }

  try {
    const userData = jwt.decode(token);
    return NextResponse.json({ user: userData });
  } catch (error) {
    return NextResponse.json({ error: 'Neispravan token' }, { status: 400 });
  }
}
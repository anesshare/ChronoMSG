import { pool } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const getData = await pool.query(
            `SELECT * FROM active_trans
             WHERE active = true
             AND end_date::date = CURRENT_DATE`
        );

        console.log("Broj pronađenih zaduženja:", getData.rows.length);

        for (const item of getData.rows) {
            sendMessage(item);
        }

        return NextResponse.json({
            success: true,
            message: "Provera završena",
            found: getData.rows.length
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { success: false, message: "Greška prilikom izvršavanja" },
            { status: 500 }
        );
    }
}

function sendMessage(item: any) {
    const message = `Poštovani ${item.name}, ističe vam ugovor na dan: ${item.end_date}.`;

    console.log("Poruka za slanje:", message);
}
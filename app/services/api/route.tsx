import { pool } from "@/app/lib/db";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
    try {
        // 1. Povlačenje podataka iz tabele active_trans sa tačnim kolonama
        const resDb = await pool.query("SELECT * FROM active_trans WHERE active = true");
        const rows = resDb.rows;

        if (!rows || rows.length === 0) {
            return NextResponse.json({ success: true, message: "Nema aktivnih zaduženja za slanje." });
        }

        const token = process.env.WHATSAPP_TOKEN;
        const phone_number_id = process.env.WHATSAPP_PHONE_NUMBER_ID;

        if (!token || !phone_number_id) {
            return NextResponse.json(
                { error: 'Meta API credentials nisu podešeni u .env fajlu.' },
                { status: 500 }
            );
        }

        const results = [];

        // 2. Prolazak kroz svaki red i slanje poruke preko Meta API-ja
        for (const row of rows) {
            const customerName = row.name;           // Kolona 'name'
            const recipientPhone = row.number;       // Kolona 'number'
            const amount = row.trans_value;          // Kolona 'trans_value'
            const dueDate = row.end_date || row.start_date; // Možeš izabrati da li gledaš end_date ili start_date kao rok

            if (!recipientPhone) continue;

            try {
                const waResponse = await axios.post(
                    `https://graph.facebook.com/v25.0/${phone_number_id}/messages`,
                    {
                        messaging_product: 'whatsapp',
                        to: recipientPhone,
                        type: 'template',
                        template: {
                            name: 'napomena_za_ratu', // Tvoj odobreni šablon
                            language: { code: 'sr' },
                            components: [
                                {
                                    type: 'body',
                                    parameters: [
                                        { type: 'text', text: String(customerName) },
                                        { type: 'text', text: String(dueDate) },
                                        { type: 'text', text: String(amount) }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                results.push({ phone: recipientPhone, status: "sent", data: waResponse.data });
            } catch (apiError: any) {
                console.error(`Greška pri slanju na broj ${recipientPhone}:`, apiError.response?.data || apiError.message);
                results.push({ phone: recipientPhone, status: "failed", error: apiError.response?.data || apiError.message });
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: `Procesirano ${rows.length} zaduženja.`,
            results 
        });

    } catch (error: any) {
        console.error("Greška prilikom čitanja iz baze ili slanja poruka!", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
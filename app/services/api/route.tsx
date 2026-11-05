export const dynamic = 'force-dynamic';
import { pool } from "@/app/lib/db";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');
        if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Povlačenje aktivnih zaduženja
        const resDb = await pool.query(
            "SELECT * FROM active_trans WHERE active = false"
        );

        const rows = resDb.rows;

        if (!rows || rows.length === 0) {
            return NextResponse.json({
                success: true,
                message: "Nema aktivnih zaduženja."
            });
        }

        // 2. WhatsApp API podaci
        const token = process.env.WHATSAPP_TOKEN;
        const phone_number_id = process.env.WHATSAPP_PHONE_NUMBER_ID;

        if (!token || !phone_number_id) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Meta API credentials nisu podešeni."
                },
                { status: 500 }
            );
        }

        // 3. Današnji datum
        const today = new Date().toLocaleDateString("en-CA", {
            timeZone: "Europe/Belgrade"
        });

        const results = [];

        // 4. Prolazak kroz zaduženja
        for (const row of rows) {

            const customerName = row.name;
            const recipientPhone = row.number;
            const amount = row.trans_value;
            const dueDate = row.end_date;

            // 5. Provera da li je datum dospeća danas
            if (!dueDate) continue;

            const formattedDueDate = new Date(dueDate)
                .toLocaleDateString("en-CA", {
                    timeZone: "Europe/Belgrade"
                });

            if (formattedDueDate !== today) {
                continue;
            }

            if (!recipientPhone) {
                results.push({
                    status: "skipped",
                    reason: "Nedostaje broj telefona."
                });
                continue;
            }

            // 6. Formatiranje datuma za WhatsApp
            const formattedDate = new Date(dueDate)
                .toLocaleDateString("sr-RS", {
                    timeZone: "Europe/Belgrade"
                });

            try {
                // 7. Slanje WhatsApp template poruke
                const waResponse = await axios.post(
                    `https://graph.facebook.com/v25.0/${phone_number_id}/messages`,
                    {
                        messaging_product: "whatsapp",
                        to: String(recipientPhone),
                        type: "template",
                        template: {
                            name: "napomena_srb",
                            language: {
                                code: "sr"
                            },
                            components: [
                                {
                                    type: "body",
                                    parameters: [
                                        {
                                            type: "text",
                                            parameter_name: "customer_name",
                                            text: String(customerName)
                                        },
                                        {
                                            type: "text",
                                            parameter_name: "due_date",
                                            text: formattedDate
                                        },
                                        {
                                            type: "text",
                                            parameter_name: "amount",
                                            text: String(amount)
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                // Ažuriranje statusa u bazi za ovog specifičnog korisnika
                await pool.query(
                    "UPDATE active_trans SET active = $1 WHERE id = $2",
                    [true, row.id]
                );

                results.push({
                    phone: recipientPhone,
                    status: "sent",
                    data: waResponse.data
                });

            } catch (apiError: any) {

                console.error(
                    `Greška pri slanju na broj ${recipientPhone}:`,
                    apiError.response?.data || apiError.message
                );

                results.push({
                    phone: recipientPhone,
                    status: "failed",
                    error: apiError.response?.data || apiError.message
                });
            }
        }

        // 8. Rezultat
        return NextResponse.json({
            success: true,
            message: `Provereno ${rows.length} zaduženja.`,
            today,
            results
        });

    } catch (error: any) {

        console.error("Greška prilikom izvršavanja:", error);

        return NextResponse.json(
            {
                success: false,
                error: error.message
            },
            { status: 500 }
        );
    }
}
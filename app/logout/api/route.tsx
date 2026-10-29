import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();

  // Brisanje kolačića tako što mu stavimo maxAge na 0 ili koristimo delete
  cookieStore.set({
    name: "token",
    value: "",
    maxAge: 0, // Odmah poništava kolačić
    path: "/",
  });

  return NextResponse.json({ success: true, message: "Uspešno odjavljen" });
}
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

        if (password === adminPassword) {
            return NextResponse.json({ ok: true });
        }

        return NextResponse.json(
            { ok: false, message: "Password salah" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { ok: false, message: "Terjadi kesalahan" },
            { status: 500 }
        );
    }
}

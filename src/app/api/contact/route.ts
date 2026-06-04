import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Log for now — replace with nodemailer/resend when env vars are set
    console.log("Contact form submission:", { name, email, phone, subject, message });

    // TODO: send email via nodemailer when SMTP env vars are configured
    // import nodemailer from "nodemailer";
    // const transporter = nodemailer.createTransport({ ... });
    // await transporter.sendMail({ from: email, to: "contact@tiki-boat.com", ... });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

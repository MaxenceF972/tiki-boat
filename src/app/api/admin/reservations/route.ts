import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return session;
}

export async function GET(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const date   = searchParams.get("date");
  const status = searchParams.get("status");

  const reservations = await prisma.reservation.findMany({
    where: {
      ...(date   ? { date }   : {}),
      ...(status ? { status } : {}),
    },
    orderBy: { date: "asc" },
  });

  return NextResponse.json(reservations);
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const reservation = await prisma.reservation.create({
    data: {
      excursionId:    body.excursionId    ?? "",
      excursionTitle: body.excursionTitle,
      date:           body.date,
      adults:         Number(body.adults ?? 1),
      children:       Number(body.children ?? 0),
      infants:        Number(body.infants ?? 0),
      source:         "manual",
      totalPrice:     Number(body.totalPrice ?? 0),
      depositAmount:  Number(body.depositAmount ?? 0),
      paymentType:    body.paymentType ?? "full",
      isPaid:         body.isPaid ?? false,
      status:         body.status ?? "confirmed",
      customerName:   body.customerName,
      customerEmail:  body.customerEmail ?? "",
      customerPhone:  body.customerPhone ?? "",
      notes:          body.notes ?? null,
    },
  });
  return NextResponse.json(reservation);
}

export async function PATCH(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, status, isPaid, notes } = body;

  const updated = await prisma.reservation.update({
    where: { id },
    data: {
      ...(status !== undefined ? { status } : {}),
      ...(isPaid !== undefined ? { isPaid } : {}),
      ...(notes  !== undefined ? { notes  } : {}),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await prisma.reservation.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

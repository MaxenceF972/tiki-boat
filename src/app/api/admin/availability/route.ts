import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session ?? null;
}

export async function GET(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month"); // YYYY-MM

  const where = month
    ? { date: { startsWith: month } }
    : {};

  const availabilities = await prisma.availability.findMany({
    where,
    orderBy: { date: "asc" },
  });

  return NextResponse.json(availabilities);
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { date, excursionId, maxSpots, bookedSpots, isBlocked, blockReason } = body;

  const availability = await prisma.availability.upsert({
    where: { date_excursionId: { date, excursionId } },
    update: {
      ...(maxSpots    !== undefined ? { maxSpots }    : {}),
      ...(bookedSpots !== undefined ? { bookedSpots } : {}),
      ...(isBlocked   !== undefined ? { isBlocked }   : {}),
      ...(blockReason !== undefined ? { blockReason } : {}),
    },
    create: { date, excursionId, maxSpots: maxSpots ?? 12, bookedSpots: bookedSpots ?? 0, isBlocked: isBlocked ?? false, blockReason },
  });

  return NextResponse.json(availability);
}

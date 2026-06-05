import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z
    .enum(["STUDENT", "INSTRUCTOR", "INSTITUTION_ADMIN", "GUARDIAN"])
    .default("STUDENT"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        role: data.role,
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      role: user.role,
      message: "Account saved to database",
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors }, { status: 400 });
    }
    console.error("Register error:", e);
    return NextResponse.json(
      {
        error:
          "Registration failed. Run: npx prisma db push — and ensure DATABASE_URL is set.",
      },
      { status: 500 }
    );
  }
}

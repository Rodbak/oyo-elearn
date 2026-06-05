import { prisma } from "@/lib/prisma";
import {
  type AuthPortal,
  dashboardPathForRole,
  portalToRole,
  roleMatchesPortal,
} from "@/lib/roles";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  portal: z.enum(["STUDENT", "INSTRUCTOR", "INSTITUTION"]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, portal } = schema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user?.passwordHash || !user.isActive) {
      return NextResponse.json(
        { error: "INVALID", message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "INVALID", message: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!roleMatchesPortal(user.role, portal as AuthPortal)) {
      const expected = portalToRole(portal as AuthPortal);
      return NextResponse.json(
        {
          error: "WRONG_PORTAL",
          message: `This account is not registered as ${portal.toLowerCase()}. It is linked to role ${user.role}.`,
          actualRole: user.role,
          expectedRole: expected,
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      ok: true,
      role: user.role,
      redirect: dashboardPathForRole(user.role),
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "VALIDATION", details: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "SERVER" }, { status: 500 });
  }
}

import { auth } from "@/lib/auth";
import { generateQuizFromSyllabus } from "@/lib/ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  syllabus: z.string().min(10),
  count: z.number().min(1).max(20).optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { syllabus, count } = schema.parse(body);
    const questions = await generateQuizFromSyllabus(syllabus, count ?? 5);
    return NextResponse.json({ questions });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}

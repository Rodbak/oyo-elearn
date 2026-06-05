import { auth } from "@/lib/auth";
import { streamTutorResponse } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { messages, courseTitle, lessonContent } = await req.json();
  const systemMessage = {
    role: "system" as const,
    content: `You are an AI tutor for the course "${courseTitle}". Current lesson context: ${lessonContent ?? "N/A"}. Be concise and encouraging.`,
  };

  const stream = await streamTutorResponse([
    systemMessage,
    ...(messages ?? []).slice(-10),
  ]);

  if (!stream) {
    return NextResponse.json({
      message:
        "AI tutor is not configured. Set OPENAI_API_KEY in your environment.",
    });
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? "";
        if (text) controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

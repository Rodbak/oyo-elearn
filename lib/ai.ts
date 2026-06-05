import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export interface QuizQuestion {
  question: string;
  type: "MCQ" | "TRUE_FALSE" | "SHORT_ANSWER";
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export async function generateQuizFromSyllabus(
  syllabusText: string,
  count = 5
): Promise<QuizQuestion[]> {
  if (!openai) {
    return getDemoQuizQuestions(count);
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `Generate ${count} quiz questions from the syllabus. Return valid JSON array with objects: { question, type (MCQ|TRUE_FALSE|SHORT_ANSWER), options (for MCQ), correctAnswer, explanation }.`,
      },
      { role: "user", content: syllabusText },
    ],
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(content) as { questions?: QuizQuestion[] };
  return parsed.questions ?? getDemoQuizQuestions(count);
}

export async function streamTutorResponse(
  messages: { role: "user" | "assistant" | "system"; content: string }[]
) {
  if (!openai) {
    return null;
  }

  return openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    stream: true,
  });
}

function getDemoQuizQuestions(count: number): QuizQuestion[] {
  return Array.from({ length: count }, (_, i) => ({
    question: `Sample question ${i + 1}?`,
    type: "MCQ" as const,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: "Option A",
    explanation: "Demo explanation when OpenAI is not configured.",
  }));
}

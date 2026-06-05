"use client";

import { useState } from "react";
import { NeuButton, NeuCard } from "@/components/neu";

export default function AIQuizGeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<
    { question: string; type: string }[]
  >([]);

  async function generate() {
    setLoading(true);
    const res = await fetch("/api/ai/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        syllabus: "Variables, loops, functions, arrays in JavaScript.",
        count: 3,
      }),
    });
    const data = await res.json();
    setQuestions(data.questions ?? []);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-extrabold">AI Quiz Generator</h1>
      <NeuCard>
        <label className="font-body text-sm font-medium">Syllabus or lesson text</label>
        <textarea
          className="mt-2 w-full rounded-2xl bg-background p-4 font-body shadow-neu-inset focus:shadow-neu-inset-deep focus:ring-2 focus:ring-accent"
          rows={6}
          placeholder="Paste syllabus content…"
        />
        <NeuButton className="mt-4" onClick={generate} disabled={loading}>
          {loading ? "Generating…" : "Generate questions"}
        </NeuButton>
      </NeuCard>
      {questions.length > 0 && (
        <ul className="space-y-4">
          {questions.map((q, i) => (
            <NeuCard key={i} inset>
              <p className="font-display font-bold">{q.question}</p>
              <p className="mt-1 font-body text-xs text-muted">{q.type}</p>
            </NeuCard>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { MessageCircle, Play } from "lucide-react";
import {
  NeuButton,
  NeuCard,
  NeuProgressBar,
  NeuTabBar,
  NeuWell,
} from "@/components/neu";

const lessons = [
  { id: "1", title: "Welcome & syllabus", duration: "8:20", active: true },
  { id: "2", title: "Variables and types", duration: "22:15", active: false },
  { id: "3", title: "Control flow quiz", duration: "15 min", active: false },
];

const tutorPrompts = [
  "Explain this differently",
  "Give me an example",
  "Quiz me on this",
];

export default function CoursePlayerPage() {
  const [activeLesson, setActiveLesson] = useState("1");
  const [tutorOpen, setTutorOpen] = useState(false);
  const [tab, setTab] = useState("lessons");

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex-1 space-y-4">
        <NeuCard inset className="aspect-video flex items-center justify-center">
          <NeuWell className="flex h-20 w-20 items-center justify-center">
            <Play className="h-10 w-10 text-accent" aria-hidden />
          </NeuWell>
          <p className="sr-only">Video player — connect Mux playback ID</p>
        </NeuCard>
        <NeuProgressBar value={34} label="Course progress" />
        <div className="flex flex-wrap gap-3">
          <NeuButton
            variant="secondary"
            onClick={() => setTutorOpen(!tutorOpen)}
            aria-expanded={tutorOpen}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            AI Tutor
          </NeuButton>
        </div>
        <div className="lg:hidden">
          <NeuTabBar
            tabs={[
              { id: "lessons", label: "Lessons" },
              { id: "notes", label: "Notes" },
            ]}
            activeId={tab}
            onChange={setTab}
          />
        </div>
      </div>

      <aside className="w-full space-y-4 lg:w-80">
        <NeuCard className="hidden lg:block">
          <h2 className="font-display font-bold">Lessons</h2>
          <ul className="mt-4 space-y-2">
            {lessons.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => setActiveLesson(l.id)}
                  className={`w-full rounded-2xl px-4 py-3 text-left font-body text-sm transition-all focus-neu ${
                    activeLesson === l.id
                      ? "shadow-neu-inset text-accent"
                      : "shadow-neu-extruded-sm text-muted hover:shadow-neu-extruded"
                  }`}
                >
                  {l.title}
                  <span className="block text-xs opacity-70">{l.duration}</span>
                </button>
              </li>
            ))}
          </ul>
        </NeuCard>
      </aside>

      {tutorOpen && (
        <div
          className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background p-6 shadow-neu-extruded"
          role="dialog"
          aria-label="AI Tutor"
        >
          <h2 className="font-display text-xl font-bold">AI Tutor</h2>
          <p className="mt-2 font-body text-sm text-muted">
            Context: current lesson content and course title.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tutorPrompts.map((p) => (
              <NeuButton key={p} variant="ghost" size="sm">
                {p}
              </NeuButton>
            ))}
          </div>
          <NeuWell className="mt-6 min-h-[200px] font-body text-sm text-muted">
            Ask a question about this lesson…
          </NeuWell>
          <NeuButton
            variant="secondary"
            className="mt-4 w-full"
            onClick={() => setTutorOpen(false)}
          >
            Close
          </NeuButton>
        </div>
      )}
    </div>
  );
}

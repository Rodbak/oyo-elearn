"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Lock, MessageCircle, Play, X } from "lucide-react";
import { NeuButton, NeuCard, NeuProgressBar } from "@/components/neu";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "quiz" | "project";
  status: "completed" | "active" | "locked";
}

const course = { title: "Introduction to Computer Science", progress: 34 };

const lessons: Lesson[] = [
  { id: "1", title: "Welcome & syllabus",       duration: "8:20",   type: "video",   status: "completed" },
  { id: "2", title: "Variables and types",       duration: "22:15",  type: "video",   status: "active"    },
  { id: "3", title: "Control flow quiz",         duration: "15 min", type: "quiz",    status: "locked"    },
  { id: "4", title: "Functions deep dive",       duration: "18:45",  type: "video",   status: "locked"    },
  { id: "5", title: "Arrays and iteration",      duration: "25:10",  type: "video",   status: "locked"    },
  { id: "6", title: "Final project",             duration: "45 min", type: "project", status: "locked"    },
];

const tutorPrompts = [
  "Explain this differently",
  "Give me an example",
  "Quiz me on this",
  "Summarise key points",
];

function LessonList({
  items,
  active,
  onSelect,
}: {
  items: Lesson[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="space-y-1">
      {items.map((l, i) => {
        const isActive    = l.id === active;
        const isCompleted = l.status === "completed";
        const isLocked    = l.status === "locked";
        return (
          <li key={l.id}>
            <button
              type="button"
              disabled={isLocked}
              onClick={() => onSelect(l.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all focus-neu",
                isActive  && "bg-accent/8 text-accent",
                !isActive && !isLocked && "hover:bg-[#F8F9FC] text-foreground",
                isLocked  && "cursor-not-allowed opacity-40 text-muted"
              )}
            >
              <div className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px]",
                isCompleted ? "bg-badge-mint/15 text-badge-mint"
                : isActive  ? "bg-accent/15 text-accent"
                            : "bg-black/5 text-muted"
              )}>
                {isCompleted ? <Check className="h-3 w-3" />
                : isLocked   ? <Lock  className="h-3 w-3" />
                             : <span className="font-display font-bold">{i + 1}</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-xs font-medium leading-snug truncate">{l.title}</p>
                <p className="font-body text-[10px] text-muted">{l.duration}</p>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function CoursePlayerPage() {
  const [activeLesson, setActiveLesson] = useState("2");
  const [tutorOpen,    setTutorOpen]    = useState(false);
  const [tutorInput,   setTutorInput]   = useState("");
  const [chat,         setChat]         = useState<{ role: "user" | "ai"; text: string }[]>([]);

  const current      = lessons.find(l => l.id === activeLesson) ?? lessons[1];
  const currentIndex = lessons.findIndex(l => l.id === activeLesson);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    setChat(prev => [...prev, { role: "user", text }]);
    setTutorInput("");
    // Placeholder AI response
    setTimeout(() => {
      setChat(prev => [...prev, { role: "ai", text: "I'm your AI tutor. Connect the /api/ai/tutor endpoint to enable real responses." }]);
    }, 600);
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">

      {/* ── Video + info column ─────────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-4">

        {/* Video placeholder */}
        <div className="aspect-video w-full overflow-hidden rounded-card border border-black/5 bg-foreground/4 flex flex-col items-center justify-center gap-3 shadow-neu-extruded-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <Play className="h-8 w-8 text-accent" aria-hidden />
          </div>
          <p className="font-body text-sm text-muted">Connect Mux playback ID to stream</p>
        </div>

        {/* Title + prev/next */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted">Now playing</p>
            <h1 className="mt-0.5 font-display text-xl font-extrabold leading-snug text-foreground">
              {current.title}
            </h1>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              disabled={currentIndex === 0}
              onClick={() => setActiveLesson(lessons[currentIndex - 1].id)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/8 bg-white shadow-neu-extruded-sm transition-all hover:shadow-neu-extruded disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous lesson"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              disabled={currentIndex === lessons.length - 1}
              onClick={() => setActiveLesson(lessons[currentIndex + 1].id)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/8 bg-white shadow-neu-extruded-sm transition-all hover:shadow-neu-extruded disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next lesson"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-body text-xs">
            <span className="text-muted">Course progress</span>
            <span className="font-bold text-accent">{course.progress}%</span>
          </div>
          <NeuProgressBar value={course.progress} />
        </div>

        {/* AI Tutor trigger */}
        <NeuButton variant="secondary" onClick={() => setTutorOpen(true)} className="w-full sm:w-auto">
          <MessageCircle className="h-4 w-4" aria-hidden />
          Ask AI Tutor
        </NeuButton>

        {/* Mobile lesson list */}
        <div className="lg:hidden">
          <h2 className="font-display text-base font-bold mb-2">All lessons</h2>
          <NeuCard inset className="p-2">
            <LessonList items={lessons} active={activeLesson} onSelect={setActiveLesson} />
          </NeuCard>
        </div>
      </div>

      {/* ── Desktop sidebar ──────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 lg:block">
        <NeuCard className="sticky top-20 p-4">
          <p className="font-display text-sm font-bold leading-snug mb-3">{course.title}</p>
          <div className="space-y-1.5 mb-4 pb-4 border-b border-black/5">
            <div className="flex justify-between font-body text-xs">
              <span className="text-muted">Progress</span>
              <span className="font-bold text-accent">{course.progress}%</span>
            </div>
            <NeuProgressBar value={course.progress} />
          </div>
          <LessonList items={lessons} active={activeLesson} onSelect={setActiveLesson} />
        </NeuCard>
      </aside>

      {/* ── AI Tutor slide-in drawer ──────────────────────────── */}
      {tutorOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm"
            onClick={() => setTutorOpen(false)}
            aria-hidden
          />
          <div
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-neu-extruded"
            role="dialog"
            aria-label="AI Tutor"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-violet/15">
                  <MessageCircle className="h-4 w-4 text-badge-violet" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold">AI Tutor</p>
                  <p className="font-body text-xs text-muted truncate max-w-[160px]">{current.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTutorOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-muted transition-colors hover:bg-[#F8F9FC] hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chat.length === 0 ? (
                <div className="rounded-xl bg-[#F8F9FC] p-4">
                  <p className="font-body text-sm text-muted text-center mb-3">
                    Ask anything about this lesson.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tutorPrompts.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => sendMessage(p)}
                        className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 font-body text-xs text-accent transition-colors hover:bg-accent/10"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                chat.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={cn(
                      "max-w-[85%] rounded-2xl px-3 py-2 font-body text-sm",
                      msg.role === "user" ? "bg-accent text-white" : "bg-[#F8F9FC] text-foreground"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="border-t border-black/5 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tutorInput}
                  onChange={(e) => setTutorInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(tutorInput)}
                  placeholder="Ask about this lesson…"
                  className="flex-1 rounded-xl border border-black/8 bg-[#F8F9FC] px-3 py-2 font-body text-sm outline-none focus:ring-2 focus:ring-accent/30"
                />
                <NeuButton size="sm" disabled={!tutorInput.trim()} onClick={() => sendMessage(tutorInput)}>
                  Send
                </NeuButton>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

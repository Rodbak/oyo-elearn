"use client";

import { useState } from "react";
import { NeuButton, NeuCard, NeuBadge, NeuInput } from "@/components/neu";
import { Radio, Plus, Video, Calendar } from "lucide-react";

const scheduled = [
  { id: "1", title: "Data Structures — Week 4",  course: "Intro to CS",        date: "Today",    time: "2:00 PM",  duration: 60,  status: "live"      },
  { id: "2", title: "Algebra Review",             course: "Math for Engineers", date: "Fri Jun 20", time: "10:00 AM", duration: 45, status: "upcoming"  },
  { id: "3", title: "React Hooks deep dive",      course: "Web Development",    date: "Mon Jun 23", time: "3:00 PM",  duration: 90, status: "upcoming"  },
];

const past = [
  { id: "4", title: "Variables & types",           course: "Intro to CS",     date: "Jun 10", attendees: 42 },
  { id: "5", title: "Integration by parts",        course: "Math for Engineers", date: "Jun 8", attendees: 31 },
];

export default function LiveClassSchedulerPage() {
  const [showForm, setShowForm] = useState(false);
  const [link, setLink] = useState("");

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-badge-coral/10">
            <Radio className="h-5 w-5 text-badge-coral" aria-hidden />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold">Live classes</h1>
            <p className="font-body text-sm text-muted">{scheduled.filter(s => s.status === "live").length} live now</p>
          </div>
        </div>
        <NeuButton onClick={() => setShowForm(v => !v)}>
          <Plus className="h-4 w-4" /> Schedule class
        </NeuButton>
      </div>

      {/* Schedule form */}
      {showForm && (
        <NeuCard className="border border-accent/15">
          <h2 className="font-display text-base font-bold mb-4">New live class</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <NeuInput label="Class title" placeholder="e.g. Week 5 — Recursion" />
            <NeuInput label="Course" placeholder="Select a course" />
            <NeuInput label="Date & time" type="datetime-local" />
            <NeuInput label="Duration (minutes)" type="number" placeholder="60" />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <NeuButton onClick={() => setLink("https://meet.google.com/abc-defg-hij")}>
              Generate meeting link
            </NeuButton>
            <NeuButton variant="secondary" onClick={() => setShowForm(false)}>Cancel</NeuButton>
          </div>
          {link && (
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-badge-mint/10 px-4 py-3">
              <Video className="h-4 w-4 text-badge-mint shrink-0" />
              <p className="font-body text-sm text-foreground break-all">{link}</p>
              <NeuButton size="sm" variant="secondary" className="shrink-0" onClick={() => navigator.clipboard.writeText(link)}>
                Copy
              </NeuButton>
            </div>
          )}
        </NeuCard>
      )}

      {/* Upcoming & live */}
      <NeuCard>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-coral/10">
            <Calendar className="h-4 w-4 text-badge-coral" />
          </div>
          <h2 className="font-display text-base font-bold">Scheduled</h2>
        </div>
        <div className="space-y-3">
          {scheduled.map((s) => (
            <div key={s.id} className="flex flex-wrap items-center gap-3 rounded-xl bg-[#F8F9FC] px-4 py-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-body text-sm font-semibold truncate">{s.title}</p>
                  {s.status === "live" && (
                    <span className="flex items-center gap-1 rounded-full bg-badge-coral/15 px-2 py-0.5 font-body text-[10px] font-bold text-badge-coral">
                      <span className="h-1.5 w-1.5 rounded-full bg-badge-coral animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>
                <p className="font-body text-xs text-muted">{s.course} · {s.date} at {s.time} · {s.duration} min</p>
              </div>
              <NeuButton size="sm" variant={s.status === "live" ? "primary" : "secondary"}>
                {s.status === "live" ? "Join now" : "Edit"}
              </NeuButton>
            </div>
          ))}
        </div>
      </NeuCard>

      {/* Past classes */}
      <NeuCard>
        <h2 className="font-display text-base font-bold mb-4">Past classes</h2>
        <div className="space-y-2">
          {past.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#F8F9FC] px-4 py-3">
              <div className="min-w-0">
                <p className="font-body text-sm font-medium truncate">{p.title}</p>
                <p className="font-body text-xs text-muted">{p.course} · {p.date}</p>
              </div>
              <NeuBadge variant="default">{p.attendees} attended</NeuBadge>
            </div>
          ))}
        </div>
      </NeuCard>
    </div>
  );
}

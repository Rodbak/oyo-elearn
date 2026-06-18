"use client";

import { useState } from "react";
import { NeuButton, NeuCard, NeuBadge, NeuInput } from "@/components/neu";
import { BookOpen, Plus } from "lucide-react";

const courses = [
  { id: "1", title: "Introduction to Computer Science", sections: 6, students: 98,  status: "Published" },
  { id: "2", title: "Web Development Bootcamp",         sections: 8, students: 72,  status: "Published" },
  { id: "3", title: "Data Analytics 101",               sections: 4, students: 45,  status: "Draft"     },
];

export default function CourseBuilderPage() {
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-badge-violet/10">
            <BookOpen className="h-5 w-5 text-badge-violet" aria-hidden />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold">Course builder</h1>
            <p className="font-body text-sm text-muted">{courses.length} courses</p>
          </div>
        </div>
        <NeuButton onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4 mr-1" /> New course
        </NeuButton>
      </div>

      {/* New course form */}
      {showNew && (
        <NeuCard className="border border-accent/15">
          <h2 className="font-display text-base font-bold mb-4">New course</h2>
          <div className="space-y-4">
            <NeuInput label="Course title" placeholder="e.g. Introduction to Python" />
            <NeuInput label="Description (optional)" placeholder="What will students learn?" />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <NeuButton>Create course</NeuButton>
            <NeuButton variant="secondary" onClick={() => setShowNew(false)}>Cancel</NeuButton>
          </div>
        </NeuCard>
      )}

      {/* Course list */}
      <div className="space-y-3">
        {courses.map((c) => (
          <NeuCard key={c.id}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <BookOpen className="h-5 w-5 text-accent" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-base font-bold truncate">{c.title}</h2>
                <p className="font-body text-xs text-muted mt-0.5">
                  {c.sections} sections · {c.students} students
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <NeuBadge variant={c.status === "Published" ? "success" : "default"}>{c.status}</NeuBadge>
                <NeuButton size="sm" variant="secondary">Edit</NeuButton>
              </div>
            </div>

            {/* Sections preview */}
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {["Section 1: Foundations", "Section 2: Practice", "Section 3: Projects"].slice(0, 2).map((s) => (
                <div key={s} className="rounded-xl bg-[#F8F9FC] px-3 py-2 font-body text-xs text-muted">
                  {s}
                </div>
              ))}
            </div>
          </NeuCard>
        ))}
      </div>
    </div>
  );
}

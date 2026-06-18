"use client";

import Link from "next/link";
import { NeuCard, NeuProgressBar } from "@/components/neu";
import SocialCards from "@/components/ui/card-fan-carousel";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

const courses = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    instructor: "Dr. Amara Osei",
    progress: 68,
    lessonCount: 24,
    duration: "12h 30m",
    imgUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=700&fit=crop",
    thumbUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=240&fit=crop",
  },
  {
    id: "2",
    title: "Mathematics for Engineers",
    instructor: "Prof. Kwame Mensah",
    progress: 42,
    lessonCount: 18,
    duration: "9h 15m",
    imgUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=700&fit=crop",
    thumbUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=240&fit=crop",
  },
];

const fanCards = courses.map((c) => ({
  imgUrl: c.imgUrl,
  alt: c.title,
  linkUrl: `/dashboard/student/courses/${c.id}`,
}));

export default function StudentCoursesPage() {
  return (
    <div className="space-y-5">
      <h1 className="font-display text-3xl font-extrabold">My courses</h1>

      {/* Fan carousel — visual showcase */}
      <div className="rounded-card bg-gradient-to-br from-accent/5 via-background to-sunset/5 py-4 shadow-neu-extruded-sm overflow-hidden">
        <SocialCards cards={fanCards} />
      </div>

      {/* Rich course cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {courses.map((c) => (
          <NeuCard key={c.id} className="flex flex-col gap-0 overflow-hidden p-0">
            {/* Thumbnail */}
            <div className="relative h-40 w-full overflow-hidden">
              <img
                src={c.thumbUrl}
                alt={c.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 font-body text-xs font-bold text-accent shadow-sm">
                {c.progress}% done
              </span>
            </div>

            {/* Card body */}
            <div className="flex flex-col gap-4 p-5">
              <div>
                <h2 className="font-display text-lg font-bold text-foreground leading-snug">
                  {c.title}
                </h2>
                <p className="mt-1 font-body text-xs text-muted">{c.instructor}</p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 font-body text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-accent" />
                  {c.lessonCount} lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  {c.duration}
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-body text-xs font-medium">
                  <span className="text-muted">Progress</span>
                  <span className="font-bold text-accent">{c.progress}%</span>
                </div>
                <NeuProgressBar value={c.progress} />
              </div>

              {/* CTA */}
              <Link
                href={`/dashboard/student/courses/${c.id}`}
                className="flex items-center justify-center gap-2 rounded-btn bg-accent px-4 py-2.5 font-body text-sm font-bold text-white shadow-neu-extruded-sm transition-all hover:bg-accent-light hover:shadow-neu-extruded focus-neu"
              >
                Continue learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </NeuCard>
        ))}
      </div>
    </div>
  );
}

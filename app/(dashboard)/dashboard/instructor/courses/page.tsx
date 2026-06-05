import { NeuButton, NeuCard, NeuInput } from "@/components/neu";

export default function CourseBuilderPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-extrabold">Course builder</h1>
        <NeuButton>New course</NeuButton>
      </div>
      <NeuCard>
        <NeuInput label="Course title" placeholder="Introduction to CS" />
        <p className="mt-6 font-body text-sm text-muted">
          Drag sections to reorder · Add VIDEO, QUIZ, DOCUMENT, or LIVE lessons ·
          Upload to Mux or SCORM package.
        </p>
        <div className="mt-6 space-y-3">
          {["Section 1: Foundations", "Section 2: Practice"].map((s) => (
            <div
              key={s}
              className="rounded-2xl bg-background p-4 shadow-neu-inset-sm font-body text-sm"
            >
              {s}
            </div>
          ))}
        </div>
        <NeuButton variant="secondary" className="mt-6">
          Add section
        </NeuButton>
      </NeuCard>
    </div>
  );
}

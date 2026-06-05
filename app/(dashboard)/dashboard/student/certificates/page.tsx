import Link from "next/link";
import { NeuButton, NeuCard } from "@/components/neu";
import { Award } from "lucide-react";

const certs = [
  {
    course: "Digital Literacy",
    date: "May 1, 2026",
    code: "OYO-DL-2026-A1B2",
  },
];

export default function StudentCertificatesPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-extrabold">Certificate wall</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {certs.map((c) => (
          <NeuCard key={c.code} className="text-center">
            <Award className="mx-auto h-12 w-12 text-accent-secondary" aria-hidden />
            <h2 className="mt-4 font-display text-xl font-bold">{c.course}</h2>
            <p className="mt-2 font-body text-sm text-muted">{c.date}</p>
            <NeuButton className="mt-6" variant="secondary" size="sm" asChild>
              <Link href={`/verify/${c.code}`}>Verify</Link>
            </NeuButton>
            <NeuButton className="mt-3" size="sm">
              Download PDF
            </NeuButton>
          </NeuCard>
        ))}
      </div>
    </div>
  );
}

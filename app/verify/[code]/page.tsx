import { NeuCard, NeuBadge } from "@/components/neu";

export default function VerifyCertificatePage({
  params,
}: {
  params: { code: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <NeuCard className="max-w-lg w-full text-center">
        <p className="font-body text-sm uppercase tracking-wider text-accent-secondary">
          Verified certificate
        </p>
        <h1 className="mt-4 font-display text-3xl font-extrabold">
          Digital Literacy
        </h1>
        <p className="mt-2 font-body text-muted">Issued to Ada Okonkwo</p>
        <p className="mt-1 font-body text-sm text-muted">May 1, 2026</p>
        <NeuBadge className="mt-6">Code: {params.code}</NeuBadge>
        <p className="mt-8 font-body text-xs text-muted">
          Lagos Academy · OYO-Elearner
        </p>
      </NeuCard>
    </div>
  );
}

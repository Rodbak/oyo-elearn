import { NeuButton, NeuCard, NeuBadge } from "@/components/neu";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-extrabold">Billing & plan</h1>
      <NeuCard>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-body text-sm text-muted">Current plan</p>
            <p className="font-display text-2xl font-extrabold">Pro</p>
          </div>
          <NeuBadge variant="success">Active</NeuBadge>
        </div>
        <p className="mt-4 font-body text-sm text-muted">
          Paystack (NGN) · Stripe (USD/EUR) webhooks configured at
          /api/webhooks/*
        </p>
        <NeuButton className="mt-6">Upgrade to Enterprise</NeuButton>
      </NeuCard>
    </div>
  );
}

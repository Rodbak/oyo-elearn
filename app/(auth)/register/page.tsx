import { Suspense } from "react";
import UnifiedAuth from "@/components/auth/UnifiedAuth";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="font-body text-muted">Loading…</p>
        </div>
      }
    >
      <UnifiedAuth initialMode="register" />
    </Suspense>
  );
}

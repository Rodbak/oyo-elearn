"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RolePortalSelector } from "@/components/auth/RolePortalSelector";
import { NeuButton, NeuCard, NeuInput } from "@/components/neu";
import type { AuthPortal } from "@/lib/roles";
import { dashboardPathForPortal } from "@/lib/roles";
import { Building2, UserPlus, Users } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [portal, setPortal] = useState<AuthPortal>("INSTITUTION");
  const [institutionName, setInstitutionName] = useState("");
  const [slug, setSlug] = useState("");

  return (
    <NeuCard className="max-w-lg mx-auto">
      <div className="mb-8 flex justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-3 w-12 rounded-full transition-all ${
              s <= step
                ? "bg-accent shadow-neu-inset-sm"
                : "bg-background shadow-neu-extruded-sm"
            }`}
            aria-hidden
          />
        ))}
      </div>

      {step === 1 && (
        <>
          <h1 className="font-display text-2xl font-extrabold">Choose your role</h1>
          <p className="mt-2 font-body text-sm text-muted">
            How will you use OYO-Elearner?
          </p>
          <div className="mt-6">
            <RolePortalSelector
              value={portal}
              onChange={setPortal}
              label="Choose your role"
            />
          </div>
          <NeuButton className="mt-8 w-full" onClick={() => setStep(2)}>
            Continue
          </NeuButton>
        </>
      )}

      {step === 2 && portal === "INSTITUTION" && (
        <>
          <Building2 className="h-8 w-8 text-accent" aria-hidden />
          <h1 className="mt-4 font-display text-2xl font-extrabold">
            Institution details
          </h1>
          <div className="mt-6 space-y-4">
            <NeuInput
              label="Institution name"
              value={institutionName}
              onChange={(e) => {
                setInstitutionName(e.target.value);
                setSlug(
                  e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")
                );
              }}
            />
            <NeuInput label="URL slug" value={slug} readOnly />
          </div>
          <div className="mt-8 flex gap-3">
            <NeuButton variant="secondary" onClick={() => setStep(1)}>
              Back
            </NeuButton>
            <NeuButton className="flex-1" onClick={() => setStep(3)}>
              Continue
            </NeuButton>
          </div>
        </>
      )}

      {step === 2 && portal !== "INSTITUTION" && (
        <>
          <h1 className="font-display text-2xl font-extrabold">Join an institution</h1>
          <p className="mt-2 font-body text-sm text-muted">
            Enter the invite code from your school or university.
          </p>
          <NeuInput label="Invite code" className="mt-6" />
          <div className="mt-8 flex gap-3">
            <NeuButton variant="secondary" onClick={() => setStep(1)}>
              Back
            </NeuButton>
            <NeuButton className="flex-1" onClick={() => setStep(3)}>
              Continue
            </NeuButton>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <UserPlus className="h-8 w-8 text-accent" aria-hidden />
          <h1 className="mt-4 font-display text-2xl font-extrabold">Invite your team</h1>
          <p className="mt-2 font-body text-sm text-muted">
            Add instructor and student emails (optional).
          </p>
          <NeuInput
            label="Emails (comma-separated)"
            placeholder="instructor@school.edu, student@school.edu"
            className="mt-6"
          />
          <NeuButton
            className="mt-8 w-full"
            onClick={() => router.push(dashboardPathForPortal(portal))}
          >
            <Users className="h-4 w-4" aria-hidden />
            Finish setup
          </NeuButton>
        </>
      )}
    </NeuCard>
  );
}

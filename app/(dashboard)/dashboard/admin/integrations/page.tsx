"use client";

import { useState } from "react";
import { NeuButton, NeuCard, NeuBadge, NeuInput } from "@/components/neu";
import { Globe, BookOpen, Puzzle, Check, ExternalLink } from "lucide-react";

type Status = "connected" | "disconnected" | "connecting";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  iconCls: string;
  status: Status;
  detail?: string;
}

const INTEGRATIONS: Integration[] = [
  {
    id: "google",
    name: "Google Classroom",
    description: "OAuth connect, import classes, and sync grades back automatically.",
    icon: Globe,
    iconCls: "bg-badge-sky/15 text-badge-sky",
    status: "disconnected",
  },
  {
    id: "scorm",
    name: "SCORM Packages",
    description: "Upload .zip files — supports SCORM 1.2 and 2004, parses imsmanifest.xml.",
    icon: BookOpen,
    iconCls: "bg-badge-amber/15 text-badge-amber",
    status: "connected",
    detail: "2 packages imported",
  },
  {
    id: "lti",
    name: "LTI 1.3",
    description: "Connect any LTI-compatible tool — Moodle, Canvas, or custom platforms.",
    icon: Puzzle,
    iconCls: "bg-badge-violet/15 text-badge-violet",
    status: "connected",
    detail: "Client ID: lti-client-demo",
  },
];

export default function IntegrationsHubPage() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const [ltiExpanded, setLtiExpanded] = useState(false);

  function toggleConnect(id: string) {
    setIntegrations(prev =>
      prev.map(i => {
        if (i.id !== id) return i;
        if (i.status === "connected") return { ...i, status: "disconnected" as Status, detail: undefined };
        return { ...i, status: "connected" as Status, detail: i.id === "google" ? "Classes synced" : i.detail };
      })
    );
  }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-badge-violet/10">
          <Puzzle className="h-5 w-5 text-badge-violet" aria-hidden />
        </div>
        <div>
          <h1 className="font-display text-2xl font-extrabold">Integrations</h1>
          <p className="font-body text-sm text-muted">
            {integrations.filter(i => i.status === "connected").length} of {integrations.length} connected
          </p>
        </div>
      </div>

      {/* Integration cards */}
      <div className="space-y-4">
        {integrations.map((i) => {
          const connected = i.status === "connected";
          return (
            <NeuCard key={i.id} className="p-5">
              <div className="flex flex-wrap items-start gap-4">
                {/* Icon */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${i.iconCls}`}>
                  <i.icon className="h-5 w-5" aria-hidden />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="font-display text-base font-bold">{i.name}</h2>
                    {connected ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-badge-mint/15 px-2 py-0.5 font-body text-[10px] font-bold text-badge-mint">
                        <Check className="h-2.5 w-2.5" /> Connected
                      </span>
                    ) : (
                      <NeuBadge variant="default" className="text-[10px]">Not connected</NeuBadge>
                    )}
                  </div>
                  <p className="font-body text-sm text-muted">{i.description}</p>
                  {connected && i.detail && (
                    <p className="mt-1 font-body text-xs text-accent">{i.detail}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-2">
                  {i.id === "lti" && connected && (
                    <NeuButton
                      size="sm"
                      variant="secondary"
                      onClick={() => setLtiExpanded(v => !v)}
                    >
                      {ltiExpanded ? "Hide" : "Config"}
                    </NeuButton>
                  )}
                  <NeuButton
                    size="sm"
                    variant={connected ? "secondary" : "primary"}
                    onClick={() => toggleConnect(i.id)}
                  >
                    {connected ? "Disconnect" : "Connect"}
                  </NeuButton>
                </div>
              </div>

              {/* LTI config panel */}
              {i.id === "lti" && ltiExpanded && connected && (
                <div className="mt-4 grid gap-3 border-t border-black/5 pt-4 sm:grid-cols-2">
                  <NeuInput label="Client ID"      readOnly value="lti-client-demo" />
                  <NeuInput label="Deployment ID"  readOnly value="deploy-001"      />
                  <div className="sm:col-span-2">
                    <NeuInput
                      label="Launch URL"
                      readOnly
                      value="https://oyo-elearn.vercel.app/api/integrations/lti/launch"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <NeuButton variant="secondary" size="sm" asChild>
                      <a href="https://docs.imsglobal.org/lti/specs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        LTI 1.3 docs <ExternalLink className="h-3 w-3" />
                      </a>
                    </NeuButton>
                  </div>
                </div>
              )}

              {/* SCORM upload */}
              {i.id === "scorm" && connected && (
                <div className="mt-4 flex flex-wrap gap-3 border-t border-black/5 pt-4">
                  <NeuButton variant="secondary" size="sm">Upload SCORM package</NeuButton>
                  <NeuButton variant="ghost" size="sm">View imported packages</NeuButton>
                </div>
              )}
            </NeuCard>
          );
        })}
      </div>
    </div>
  );
}

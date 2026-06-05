import { NeuButton, NeuCard, NeuInput } from "@/components/neu";

export default function IntegrationsHubPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-extrabold">Integrations hub</h1>

      <NeuCard>
        <h2 className="font-display text-xl font-bold">Google Classroom</h2>
        <p className="mt-2 font-body text-sm text-muted">
          OAuth connect · import classes · grade passback
        </p>
        <NeuButton className="mt-4">Connect Google</NeuButton>
      </NeuCard>

      <NeuCard>
        <h2 className="font-display text-xl font-bold">SCORM upload</h2>
        <p className="mt-2 font-body text-sm text-muted">
          Drag-and-drop .zip — parses imsmanifest.xml (1.2 / 2004)
        </p>
        <NeuButton variant="secondary" className="mt-4">
          Upload SCORM package
        </NeuButton>
      </NeuCard>

      <NeuCard>
        <h2 className="font-display text-xl font-bold">LTI 1.3</h2>
        <div className="mt-4 space-y-4">
          <NeuInput label="Client ID" readOnly value="lti-client-demo" />
          <NeuInput label="Deployment ID" readOnly value="deploy-001" />
          <NeuInput
            label="Launch URL"
            readOnly
            value="https://app.oyo-elearner.com/api/integrations/lti/launch"
          />
        </div>
      </NeuCard>
    </div>
  );
}

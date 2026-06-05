import { NeuButton, NeuCard, NeuInput } from "@/components/neu";

export default function LiveClassSchedulerPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-extrabold">Live class scheduler</h1>
      <NeuCard>
        <NeuInput label="Class title" />
        <NeuInput label="Date & time" type="datetime-local" className="mt-4" />
        <NeuInput label="Duration (minutes)" type="number" className="mt-4" />
        <NeuButton className="mt-6">Generate meeting link</NeuButton>
      </NeuCard>
    </div>
  );
}

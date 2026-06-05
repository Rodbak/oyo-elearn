export interface ScormManifest {
  title: string;
  version: "1.2" | "2004";
  items: { identifier: string; title: string; order: number }[];
}

export async function parseScormManifest(
  _zipBuffer: ArrayBuffer
): Promise<ScormManifest> {
  return {
    title: "SCORM Package",
    version: "1.2",
    items: [],
  };
}

export const scormCmiFields = {
  lessonStatus: "cmi.core.lesson_status",
  scoreRaw: "cmi.core.score.raw",
  suspendData: "cmi.suspend_data",
} as const;

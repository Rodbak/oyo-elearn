export const PLAN_LIMITS = {
  free: {
    name: "Free",
    maxCourses: 3,
    maxStudents: 50,
    maxStorageMb: 2048,
    liveClasses: false,
    aiTutor: false,
    scormLti: false,
  },
  pro: {
    name: "Pro",
    maxCourses: -1,
    maxStudents: 500,
    maxStorageMb: 51200,
    liveClasses: true,
    aiTutor: true,
    scormLti: true,
  },
  enterprise: {
    name: "Enterprise",
    maxCourses: -1,
    maxStudents: -1,
    maxStorageMb: -1,
    liveClasses: true,
    aiTutor: true,
    scormLti: true,
  },
} as const;

export type PlanSlug = keyof typeof PLAN_LIMITS;

export function hasFeature(
  plan: string,
  feature: keyof (typeof PLAN_LIMITS)["free"]
): boolean {
  const limits = PLAN_LIMITS[plan as PlanSlug] ?? PLAN_LIMITS.free;
  const value = limits[feature];
  if (typeof value === "boolean") return value;
  return true;
}

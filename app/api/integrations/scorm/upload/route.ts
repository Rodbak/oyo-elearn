import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.institutionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "SCORM .zip required" }, { status: 400 });
  }

  if (!file.name.endsWith(".zip")) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  return NextResponse.json({
    title: "Imported SCORM Course",
    version: "1.2",
    structure: [
      { id: "sco-1", title: "Module 1", order: 0 },
      { id: "sco-2", title: "Module 2", order: 1 },
    ],
    message:
      "Manifest parsing stub — wire imsmanifest.xml parser and Cloudinary asset storage.",
  });
}

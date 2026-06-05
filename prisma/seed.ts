import { config } from "dotenv";
import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

config({ path: ".env" });

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 12);

  const freePlan = await prisma.plan.upsert({
    where: { slug: "free" },
    update: {},
    create: {
      name: "Free",
      slug: "free",
      price: 0,
      currency: "NGN",
      features: ["3 courses", "50 students", "2GB storage"],
      maxStudents: 50,
      maxCourses: 3,
      maxStorage: 2048,
    },
  });

  const proPlan = await prisma.plan.upsert({
    where: { slug: "pro" },
    update: {},
    create: {
      name: "Pro",
      slug: "pro",
      price: 49999,
      currency: "NGN",
      features: ["Unlimited courses", "500 students", "Live classes", "AI"],
      maxStudents: 500,
      maxCourses: -1,
      maxStorage: 51200,
    },
  });

  const institution = await prisma.institution.upsert({
    where: { slug: "lagos-academy" },
    update: {},
    create: {
      name: "Lagos Academy",
      slug: "lagos-academy",
      plan: "pro",
    },
  });

  await prisma.subscription.upsert({
    where: { id: "seed-sub-lagos" },
    update: {},
    create: {
      id: "seed-sub-lagos",
      institutionId: institution.id,
      planId: proPlan.id,
      status: "ACTIVE",
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      paymentProvider: "paystack",
    },
  });

  const users: { email: string; name: string; role: UserRole }[] = [
    { email: "superadmin@oyo.test", name: "Platform Admin", role: "SUPER_ADMIN" },
    {
      email: "admin@lagos-academy.test",
      name: "Institution Admin",
      role: "INSTITUTION_ADMIN",
    },
    {
      email: "instructor@lagos-academy.test",
      name: "Dr. Amara Okafor",
      role: "INSTRUCTOR",
    },
    { email: "student@lagos-academy.test", name: "Ada Okonkwo", role: "STUDENT" },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        name: u.name,
        role: u.role,
        passwordHash,
        institutionId:
          u.role === "SUPER_ADMIN" ? undefined : institution.id,
      },
    });
  }

  const instructor = await prisma.user.findUnique({
    where: { email: "instructor@lagos-academy.test" },
  });
  const student = await prisma.user.findUnique({
    where: { email: "student@lagos-academy.test" },
  });

  if (instructor && student) {
    const course = await prisma.course.upsert({
      where: { id: "seed-course-cs" },
      update: {},
      create: {
        id: "seed-course-cs",
        title: "Introduction to Computer Science",
        description: "Foundations of programming and computational thinking.",
        institutionId: institution.id,
        instructorId: instructor.id,
        status: "PUBLISHED",
        isPublic: true,
      },
    });

    const section = await prisma.courseSection.upsert({
      where: { id: "seed-section-1" },
      update: {},
      create: {
        id: "seed-section-1",
        courseId: course.id,
        title: "Getting started",
        order: 0,
      },
    });

    await prisma.lesson.upsert({
      where: { id: "seed-lesson-1" },
      update: {},
      create: {
        id: "seed-lesson-1",
        sectionId: section.id,
        title: "Welcome & syllabus",
        type: "VIDEO",
        order: 0,
        duration: 500,
      },
    });

    await prisma.enrollment.upsert({
      where: {
        studentId_courseId: {
          studentId: student.id,
          courseId: course.id,
        },
      },
      update: {},
      create: {
        studentId: student.id,
        courseId: course.id,
        progress: 68,
      },
    });
  }

  console.log("Seed complete. Plans:", freePlan.slug, proPlan.slug);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

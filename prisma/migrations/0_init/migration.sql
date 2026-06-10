-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'INSTITUTION_ADMIN', 'INSTRUCTOR', 'STUDENT', 'GUARDIAN');
CREATE TYPE "CourseStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "LessonType" AS ENUM ('VIDEO', 'QUIZ', 'DOCUMENT', 'LIVE');
CREATE TYPE "IntegrationType" AS ENUM ('SCORM', 'LTI', 'GOOGLE_CLASSROOM');
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'PAST_DUE', 'TRIALING');
CREATE TYPE "NotificationType" AS ENUM ('WELCOME', 'ASSIGNMENT_POSTED', 'ASSIGNMENT_GRADED', 'LIVE_CLASS_REMINDER', 'CERTIFICATE_ISSUED', 'LOW_ATTENDANCE', 'PAYMENT_FAILED', 'SUBSCRIPTION_EXPIRING', 'GENERAL');

-- CreateTable
CREATE TABLE "Institution" ("id" TEXT NOT NULL, "name" TEXT NOT NULL, "slug" TEXT NOT NULL, "plan" TEXT NOT NULL DEFAULT 'free', "logoUrl" TEXT, "settings" JSONB, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Institution_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "Institution_slug_key" ON "Institution"("slug");

CREATE TABLE "User" ("id" TEXT NOT NULL, "name" TEXT NOT NULL, "email" TEXT NOT NULL, "emailVerified" TIMESTAMP(3), "passwordHash" TEXT, "image" TEXT, "role" "UserRole" NOT NULL DEFAULT 'STUDENT', "institutionId" TEXT, "avatarUrl" TEXT, "isActive" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "User_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_institutionId_idx" ON "User"("institutionId");
CREATE INDEX "User_email_idx" ON "User"("email");

CREATE TABLE "Account" ("id" TEXT NOT NULL, "userId" TEXT NOT NULL, "type" TEXT NOT NULL, "provider" TEXT NOT NULL, "providerAccountId" TEXT NOT NULL, "refresh_token" TEXT, "access_token" TEXT, "expires_at" INTEGER, "token_type" TEXT, "scope" TEXT, "id_token" TEXT, "session_state" TEXT, CONSTRAINT "Account_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

CREATE TABLE "Session" ("id" TEXT NOT NULL, "sessionToken" TEXT NOT NULL, "userId" TEXT NOT NULL, "expires" TIMESTAMP(3) NOT NULL, CONSTRAINT "Session_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

CREATE TABLE "VerificationToken" ("identifier" TEXT NOT NULL, "token" TEXT NOT NULL, "expires" TIMESTAMP(3) NOT NULL);
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

CREATE TABLE "GuardianLink" ("id" TEXT NOT NULL, "guardianId" TEXT NOT NULL, "studentId" TEXT NOT NULL, CONSTRAINT "GuardianLink_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "GuardianLink_guardianId_studentId_key" ON "GuardianLink"("guardianId", "studentId");

CREATE TABLE "Course" ("id" TEXT NOT NULL, "title" TEXT NOT NULL, "description" TEXT, "institutionId" TEXT NOT NULL, "instructorId" TEXT NOT NULL, "status" "CourseStatus" NOT NULL DEFAULT 'DRAFT', "thumbnailUrl" TEXT, "isPublic" BOOLEAN NOT NULL DEFAULT false, "scormPackageUrl" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Course_pkey" PRIMARY KEY ("id"));
CREATE INDEX "Course_institutionId_idx" ON "Course"("institutionId");
CREATE INDEX "Course_instructorId_idx" ON "Course"("instructorId");

CREATE TABLE "CourseSection" ("id" TEXT NOT NULL, "courseId" TEXT NOT NULL, "title" TEXT NOT NULL, "order" INTEGER NOT NULL DEFAULT 0, CONSTRAINT "CourseSection_pkey" PRIMARY KEY ("id"));
CREATE INDEX "CourseSection_courseId_idx" ON "CourseSection"("courseId");

CREATE TABLE "Lesson" ("id" TEXT NOT NULL, "sectionId" TEXT NOT NULL, "title" TEXT NOT NULL, "type" "LessonType" NOT NULL DEFAULT 'VIDEO', "muxAssetId" TEXT, "content" TEXT, "order" INTEGER NOT NULL DEFAULT 0, "duration" INTEGER, CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id"));
CREATE INDEX "Lesson_sectionId_idx" ON "Lesson"("sectionId");

CREATE TABLE "Enrollment" ("id" TEXT NOT NULL, "studentId" TEXT NOT NULL, "courseId" TEXT NOT NULL, "progress" DOUBLE PRECISION NOT NULL DEFAULT 0, "completedAt" TIMESTAMP(3), "certificateId" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "Enrollment_studentId_courseId_key" ON "Enrollment"("studentId", "courseId");
CREATE UNIQUE INDEX "Enrollment_certificateId_key" ON "Enrollment"("certificateId");
CREATE INDEX "Enrollment_courseId_idx" ON "Enrollment"("courseId");

CREATE TABLE "Quiz" ("id" TEXT NOT NULL, "lessonId" TEXT NOT NULL, "questions" JSONB NOT NULL, "passMark" INTEGER NOT NULL DEFAULT 70, CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "Quiz_lessonId_key" ON "Quiz"("lessonId");

CREATE TABLE "QuizAttempt" ("id" TEXT NOT NULL, "quizId" TEXT NOT NULL, "studentId" TEXT NOT NULL, "score" DOUBLE PRECISION NOT NULL, "answers" JSONB NOT NULL, "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("id"));
CREATE INDEX "QuizAttempt_quizId_studentId_idx" ON "QuizAttempt"("quizId", "studentId");

CREATE TABLE "Assignment" ("id" TEXT NOT NULL, "courseId" TEXT NOT NULL, "title" TEXT NOT NULL, "description" TEXT, "dueDate" TIMESTAMP(3), "maxScore" INTEGER NOT NULL DEFAULT 100, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id"));
CREATE INDEX "Assignment_courseId_idx" ON "Assignment"("courseId");

CREATE TABLE "Submission" ("id" TEXT NOT NULL, "assignmentId" TEXT NOT NULL, "studentId" TEXT NOT NULL, "fileUrl" TEXT, "grade" DOUBLE PRECISION, "feedback" TEXT, "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Submission_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "Submission_assignmentId_studentId_key" ON "Submission"("assignmentId", "studentId");

CREATE TABLE "LiveClass" ("id" TEXT NOT NULL, "courseId" TEXT NOT NULL, "title" TEXT NOT NULL, "scheduledAt" TIMESTAMP(3) NOT NULL, "duration" INTEGER NOT NULL DEFAULT 60, "meetingUrl" TEXT, "recordingUrl" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "LiveClass_pkey" PRIMARY KEY ("id"));
CREATE INDEX "LiveClass_courseId_idx" ON "LiveClass"("courseId");

CREATE TABLE "Attendance" ("id" TEXT NOT NULL, "liveClassId" TEXT, "courseId" TEXT, "studentId" TEXT NOT NULL, "joinedAt" TIMESTAMP(3), "leftAt" TIMESTAMP(3), "duration" INTEGER, "isPresent" BOOLEAN NOT NULL DEFAULT false, "markedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id"));
CREATE INDEX "Attendance_studentId_idx" ON "Attendance"("studentId");
CREATE INDEX "Attendance_liveClassId_idx" ON "Attendance"("liveClassId");

CREATE TABLE "Certificate" ("id" TEXT NOT NULL, "enrollmentId" TEXT NOT NULL, "studentId" TEXT NOT NULL, "courseId" TEXT NOT NULL, "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "verifyCode" TEXT NOT NULL, CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "Certificate_enrollmentId_key" ON "Certificate"("enrollmentId");
CREATE UNIQUE INDEX "Certificate_verifyCode_key" ON "Certificate"("verifyCode");

CREATE TABLE "Discussion" ("id" TEXT NOT NULL, "courseId" TEXT NOT NULL, "lessonId" TEXT, "userId" TEXT NOT NULL, "body" TEXT NOT NULL, "parentId" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Discussion_pkey" PRIMARY KEY ("id"));
CREATE INDEX "Discussion_courseId_idx" ON "Discussion"("courseId");

CREATE TABLE "Notification" ("id" TEXT NOT NULL, "userId" TEXT NOT NULL, "type" "NotificationType" NOT NULL DEFAULT 'GENERAL', "payload" JSONB, "isRead" BOOLEAN NOT NULL DEFAULT false, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Notification_pkey" PRIMARY KEY ("id"));
CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");

CREATE TABLE "Integration" ("id" TEXT NOT NULL, "institutionId" TEXT NOT NULL, "type" "IntegrationType" NOT NULL, "config" JSONB, "isActive" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Integration_pkey" PRIMARY KEY ("id"));
CREATE INDEX "Integration_institutionId_idx" ON "Integration"("institutionId");

CREATE TABLE "Plan" ("id" TEXT NOT NULL, "name" TEXT NOT NULL, "slug" TEXT NOT NULL, "price" DOUBLE PRECISION NOT NULL DEFAULT 0, "currency" TEXT NOT NULL DEFAULT 'USD', "features" JSONB, "maxStudents" INTEGER NOT NULL DEFAULT 50, "maxCourses" INTEGER NOT NULL DEFAULT 3, "maxStorage" INTEGER NOT NULL DEFAULT 2048, CONSTRAINT "Plan_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "Plan_slug_key" ON "Plan"("slug");

CREATE TABLE "Subscription" ("id" TEXT NOT NULL, "institutionId" TEXT NOT NULL, "planId" TEXT NOT NULL, "status" "SubscriptionStatus" NOT NULL DEFAULT 'TRIALING', "currentPeriodEnd" TIMESTAMP(3), "paymentProvider" TEXT, "externalId" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id"));
CREATE INDEX "Subscription_institutionId_idx" ON "Subscription"("institutionId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "GuardianLink" ADD CONSTRAINT "GuardianLink_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "GuardianLink" ADD CONSTRAINT "GuardianLink_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Course" ADD CONSTRAINT "Course_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Course" ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CourseSection" ADD CONSTRAINT "CourseSection_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "CourseSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "LiveClass" ADD CONSTRAINT "LiveClass_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_liveClassId_fkey" FOREIGN KEY ("liveClassId") REFERENCES "LiveClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Discussion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

export const dictionary = {
  common: {
    language: "Language",
    english: "English",
    french: "French",
    loading: "Loading…",
  },
  nav: {
    features: "Features",
    pricing: "Pricing",
    about: "About",
    contact: "Contact",
    login: "Log in",
    getStarted: "Get started",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
  },
  landing: {
    tagline: "THE BEST LEARNING MANAGEMENT SYSTEM",
    heroTitle: "Teach, learn, and grow —",
    heroTitleAccent: "together",
    heroSubtitle:
      "OYO-Elearner is a full-stack SaaS eLearning platform for K-12, universities, and vocational institutes across Africa and the world.",
    startFree: "Start free",
    viewPricing: "View pricing",
    featuresTitle: "Everything your institution needs",
    featuresSubtitle:
      "From course delivery to billing — one neumorphic, accessible platform.",
    trustedBy: "Trusted by institutions",
    freemiumTitle: "Freemium that scales with you",
    freemiumSubtitle:
      "Start free with 3 courses and 50 students. Upgrade to Pro for live classes, AI tutoring, and LMS integrations.",
    createInstitution: "Create your institution",
    ctaTitle: "Ready to transform learning?",
    talkToTeam: "Talk to our team",
    features: {
      mux: {
        title: "Mux-powered lectures",
        description:
          "HLS streaming, resume playback, and auto-generated captions for every lesson.",
      },
      live: {
        title: "Live classes & attendance",
        description:
          "Schedule Zoom or Meet sessions with real-time presence tracking via Socket.io.",
      },
      ai: {
        title: "AI tutor & quiz builder",
        description:
          "GPT-4o tutoring in the course player and syllabus-to-quiz generation for instructors.",
      },
      certs: {
        title: "Verifiable certificates",
        description:
          "Auto-issue PDF certificates with public verification codes on course completion.",
      },
      integrations: {
        title: "SCORM, LTI & Classroom",
        description:
          "Import SCORM packages, LTI 1.3 launches, and sync with Google Classroom.",
      },
      multiTenant: {
        title: "Multi-tenant institutions",
        description:
          "Schools, universities, and vocational centres each get branded workspaces.",
      },
    },
  },
  pricing: {
    title: "Simple, transparent pricing",
    subtitle:
      "Freemium for Africa — Paystack for NGN/GHS/KES, Stripe internationally.",
    free: {
      name: "Free",
      period: "forever",
      description: "For small pilots and single departments",
      cta: "Start free",
    },
    pro: {
      name: "Pro",
      period: "/month",
      description: "For growing schools and faculties",
      cta: "Upgrade to Pro",
    },
    enterprise: {
      name: "Enterprise",
      period: "",
      description: "SSO, SLA, white-label, dedicated support",
      cta: "Contact sales",
    },
    comparisonFeature: "Feature",
    features: {
      liveClasses: "Live classes",
      aiTutoring: "AI tutoring",
      scormLti: "SCORM / LTI",
      googleClassroom: "Google Classroom",
      sso: "SSO",
    },
    tierFeatures: {
      free: [
        "1 institution",
        "3 courses",
        "50 students",
        "2GB storage",
        "Basic certificates",
      ],
      pro: [
        "Unlimited courses",
        "500 students",
        "50GB storage",
        "Live classes",
        "AI tutor & quiz generator",
        "SCORM & LTI",
        "Paystack & Stripe billing",
      ],
      enterprise: [
        "Custom limits",
        "SSO & SAML",
        "Dedicated support",
        "White-label branding",
        "Grade passback SLA",
      ],
    },
  },
  about: {
    title: "About OYO-Elearner",
    intro:
      "OYO-Elearner was created to bring world-class course delivery — inspired by Coursera — into the institutional workflows that African schools and global campuses already trust.",
    missionTitle: "Our mission",
    mission:
      "Empower every institution to onboard students, deliver blended learning, track attendance, award verifiable certificates, and integrate with existing school management systems — under a fair freemium model.",
    serveTitle: "Who we serve",
    serve: [
      "K-12 schools with guardian visibility",
      "Universities and polytechnics",
      "Vocational and skills training centres",
      "Platform operators (SuperAdmin tooling)",
    ],
  },
  contact: {
    title: "Contact us",
    subtitle:
      "Enterprise, partnerships, or support — we typically respond within 24 hours.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send message",
    success: "Thank you! Your message has been received.",
  },
  auth: {
    welcomeBack: "Welcome back",
    signInSubtitle: "Choose your role, then sign in",
    signingIn: "Signing in…",
    signIn: "Sign in",
    forgotPassword: "Forgot password?",
    continueGoogle: "Continue with Google",
    noAccount: "No account?",
    register: "Register",
    registerAs: "Register as",
    createAccount: "Create account",
    registerSubtitle:
      "Your account is saved locally in the database for future logins",
    registerAsLabel: "Register as",
    signInAsLabel: "I am signing in as",
    creating: "Creating…",
    createBtn: "Create account",
    hasAccount: "Already have an account?",
    fullName: "Full name",
    password: "Password",
    email: "Email",
    resetTitle: "Reset password",
    resetSubtitle:
      "Enter your email and we will send a reset link via Resend.",
    sendReset: "Send reset link",
    backToSignIn: "Back to sign in",
    portalStudent: "Student",
    portalInstructor: "Instructor",
    portalInstitution: "Institution",
    sessionFailed:
      "Session could not be created. Check database connection.",
    registerFailed: "Registration failed. Is the database running?",
    createdSignInFailed:
      "Account created but sign-in failed. Try logging in from the login page.",
  },
  footer: {
    tagline:
      "Institutional eLearning built for African and global education — from K-12 to university and vocational training.",
    product: "Product",
    company: "Company",
    copyright: "All rights reserved.",
  },
  dashboard: {
    student: "Student",
    instructor: "Instructor",
    admin: "Admin",
    superadmin: "SuperAdmin",
    home: "Home",
    courses: "Courses",
    assignments: "Assignments",
    certificates: "Certificates",
    attendance: "Attendance",
    courseBuilder: "Course builder",
    liveClasses: "Live classes",
    gradebook: "Gradebook",
    aiQuiz: "AI Quiz",
    overview: "Overview",
    users: "Users",
    integrations: "Integrations",
    billing: "Billing",
    platform: "Platform",
    institutions: "Institutions",
    signOut: "Sign out",
    notifications: "Notifications",
    toggleSidebar: "Toggle sidebar",
    mobileNav: "Mobile navigation",
  },
} as const;

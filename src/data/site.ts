
import type { ImageMetadata } from "astro";
import type { PhotoKey } from "./photos";
import daksh from "../assets/team/daksh.jpg";
import sammy from "../assets/team/sammy.jpg";
import nitish from "../assets/team/nitish.jpg";
import rohan from "../assets/team/rohan.jpg";

export const site = {
  name: "RoboZone",
  url: "https://robozone.world",
  founded: 2024,
  origin: "South Brunswick, New Jersey",
  originShort: "South Brunswick, NJ",
  email: "team@robozonenj.org",
  description:
    "RoboZone is a student-led robotics education initiative. Younger students learn electronics, programming, and design through hands-on projects, starting with in-person workshops in South Brunswick, New Jersey.",
  mission: "Student-led robotics education: younger students learn electronics, programming, and design by building real projects.",
} as const;

export const brand = {
  alternateNames: ["Robo Zone", "RoboZone NJ"],
  slogan: "Build a circuit. Write the code. See it work.",
  locality: "South Brunswick",
  region: "NJ",
  country: "US",
  knowsAbout: [
    "Robotics education",
    "Electronics",
    "Arduino",
    "C++ programming",
    "Computer-aided design",
    "3D printing",
    "Circuit simulation",
  ],
} as const;

export const links = {
  donate: "https://hcb.hackclub.com/donations/start/robozone",
  hackClub: "https://hackclub.com/",
  onshape: "https://www.onshape.com/",
  arduino: "https://www.arduino.cc/",
} as const;

export const fiscalSponsor = {
  name: "Hack Club",
  statement: "RoboZone is fiscally sponsored by Hack Club, a 501(c)(3) nonprofit.",
} as const;

export function mailto(subject?: string) {
  return subject
    ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${site.email}`;
}

export const impact = {
  scope: "Since 2024",
  items: [
    { value: "90+", label: "students taught" },
    { value: "160", label: "workshop hours" },
    { value: "15+", label: "mentors involved" },
  ],
} as const;

export type Maturity = "established" | "exploring" | "in-development" | "retired";

export const maturityLabel: Record<Maturity, string> = {
  established: "Established",
  exploring: "Being explored",
  "in-development": "In development",
  retired: "No longer offered",
};

export type OfferingId = "in-person" | "online" | "branches";

export interface Offering {
  id: OfferingId;
  name: string;
  maturity: Maturity;
  summary: string;
  noSessionText: string;
  openQuestions?: string;
  highlights?: string[];
  href: string;
  inquiry: { label: string; subject: string };
}

export const offerings: Record<OfferingId, Offering> = {
  "in-person": {
    id: "in-person",
    name: "In-person workshops",
    maturity: "established",
    summary:
      "Our original course in South Brunswick, New Jersey. In small groups, students wire circuits, program Arduinos in C++, design parts in CAD, and build a final project.",
    noSessionText: "Next session not scheduled",
    href: "/program#in-person",
    inquiry: { label: "Ask about future sessions", subject: "Future in-person sessions in South Brunswick" },
  },
  online: {
    id: "online",
    name: "Online classes",
    maturity: "exploring",
    summary:
      "We're planning free, 60-minute online workshops in circuit simulation and CAD. Students will build virtual circuits and create digital 3D models, with no physical circuit building or 3D printing.",
    noSessionText: "Dates not announced",
    openQuestions: "Pilot dates, eligible audiences, registration, and platform arrangements are not yet confirmed.",
    highlights: ["Free", "60 minutes, weekly", "Circuit simulation + CAD", "Entirely online"],
    href: "/program#online",
    inquiry: { label: "Email us about online classes", subject: "Interest in RoboZone online classes" },
  },
  branches: {
    id: "branches",
    name: "Local branches",
    maturity: "exploring",
    summary:
      "Local groups in other communities that would run hands-on workshops using RoboZone's teaching approach.",
    noSessionText: "No other branches yet",
    openQuestions: "We'd start with a single pilot branch. Approval, support, and money arrangements are still being worked out.",
    href: "/program#branches",
    inquiry: { label: "Discuss a local program", subject: "A RoboZone program in my community" },
  },
};

export const inPersonCourse = {
  weeks: 8,
  summary:
    "Over eight weeks of in-person workshops, students wire real circuits, program them in C++ on an Arduino, design parts in CAD, and finish with a project of their own.",
  facts: {
    audience: "Grades 4–8",
    audienceNote: "Confirmed for each session when it's announced.",
    experience: "None needed",
    experienceNote: "Challenges come in different levels, so experienced students have room to go further.",
    format: "8 weeks of in-person workshops, about 2 hours each",
    formatNote: "Small groups taught by high school mentors.",
    venue: "Code Ninjas, Kendall Park",
    venueNote: "Since our first session (held in a garage), our workshops have met here. The next session's location will be listed when it's announced.",
    cost: "Listed before you register",
    costNote: "Families in past sessions received billing details by email after signing up.",
  },
} as const;

export const onlineWorkshops = {
  decided: [
    {
      term: "Cost",
      value: "Free",
      note: "All online workshops, not just a first group. No tuition, fees, kits, or required purchases.",
    },
    { term: "Sessions", value: "60 minutes, once a week", note: "Course length and dates will be announced together." },
    {
      term: "What students do",
      value: "Circuit simulation and CAD",
      note: "Build and program virtual circuits and create digital 3D models.",
    },
    {
      term: "Equipment",
      value: "A computer with internet access",
      note: "No physical electronics, kits, 3D printing, or paid software. Platforms will be listed before registration.",
    },
  ],
  activities: [
    "Build and test circuits on virtual breadboards",
    "Explore voltage, current, and resistance",
    "Program simulated microcontrollers and debug the results",
    "Create, edit, and present digital 3D models in CAD",
    "Finish with a project: a circuit simulation, a CAD model, or both",
  ],
  donationNote:
    "Online workshops are free. Donations to RoboZone are separate and never affect a student's place or the help they get.",
} as const;

export const sessionHistory: { season: string; title: string; venue: string; photo: PhotoKey }[] = [
  { season: "Summer 2024", title: "Where it started", venue: "Our first session, held in a garage", photo: "busyTable" },
  { season: "Winter 2024–25", title: "At Code Ninjas", venue: "Code Ninjas, Kendall Park", photo: "cadPlanning" },
  { season: "Summer 2025", title: "At Code Ninjas", venue: "Code Ninjas, Kendall Park", photo: "wiringTogether" },
];

export type SessionState = "upcoming" | "open" | "full" | "closed" | "completed";

export interface Session {
  offering: OfferingId;
  name: string;
  state: SessionState;
  dates?: string;
  schedule?: string;
  location?: string;
  timezone?: string;
  grades?: number[];
  fee?: string;
  capacity?: number;
  registrationOpens?: string;
  registrationCloses?: string;
  registration?: { kind: "signup-form" } | { kind: "link"; url: string };
  afterRegistering?: string;
}

export const sessions: Session[] = [];

export interface Stage {
  id: string;
  label: string;
  title: string;
  summary: string;
  topics: string[];
}

export const curriculum: Stage[] = [
  {
    id: "circuits",
    label: "Circuits",
    title: "Light up an LED",
    summary:
      "Students start with real parts on a breadboard: an Arduino, jumper wires, resistors, and LEDs. Once the LED lights up, they learn why.",
    topics: [
      "Arduino, breadboards, wires, resistors, and LEDs",
      "Voltage, current, and resistance",
      "Ohm's law and reading resistor values",
    ],
  },
  {
    id: "code",
    label: "Code and input",
    title: "Make it respond",
    summary:
      "Next, students add a button and write the C++ code that connects it to the LED. Then they change the program so the button works in reverse.",
    topics: [
      "Button-controlled LED circuits",
      "Inverted-button programming challenge",
      "Circuits with two LEDs",
      "Reading schematics and using capacitors",
    ],
  },
  {
    id: "motion-cad",
    label: "Motion and CAD",
    title: "Make it move, then design the parts",
    summary:
      "Students wire and program servo motors, meet transistors, and start using computer-aided design (CAD) in Onshape to model parts like an organizer.",
    topics: [
      "Motor types, with a focus on servos",
      "Servo circuits and extension challenges",
      "Transistors",
      "CAD in Onshape: designing organizers and other models",
    ],
  },
  {
    id: "final",
    label: "Final project",
    title: "Build something of your own",
    summary:
      "To finish, students design and 3D print parts, build and program a minigame circuit, and present what they made.",
    topics: [
      "Designing and 3D printing project parts",
      "Building and programming a minigame circuit",
      "Presenting the finished project",
    ],
  },
];

export const builds = [
  {
    title: "Button-controlled LEDs",
    body: "Wire a pushbutton and an LED, write the code that links them, then rewrite it so pressing the button does the opposite.",
    concepts: ["Digital input and output", "C++ on Arduino"],
  },
  {
    title: "Servo mechanisms",
    body: "Connect a servo motor, program it to move to set positions, and take on extension challenges once it works.",
    concepts: ["Motors", "Control in code"],
  },
  {
    title: "CAD organizers",
    body: "Design an organizer or another model in Onshape, a CAD program that runs in the browser.",
    concepts: ["Computer-aided design", "3D modeling"],
  },
  {
    title: "Minigame with printed parts",
    body: "Combine a circuit, code, and 3D-printed parts into a small game, then present it to the group.",
    concepts: ["3D printing", "Putting it all together"],
  },
] as const;

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: ImageMetadata;
}

export const team: TeamMember[] = [
  {
    name: "Samuel Asefa",
    role: "Co-Founder & Co-President",
    bio: "Student at South Brunswick High School and a member of VEX Robotics team 750W. Competes in Science Olympiad and has two cats.",
    photo: sammy,
  },
  {
    name: "Daksh Gupta",
    role: "Co-Founder & Co-President",
    bio: "Student at South Brunswick High School and a member of VEX Robotics team 750W. Works on computer science projects and spends time with friends, family, and his dogs.",
    photo: daksh,
  },
  {
    name: "Nitish Pendyala",
    role: "Co-Founder & Co-President",
    bio: "Student at South Brunswick High School and a member of his school's VEX Robotics team. Plays volleyball and likes hiking and camping.",
    photo: nitish,
  },
  {
    name: "Rohan Kunala",
    role: "Co-Founder & Co-President",
    bio: "Student at South Brunswick High School, active in STEM clubs and innovation research competitions. Likes traveling and camping with family and friends.",
    photo: rohan,
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const faqGeneral: FaqItem[] = [
  {
    q: "Is RoboZone only in New Jersey?",
    a: "For now, yes. RoboZone started in South Brunswick, New Jersey, and all of our workshops so far have been held in person there. We're planning free online workshops and exploring local branches in other communities, but neither has launched.",
  },
  {
    q: "Are online classes running yet?",
    a: "Not yet. We're planning free, 60-minute online workshops in circuit simulation and CAD. Class dates and registration have not been announced. If you're interested, you can email us; that's a question, not a registration.",
  },
  {
    q: "Will online classes cost anything?",
    a: "No. All RoboZone online workshops will be free: no tuition, fees, kits, or required purchases. Donations to RoboZone are separate and never affect a student's place.",
  },
  {
    q: "What will students need for online classes?",
    a: "A computer with internet access. Everything happens on screen: students build virtual circuits and create digital 3D models, with no physical electronics, kits, or 3D printing. We'll list the specific free platforms and device requirements before registration opens.",
  },
  {
    q: "How do local workshops relate to future branches?",
    a: "Our South Brunswick workshops are where RoboZone's teaching approach comes from. A branch would be a group in another community running workshops with that approach. The idea is being explored: no other branches exist yet, and there's no set process for starting one.",
  },
  {
    q: "Can a school or library talk to you about hosting?",
    a: "Yes. Near South Brunswick, a school, library, or community space can talk with us about hosting in-person workshops. Hosting workshops doesn't make an organization a RoboZone branch. If you're farther away, we're glad to discuss a possible program in your community, keeping in mind that branches are still being explored.",
  },
  {
    q: "How can I ask about future offerings?",
    a: `Email ${site.email}, or use the links on the Program updates page for local sessions, online classes, mentoring, or hosting. Emailing us doesn't reserve a spot or add you to a mailing list.`,
  },
];

export const faqInPerson: FaqItem[] = [
  {
    q: "Does my child need any experience?",
    a: "No. The in-person course starts with lighting a single LED on a breadboard. Challenges come in different levels, so students who already know some electronics or code still have something to work on.",
  },
  {
    q: "What grades is the in-person course for?",
    a: "Grades 4–8. We confirm the grade range for each session when it's announced.",
  },
  {
    q: "What will they build?",
    a: "LED and button circuits, servo mechanisms, parts designed in Onshape, and a final minigame that combines a circuit, code, and 3D-printed parts. One student built an automatic plant-watering machine.",
  },
  {
    q: "Where and when has it met?",
    a: "Our first session, in summer 2024, was held in a garage. Since then, our workshops have been held at Code Ninjas in Kendall Park. The course runs eight weeks, with workshops of about two hours each. The next session will list its own dates, times, and location.",
  },
  {
    q: "How much does it cost?",
    a: "The fee is listed with each session before you register. In past sessions, families received billing details by email after signing up. If you have questions about cost, email us.",
  },
  {
    q: "How has sign-up worked?",
    a: "For past sessions, families filled out a short form on this site with the student's name and grade and a guardian's contact details, then received a confirmation and billing details by email, usually within about two business days. When the next session opens, its sign-up will appear on the Program updates page.",
  },
];

import type { ImageMetadata } from "astro";

import breadboardWiring from "../assets/photos/2024-summer-breadboard-wiring.jpg";
import onshapeCad from "../assets/photos/2024-summer-onshape-cad.jpg";
import plantProject from "../assets/photos/2024-summer-plant-watering-project.jpg";
import busyTable from "../assets/photos/2024-summer-busy-table.jpg";
import mentorCheckIn from "../assets/photos/2024-summer-mentor-check-in.jpg";
import workshopRoom from "../assets/photos/2024-summer-workshop-room.jpg";
import handsOnWiring from "../assets/photos/2024-summer-hands-on-wiring.jpg";
import mentorsWatching from "../assets/photos/2024-summer-mentors-watching.jpg";
import mentorCode from "../assets/photos/2024-summer-mentor-code.jpg";
import buildLedCase from "../assets/photos/2024-winter-build-led-case.jpg";
import cadPlanning from "../assets/photos/2024-winter-cad-planning.jpg";
import ballGame from "../assets/photos/2025-winter-build-ball-game.jpg";
import ledThumbsUp from "../assets/photos/2025-summer-led-thumbs-up.jpg";
import wiringTogether from "../assets/photos/2025-summer-wiring-together.jpg";
import printedEnclosures from "../assets/photos/2025-summer-printed-enclosures.jpg";
import buildWiredCase from "../assets/photos/2025-summer-build-wired-case.jpg";
import buildServoPanel from "../assets/photos/2025-summer-build-servo-panel.jpg";

export type PhotoSession = "Summer 2024" | "Winter 2024–25" | "Summer 2025";

export interface WorkshopPhoto {
  src: ImageMetadata;
  session: PhotoSession;
  alt: string;
  caption: string;
  position?: string;
}

export const photos = {
  ledThumbsUp: {
    src: ledThumbsUp,
    session: "Summer 2025",
    alt: "Two smiling students at a workshop table. One gives a thumbs-up behind a breadboard circuit wired to an Arduino Uno.",
    caption: "Two students with their breadboard circuit.",
    position: "50% 30%",
  },
  wiringTogether: {
    src: wiringTogether,
    session: "Summer 2025",
    alt: "Two students lean in together to place wires on a breadboard connected to a small microcontroller board, with a laptop and a 9V battery on the table.",
    caption: "Wiring a circuit together.",
    position: "40% 45%",
  },
  printedEnclosures: {
    src: printedEnclosures,
    session: "Summer 2025",
    alt: "Three 3D-printed cases on a wooden table: a gray one with a green insert, a blue one with cutouts and labels, and an orange one with rows of square holes.",
    caption: "3D-printed project cases.",
    position: "50% 50%",
  },
  buildWiredCase: {
    src: buildWiredCase,
    session: "Summer 2025",
    alt: "A black 3D-printed case with a breadboard and dozens of jumper wires behind it, connected to a 9V battery.",
    caption: "A project in a 3D-printed case, wired on a breadboard and powered by a 9V battery.",
    position: "50% 45%",
  },
  buildServoPanel: {
    src: buildServoPanel,
    session: "Summer 2025",
    alt: "A black 3D-printed panel with a small servo and a lit green LED on the front, beside breadboards and a spare servo.",
    caption: "A 3D-printed panel with a servo and an LED.",
    position: "50% 45%",
  },

  buildLedCase: {
    src: buildLedCase,
    session: "Winter 2024–25",
    alt: "A blue 3D-printed box with a servo and glowing LEDs, wired to an Arduino-compatible board and a breadboard.",
    caption: "A 3D-printed box with LEDs and a servo, wired to an Arduino-compatible board.",
    position: "55% 55%",
  },
  ballGame: {
    src: ballGame,
    session: "Winter 2024–25",
    alt: "A gray 3D-printed box with a servo mounted in one corner and a small yellow ball inside.",
    caption: "A 3D-printed box with a servo and a ball.",
    position: "50% 50%",
  },
  cadPlanning: {
    src: cadPlanning,
    session: "Winter 2024–25",
    alt: "Students working at laptops in a classroom, with a paper sketch and a ruler on the table beside them.",
    caption: "Working from a paper sketch and measurements.",
    position: "45% 50%",
  },

  plantProject: {
    src: plantProject,
    session: "Summer 2024",
    alt: "A smiling student holds up a wired project built on a small breadboard. Mentors in blue RoboZone shirts stand around them, holding other parts of the build.",
    caption: "A student's automatic plant-watering machine, shown with RoboZone mentors.",
    position: "50% 40%",
  },
  breadboardWiring: {
    src: breadboardWiring,
    session: "Summer 2024",
    alt: "A student pushes a jumper wire into a breadboard connected to an Arduino Uno while another student watches.",
    caption: "Wiring a breadboard to an Arduino Uno.",
    position: "38% 62%",
  },
  onshapeCad: {
    src: onshapeCad,
    session: "Summer 2024",
    alt: "A student looks at a laptop showing a 3D model in Onshape. Arduino boards, a breadboard, and jumper wires sit on the table, with a 3D printer in the background.",
    caption: "Designing a part in Onshape, with the electronics from earlier stages still on the table.",
    position: "45% 50%",
  },
  mentorCode: {
    src: mentorCode,
    session: "Summer 2024",
    alt: "A mentor in glasses leans between two students at laptops, with breadboard circuits on the table in front of them.",
    caption: "Laptops and breadboard circuits side by side, with a mentor at the table.",
    position: "50% 40%",
  },
  mentorCheckIn: {
    src: mentorCheckIn,
    session: "Summer 2024",
    alt: "A RoboZone mentor leans over two students working on laptops, with a small circuit on the table.",
    caption: "A mentor checking in on two students' work.",
    position: "50% 35%",
  },
  workshopRoom: {
    src: workshopRoom,
    session: "Summer 2024",
    alt: "A workshop in progress: mentors in blue RoboZone shirts help students at tables covered with laptops, breadboards, and wires.",
    caption: "Small groups, with mentors moving between tables.",
    position: "50% 50%",
  },
  busyTable: {
    src: busyTable,
    session: "Summer 2024",
    alt: "A crowded workshop table: students at laptops and breadboards while RoboZone mentors lean in and point.",
    caption: "Mentors and students around one table.",
    position: "50% 40%",
  },
  handsOnWiring: {
    src: handsOnWiring,
    session: "Summer 2024",
    alt: "A student pushes wires into a breadboard connected to an Arduino Uno, with other students working at the same table and a mentor standing behind them.",
    caption: "Wiring a breadboard at a shared table, with a mentor close by.",
    position: "50% 45%",
  },
  mentorsWatching: {
    src: mentorsWatching,
    session: "Summer 2024",
    alt: "Four mentors in RoboZone shirts stand behind two students working at a laptop.",
    caption: "Mentors gathered around two students at a laptop.",
    position: "50% 40%",
  },
} satisfies Record<string, WorkshopPhoto>;

export type PhotoKey = keyof typeof photos;

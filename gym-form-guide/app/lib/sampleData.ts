import type { Exercise } from "./types";

export const sampleExercises: Exercise[] = [
  {
    id: "ex_leg_press",
    name: "Leg Press",
    slug: "leg-press",
    equipmentType: "Machine",
    bodyParts: ["legs", "glutes"],
    aliases: ["leg push", "press machine", "sled press"],
    setupCues: ["Set the seat so knees track over toes", "Feet flat on platform"],
    formCues: ["Control the descent", "Do not lock out hard at the top"],
    commonMistakes: ["Knees collapsing inward", "Going too deep and rounding hips"],
    clips: [
      {
        id: "clip_lp_1",
        title: "Leg press setup and form",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        demonstratorPreference: "any",
        expertise: "beginner",
        goals: ["muscle", "strength"],
      },
    ],
  },
  {
    id: "ex_lat_pulldown",
    name: "Lat Pulldown",
    slug: "lat-pulldown",
    equipmentType: "Machine",
    bodyParts: ["back"],
    aliases: ["pull down", "lat machine", "cable pulldown"],
    setupCues: ["Set thigh pad snug", "Grip just outside shoulder width"],
    formCues: ["Pull elbows down", "Keep chest up"],
    commonMistakes: ["Leaning back too far", "Pulling behind the neck"],
    clips: [
      {
        id: "clip_lpdown_1",
        title: "Lat pulldown basics",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        demonstratorPreference: "any",
        expertise: "beginner",
        goals: ["muscle"],
      },
    ],
  },
];
export type ExpertiseLevel = "beginner" | "intermediate";

export type Goal = "strength" | "muscle" | "fat-loss" | "mobility";

export type DemonstratorPreference = "any" | "female" | "male";

export type Clip = {
  id: string;
  title: string;
  url: string;
  durationSeconds?: number;
  demonstratorPreference?: DemonstratorPreference;
  expertise?: ExpertiseLevel;
  goals?: Goal[];
};

export type Exercise = {
  id: string;
  name: string;
  slug: string;
  equipmentType: string;
  bodyParts: string[];
  aliases: string[];
  setupCues: string[];
  formCues: string[];
  commonMistakes: string[];
  clips: Clip[];
};
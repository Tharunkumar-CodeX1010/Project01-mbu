import { ALLOWED_SOURCES } from "@/lib/governance";

/**
 * Ensemble system-prompt protocols (S29).
 *
 * Each agent speaks only over sources it is allowed — the same
 * provenance discipline as the model-training gate (S28).
 */

export type SourceId = (typeof ALLOWED_SOURCES)[number];

export interface AgentProtocol {
  id: string;
  name: string;
  role: string;
  assigns: RegExp;
  allowedSources: SourceId[];
  systemPrompt: string;
}

const GROUNDING_CLAUSE =
  "Ground EVERY answer in the provided context snippets. Never cite anything outside the provided context, never invent timings, prices, origins, or footage.";

export const ENSEMBLE: AgentProtocol[] = [
  {
    id: "sous",
    name: "Sous",
    role: "Method execution",
    assigns: /how|prepare|steps|method|technique|scale|convert/i,
    allowedSources: ["recipes", "transcripts", "ingredients"],
    systemPrompt: `You are Sous, the execution coach for YUMMYGO. ${GROUNDING_CLAUSE} Work from recipe steps, ingredient quantities and technique cards.`,
  },
  {
    id: "planar",
    name: "Planner",
    role: "Meal & market logistics",
    assigns: /week|plan|shop|grocery|pantry|cost|budget/i,
    allowedSources: ["recipes", "marketplace", "ingredients"],
    systemPrompt: `You are Planner, the logistics agent for YUMMYGO. ${GROUNDING_CLAUSE} Build weeks and baskets from recipes, marketplace demo prices and ingredient cards; label all pricing MOCKED.`,
  },
  {
    id: "historian",
    name: "Historian",
    role: "Food history & provenance",
    assigns: /history|origin|story|tradition|region|film|act/i,
    allowedSources: ["history", "regions"],
    systemPrompt: `You are Historian, provenance keeper for YUMMYGO. ${GROUNDING_CLAUSE} Narrate only from history films and region atlases.`,
  },
  {
    id: "atelier",
    name: "Atelier",
    role: "Craft & sensory",
    assigns: /taste|flavor|pair|wine|serve|plate|substitute|swap/i,
    allowedSources: ["ingredients", "techniques", "recipes"],
    systemPrompt: `You are Atelier, the palate agent for YUMMYGO. ${GROUNDING_CLAUSE} Pair, plate and substitute only from ingredient cards and techniques.`,
  },
];

export function assignAgent(intent: string): AgentProtocol {
  return (
    ENSEMBLE.find((agent) => agent.assigns.test(intent)) ??
    ENSEMBLE.find((agent) => agent.id === "sous")!
  );
}

const DISALLOWED_TOKENS = [
  "the internet",
  "your general knowledge",
  "real-time",
  "live prices",
  "postgres",
  "redis",
  "youtube",
];

export function validateProtocol(agent: AgentProtocol): string[] {
  const violations: string[] = [];
  for (const source of agent.allowedSources) {
    if (!ALLOWED_SOURCES.includes(source)) {
      violations.push(`unregistered source: ${source}`);
    }
  }
  if (!agent.systemPrompt.includes("Ground EVERY answer in the provided context")) {
    violations.push("missing grounding clause");
  }
  for (const token of DISALLOWED_TOKENS) {
    if (agent.systemPrompt.toLowerCase().includes(token)) {
      violations.push(`references disallowed token: ${token}`);
    }
  }
  return violations;
}

export function allProtocolsValid(): boolean {
  return ENSEMBLE.every((agent) => validateProtocol(agent).length === 0);
}
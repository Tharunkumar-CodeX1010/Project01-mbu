/** Editorial annotations on content, clearly marked as human notes. */
export interface Annotation {
  icon: string;
  label: string;
  body: string;
}

const NOTES: Record<string, Annotation[]> = {
  "pizza-napoletana": [
    {
      icon: "⚲",
      label: "Editors' note",
      body: "Margherita Extra (STG) is the EU-registered specialty; our variant respects the dough window but adds home-oven flexibility.",
    },
  ],
  "mutton-biryani": [
    {
      icon: "⚲",
      label: "Editors' note",
      body: "Transit-time weight is how the porters of Calcutta read broth strength — flavor is cargo, not filling.",
    },
  ],
  "ceviche-clasico": [
    {
      icon: "⚲",
      label: "FoAM start",
      body: "Lime cure, not fire: fish cooks in acidity in under 10 minutes; over four more, it turns opaque and chewy.",
    },
  ],
};

export function annotationsFor(slug: string): Annotation[] {
  return NOTES[slug] ?? [];
}
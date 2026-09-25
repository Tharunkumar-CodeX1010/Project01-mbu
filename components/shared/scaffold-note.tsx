import { Badge } from "@/components/ui";

interface ScaffoldNoteProps {
  section: number;
  title: string;
}

export function ScaffoldNote({ section, title }: ScaffoldNoteProps) {
  return (
    <p className="text-ink-faint mt-6 text-sm">
      <Badge variant="outline" className="mr-2">
        Scaffold
      </Badge>
      This module is scaffolded. Its dedicated experience — {title} — is
      scheduled for Section {String(section).padStart(2, "0")}.
    </p>
  );
}
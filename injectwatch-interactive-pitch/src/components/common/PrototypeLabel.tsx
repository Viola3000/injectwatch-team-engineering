import { FlaskConical } from "lucide-react";

export function PrototypeLabel({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`prototype-label ${compact ? "is-compact" : ""}`} role="note">
      <FlaskConical aria-hidden="true" size={compact ? 14 : 16} />
      <span>Concept prototype</span>
      <span aria-hidden="true">·</span>
      <span>Synthetic scenario</span>
      <span aria-hidden="true">·</span>
      <span>No live field connection</span>
    </div>
  );
}


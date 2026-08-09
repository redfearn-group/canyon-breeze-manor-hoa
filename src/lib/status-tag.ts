// Maps this app's status vocabulary onto brand.css's five accessible tag
// colors (tag-red, tag-green, tag-neutral, tag-tawny, tag-ember) instead of
// inventing a tag-<status> class per status, so every tag inherits the
// vetted light/dark contrast handling brand.css already did the work for.
const STATUS_TAG: Record<string, string> = {
  // Meetings
  upcoming: "tag-tawny",
  held: "tag-neutral",
  cancelled: "tag-neutral",
  // Policies and notices
  adopted: "tag-green",
  sent: "tag-green",
  // Asset and zone condition
  ok: "tag-green",
  "needs-repair": "tag-tawny",
  failed: "tag-red",
  unknown: "tag-neutral",
  // Irrigation issues
  open: "tag-red",
  monitoring: "tag-tawny",
  resolved: "tag-green",
  // Issue severity
  high: "tag-red",
  medium: "tag-tawny",
  low: "tag-neutral",
  // Tree health
  healthy: "tag-green",
  stressed: "tag-tawny",
  dead: "tag-red",
  "needs-replant": "tag-ember",
  removed: "tag-neutral",
};

export function statusTagClass(status: string): string {
  return STATUS_TAG[status] ?? "tag-neutral";
}

// Zone fill on the map keys off its worst open issue, falling back to the
// zone's own condition when nothing is open against it.
/** Colour for a zone shape on the map.
 *
 * A zone has two independent signals: the condition someone recorded for it,
 * and the worst severity among its open issues. **The map shows the worse of
 * the two.** An earlier version tested severity first and returned on a match,
 * so a zone recorded as `failed` carrying one low-severity issue painted green
 * "Working" while the table beside it said the condition was failed. A map that
 * understates a problem is worse than no map. */
export function zoneStatusClass(
  condition: string,
  worstOpenSeverity?: "low" | "medium" | "high"
): string {
  // Higher is worse. Ranks are shared so the two signals can be compared.
  const RANK = { ok: 0, "zone--ok": 0, "needs-repair": 1, low: 0, medium: 1, high: 2, failed: 2 } as const;
  const CLASS_FOR_RANK = ["zone--ok", "zone--due-soon", "zone--overdue"];

  const conditionKnown = condition === "ok" || condition === "needs-repair" || condition === "failed";
  const conditionRank = conditionKnown ? RANK[condition as keyof typeof RANK] : -1;
  const severityRank = worstOpenSeverity != null ? RANK[worstOpenSeverity] : -1;

  const worst = Math.max(conditionRank, severityRank);
  // Neither signal present: not yet assessed.
  if (worst < 0) return "zone--never";
  return CLASS_FOR_RANK[worst];
}

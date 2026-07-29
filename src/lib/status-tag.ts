// Maps this app's status vocabulary onto brand.css's five accessible tag
// colors (tag-red, tag-green, tag-neutral, tag-tawny, tag-ember) instead of
// inventing a tag-<status> class per status, so every tag inherits the
// vetted light/dark contrast handling brand.css already did the work for.
const STATUS_TAG: Record<string, string> = {
  // Meetings
  upcoming: "tag-tawny",
  held: "tag-neutral",
  cancelled: "tag-neutral",
  // Policies / notices
  draft: "tag-tawny",
  adopted: "tag-green",
  sent: "tag-green",
  // Contracts
  active: "tag-green",
  expired: "tag-red",
  "pending-renewal": "tag-tawny",
  unclear: "tag-tawny",
  "not-renewed": "tag-neutral",
  // Expenses
  paid: "tag-green",
  pending: "tag-tawny",
  disputed: "tag-red",
};

export function statusTagClass(status: string): string {
  return STATUS_TAG[status] ?? "tag-neutral";
}

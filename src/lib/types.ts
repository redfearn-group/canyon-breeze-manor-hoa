// Every field on these interfaces renders publicly. data.ts loads YAML
// straight through with no field-level filtering, so a field carrying a
// resident name, unit number, vendor name, or an unpublished dollar
// figure does not belong on a type in this file. It belongs in the
// private board tracker repo.

export interface Meeting {
  id: string;
  date: string;
  type: "monthly-board" | "annual-homeowners";
  status: "upcoming" | "held" | "cancelled";
}

export interface GovernanceOfficer {
  role: string;
}

export interface Governance {
  entityName: string;
  communityName: string;
  entityType: string;
  entityStatusNotes: string;
  officers: GovernanceOfficer[];
  boardTermNotes: string;
  architecturalReview: string;
}

export interface Policy {
  id: string;
  phase: number;
  title: string;
  status: "adopted";
  ccrBasis: string[];
  rules: string[];
  enforcement: string;
  noticeHistory?: string;
}

export interface Notice {
  id: string;
  title: string;
  text: string;
}

export interface BudgetLine {
  category: string;
  amount: number;
}

export interface BudgetYear {
  fiscalYear: string;
  periodStart: string;
  periodEnd: string;
  adopted: boolean;
  documentPath?: string;
  income: BudgetLine[];
  expenses: BudgetLine[];
  notes?: string;
}

export interface AssociationDocument {
  id: string;
  title: string;
  path: string;
  note?: string;
}

export interface Association {
  sourceUrl: string;
  dues: { amount: number; period: string; effective: string; covers: string[] };
  ownerResponsibilities: string;
  insurance: {
    masterPolicy: string;
    carrier: string;
    carrierPhone: string;
    ownerRequirement: string;
  };
  newOwnerFees: { name: string; amount: number }[];
  newOwnerNotes: string;
  documents: AssociationDocument[];
}

// ---------------------------------------------------------------------
// Irrigation and landscaping
//
// Common-area assets only. Controller enclosure locations, access detail,
// vendor names, and repair costs are private. `x`/`y` are coordinates in
// the base map's SVG viewBox space, not latitude/longitude: this site
// publishes no geographic coordinates.
// ---------------------------------------------------------------------

export type AssetCondition = "ok" | "needs-repair" | "failed" | "unknown";

export interface Controller {
  id: string;
  label: string;
  areaServed: string;
  zoneCount: number;
  condition: AssetCondition;
  x?: number;
  y?: number;
  notes?: string;
}

export type HeadType = "rotor" | "spray" | "drip" | "bubbler" | "mixed" | "unknown";
export type PlantType = "lawn" | "shrub-bed" | "rock-bed" | "tree-ring" | "park" | "mixed";

export interface Zone {
  id: string;
  controllerId: string;
  label: string;
  area: string;
  headType: HeadType;
  plantType: PlantType;
  condition: AssetCondition;
  sunExposure?: "full-sun" | "partial-shade" | "shade";
  notes?: string;
}

export interface ScheduleEntry {
  zoneId: string;
  season: "spring" | "summer" | "fall";
  days: string[];
  startTime: string;
  runtimeMinutes: number;
  effectiveDate: string;
}

export interface IrrigationAsset {
  id: string;
  type: "backflow-preventer" | "master-valve" | "mainline-shutoff" | "valve-box";
  controllerId?: string;
  label: string;
  condition: AssetCondition;
  x?: number;
  y?: number;
}

export type IssueCategory =
  | "dead-spot"
  | "schedule-timing"
  | "equipment-failure"
  | "water-waste";

export interface Issue {
  id: string;
  zoneId?: string;
  assetId?: string;
  category: IssueCategory;
  status: "open" | "monitoring" | "resolved";
  severity: "low" | "medium" | "high";
  summary: string;
  openedDate: string;
  resolvedDate?: string | null;
}

export type TreeHealth =
  | "healthy"
  | "stressed"
  | "dead"
  | "needs-replant"
  | "removed";

export interface Tree {
  id: string;
  species: string;
  commonName: string;
  zoneId?: string;
  planted?: string;
  health: TreeHealth;
  braced: boolean;
  replantPriority?: number;
  x?: number;
  y?: number;
  notes?: string;
}

// Seasonal service. Due status is computed by matching this itemType
// against ServiceEvent entries carrying the SAME itemType. An event with
// good prose but the wrong itemType is invisible here and the controller
// reads as never serviced.
export type ServiceItemType =
  | "spring-startup"
  | "mid-season-audit"
  | "fall-winterization";

export interface ServiceScheduleItem {
  itemType: ServiceItemType;
  name: string;
  intervalMonths: number;
}

export interface ServiceEvent {
  id: string;
  itemType: ServiceItemType;
  controllerId: string;
  date: string;
  performedBy: "association" | "contractor";
  notes?: string;
}

export interface WaterUsage {
  month: string;
  meterLabel: string;
  gallons: number;
}

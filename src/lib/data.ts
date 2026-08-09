import { readData } from "./kit/yaml";
import type {
  Meeting,
  BudgetYear,
  Governance,
  Policy,
  Notice,
  Association,
  Controller,
  Zone,
  ScheduleEntry,
  IrrigationAsset,
  Issue,
  Tree,
  ServiceScheduleItem,
  ServiceEvent,
  WaterUsage,
} from "./types";

export function getMeetings(): Meeting[] {
  return readData<{ meetings: Meeting[] }>("meetings.yaml", { meetings: [] })
    .meetings;
}

export function getUpcomingMeeting(): Meeting | null {
  const upcoming = getMeetings()
    .filter((m) => m.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
  return upcoming[0] ?? null;
}

export function getBudgets(): BudgetYear[] {
  return readData<{ budgets: BudgetYear[] }>("budget.yaml", { budgets: [] })
    .budgets;
}

export function getGovernance(): Governance | null {
  return readData<Governance | null>("governance.yaml", null);
}

export function getPolicies(): Policy[] {
  return readData<{ policies: Policy[] }>("policies.yaml", { policies: [] })
    .policies;
}

export function getNotices(): Notice[] {
  return readData<{ notices: Notice[] }>("policies.yaml", { notices: [] })
    .notices;
}

export function getAssociation(): Association | null {
  return readData<Association | null>("association.yaml", null);
}

// --- Irrigation and landscaping ---------------------------------------

export function getControllers(): Controller[] {
  return readData<{ controllers: Controller[] }>(
    "irrigation/controllers.yaml",
    { controllers: [] }
  ).controllers;
}

export function getZones(): Zone[] {
  return readData<{ zones: Zone[] }>("irrigation/zones.yaml", { zones: [] })
    .zones;
}

export function getSchedule(): ScheduleEntry[] {
  return readData<{ schedule: ScheduleEntry[] }>("irrigation/schedule.yaml", {
    schedule: [],
  }).schedule;
}

export function getIrrigationAssets(): IrrigationAsset[] {
  return readData<{ assets: IrrigationAsset[] }>("irrigation/assets.yaml", {
    assets: [],
  }).assets;
}

export function getIssues(): Issue[] {
  return readData<{ issues: Issue[] }>("irrigation/issues.yaml", { issues: [] })
    .issues;
}

export function getServiceSchedule(): ServiceScheduleItem[] {
  return readData<{ items: ServiceScheduleItem[] }>("irrigation/service.yaml", {
    items: [],
  }).items;
}

export function getServiceEvents(): ServiceEvent[] {
  return readData<{ events: ServiceEvent[] }>("irrigation/service.yaml", {
    events: [],
  }).events;
}

export function getTrees(): Tree[] {
  return readData<{ trees: Tree[] }>("trees.yaml", { trees: [] }).trees;
}

export function getWaterUsage(): WaterUsage[] {
  return readData<{ usage: WaterUsage[] }>("water-usage.yaml", { usage: [] })
    .usage;
}

// Open issues for a zone, worst first. Drives both the zone tables and
// the map's per-zone status colour.
export function getOpenIssuesByZone(): Map<string, Issue[]> {
  const rank = { high: 0, medium: 1, low: 2 } as const;
  const byZone = new Map<string, Issue[]>();
  for (const issue of getIssues()) {
    if (issue.status === "resolved" || !issue.zoneId) continue;
    const list = byZone.get(issue.zoneId) ?? [];
    list.push(issue);
    byZone.set(issue.zoneId, list);
  }
  for (const list of byZone.values()) {
    list.sort((a, b) => rank[a.severity] - rank[b.severity]);
  }
  return byZone;
}

import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";
import type { Meeting, Contract, Expense, BudgetYear, TaskItem, Governance, Policy } from "./types";

const DATA_DIR = path.resolve(process.cwd(), "data");

function readYaml<T>(filePath: string, fallback: T): T {
  if (!fs.existsSync(filePath)) return fallback;
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = yaml.load(raw);
  return (parsed as T) ?? fallback;
}

export function getMeetings(): Meeting[] {
  return readYaml<{ meetings: Meeting[] }>(
    path.join(DATA_DIR, "meetings.yaml"),
    { meetings: [] }
  ).meetings;
}

export function getUpcomingMeeting(): Meeting | null {
  const upcoming = getMeetings()
    .filter((m) => m.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
  return upcoming[0] ?? null;
}

export function getContracts(): Contract[] {
  return readYaml<{ contracts: Contract[] }>(
    path.join(DATA_DIR, "contracts.yaml"),
    { contracts: [] }
  ).contracts;
}

export function getExpenses(): Expense[] {
  return readYaml<{ expenses: Expense[] }>(
    path.join(DATA_DIR, "expenses.yaml"),
    { expenses: [] }
  ).expenses;
}

export function getBudgets(): BudgetYear[] {
  return readYaml<{ budgets: BudgetYear[] }>(
    path.join(DATA_DIR, "budget.yaml"),
    { budgets: [] }
  ).budgets;
}

export function getTasks(): TaskItem[] {
  return readYaml<{ tasks: TaskItem[] }>(path.join(DATA_DIR, "tasks.yaml"), {
    tasks: [],
  }).tasks;
}

export function getGovernance(): Governance | null {
  return readYaml<Governance | null>(
    path.join(DATA_DIR, "governance.yaml"),
    null
  );
}

export function getPolicies(): Policy[] {
  return readYaml<{ policies: Policy[] }>(
    path.join(DATA_DIR, "policies.yaml"),
    { policies: [] }
  ).policies;
}

export interface Meeting {
  id: string;
  date: string;
  type: "monthly-board" | "annual-homeowners";
  status: "upcoming" | "held" | "cancelled";
  agenda: string[];
  hasMinutes: boolean;
  notes?: string;
}

export interface GovernanceOfficer {
  name: string;
  role: string;
  since: string;
  priorRole?: string;
}

export interface Governance {
  entityName: string;
  entityType: string;
  entityStatusNotes: string;
  openComplianceItems: string[];
  officers: GovernanceOfficer[];
  boardTermNotes: string;
}

export interface Policy {
  id: string;
  phase: number;
  title: string;
  status: "draft" | "adopted";
  ccrBasis: string[];
  rules: string[];
  enforcement: string;
}

export interface Contract {
  slug: string;
  name: string;
  category: string;
  status: "active" | "expired" | "pending-renewal";
  renewalDate: string | null;
  noticeRequiredDays: number | null;
  notes?: string;
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  status: "paid" | "pending" | "disputed";
  note?: string;
}

export interface BudgetYear {
  fiscalYear: string;
  categories: string[];
  notes?: string;
}

export interface TaskItem {
  id: number;
  title: string;
  notes?: string;
  status: "open" | "done";
  priority?: "critical";
  createdDate: string;
  completedDate?: string | null;
}

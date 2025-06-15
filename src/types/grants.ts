
export type GrantStatus = 
  | "draft" 
  | "submitted" 
  | "under_review" 
  | "approved" 
  | "rejected" 
  | "modifications_requested"
  | "active"
  | "completed";

export type FundingSource = 
  | "ori" 
  | "external" 
  | "government" 
  | "private" 
  | "foundation"
  | "industry";

export type GrantCategory = 
  | "ori" 
  | "external" 
  | "government" 
  | "fellowships"
  | "scholarships"
  | "travel_conference"
  | "industry_design"
  | "research" 
  | "education" 
  | "community" 
  | "infrastructure" 
  | "innovation";

export type NotificationType = 
  | "opportunity" 
  | "due_date" 
  | "report_submission" 
  | "status_update"
  | "grant_response"
  | "ip_update"
  | "call_notification"
  | "review_assignment"
  | "award_notification"
  | "milestone_due"
  | "contract_ready";

export type IPType = 
  | "patent" 
  | "copyright" 
  | "trademark" 
  | "trade_secret";

export type ProjectPhase =
  | "pre_award_application"
  | "pre_award_review"
  | "award"
  | "post_award_tracking"
  | "post_award_reporting"
  | "completed";

export type ReportType =
  | "progress"
  | "milestone"
  | "budget"
  | "performance"
  | "monitoring_evaluation"
  | "final"
  | "ip_disclosure";

export interface Grant {
  id: string;
  title: string;
  description: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: GrantStatus;
  category: GrantCategory;
  fundingSource: FundingSource;
  phase: ProjectPhase;
  submittedBy?: string;
  submittedDate?: string;
  researcherId?: string;
  researcherName?: string;
  department?: string;
  reviewComments?: string;
  reviewedBy?: string;
  reviewedDate?: string;
  activities?: string[];
  budget?: Record<string, number>;
  student_participation?: boolean;
  work_plan?: string;
  milestones?: Milestone[];
  deliverables?: Deliverable[];
  contracts?: Contract[];
}

export interface GrantOpportunity {
  id: string;
  title: string;
  description: string;
  fundingAmount: number;
  deadline: string;
  eligibility: string;
  category: GrantCategory;
  fundingSource: FundingSource;
  requirements: string[];
  applicationUrl?: string;
  postedBy?: string;
  postedDate?: string;
  isActive: boolean;
  maxAmount?: number;
  minAmount?: number;
  duration?: string;
  eligibleApplicants?: string[];
}

export interface GrantReport {
  id: string;
  grantId: string;
  title: string;
  type: ReportType;
  dueDate: string;
  submissionDate?: string;
  status: "pending" | "submitted" | "approved" | "rejected" | "overdue";
  comments?: string;
  attachments?: string[];
  reviewedBy?: string;
  reviewedDate?: string;
}

export interface Milestone {
  id: string;
  grantId: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "in_progress" | "completed" | "overdue";
  completionDate?: string;
  deliverables?: string[];
}

export interface Deliverable {
  id: string;
  grantId: string;
  milestoneId?: string;
  title: string;
  description: string;
  type: "research_output" | "publication" | "prototype" | "report" | "presentation" | "other";
  submissionDate?: string;
  status: "pending" | "submitted" | "approved" | "rejected";
  fileUrl?: string;
}

export interface Contract {
  id: string;
  grantId: string;
  type: "grant_agreement" | "mou" | "amendment";
  title: string;
  status: "draft" | "pending_signature" | "signed" | "expired";
  createdDate: string;
  signedDate?: string;
  fileUrl?: string;
  signatories: string[];
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  relatedId?: string;
  relatedType?: "grant" | "report" | "opportunity" | "event" | "milestone" | "contract";
  priority: "low" | "medium" | "high" | "urgent";
}

export interface IPItem {
  id: string;
  title: string;
  type: IPType;
  registrationNumber?: string;
  filingDate: string;
  grantId: string;
  researchers: string[];
  status: "disclosed" | "filed" | "pending" | "approved" | "rejected";
  description?: string;
  commercializationPotential?: "high" | "medium" | "low";
  patentOffice?: string;
}

export interface GrantCall {
  id: string;
  title: string;
  description: string;
  category: GrantCategory;
  fundingSource: FundingSource;
  openDate: string;
  closeDate: string;
  maxAmount: number;
  minAmount?: number;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  evaluationCriteria: string[];
  isActive: boolean;
  createdBy: string;
  createdDate: string;
}

export interface ReviewAssignment {
  id: string;
  applicationId: string;
  reviewerId: string;
  reviewerName: string;
  assignedDate: string;
  dueDate: string;
  status: "assigned" | "in_progress" | "completed" | "overdue";
  score?: number;
  comments?: string;
  recommendation: "approve" | "reject" | "revise" | "pending";
}

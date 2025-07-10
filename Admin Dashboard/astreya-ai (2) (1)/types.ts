export enum Department {
  Traffic = 'Traffic',
  Sanitation = 'Sanitation',
  Water = 'Water Works',
  Power = 'Power Grid',
  PublicWorks = 'Public Works',
  Health = 'Health Services',
}

export enum Severity {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical',
}

export enum Status {
  Submitted = 'Submitted',
  Triaged = 'AI Triaged',
  Assigned = 'Assigned',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
  Closed = 'Closed',
}

export interface Incident {
  id: string;
  type: string;
  description: string;
  department: Department;
  severity: Severity;
  status: Status;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  reportedAt: Date;
  reporter: {
    name: string;
    credibility: number;
  };
  media?: {
    type: 'image' | 'video';
    url: string;
  };
}

export interface AiTriageResult {
  summary: string;
  priority: Severity;
  recommendations: string[];
}

export interface DepartmentInfo {
    name: Department;
    email: string;
    phone: string;
    head: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface AiCitySummary {
    situation: string;
    recommendations: string[];
}
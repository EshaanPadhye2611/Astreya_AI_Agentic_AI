import { Department, Severity, Status, DepartmentInfo } from './types';
import UsersIcon from './components/icons/UsersIcon';

export const DEPARTMENTS: Department[] = [
  Department.Traffic,
  Department.Sanitation,
  Department.Water,
  Department.Power,
  Department.PublicWorks,
  Department.Health,
];

export const DEPARTMENT_DETAILS: DepartmentInfo[] = [
    { name: Department.Traffic, email: 'traffic@city.gov', phone: '555-0101', head: 'Capt. Eva Rostova', icon: UsersIcon },
    { name: Department.Sanitation, email: 'sanitation@city.gov', phone: '555-0102', head: 'Marcus Thorne', icon: UsersIcon },
    { name: Department.Water, email: 'water@city.gov', phone: '555-0103', head: 'Dr. Alani Vega', icon: UsersIcon },
    { name: Department.Power, email: 'power@city.gov', phone: '555-0104', head: 'Kenji Tanaka', icon: UsersIcon },
    { name: Department.PublicWorks, email: 'works@city.gov', phone: '555-0105', head: 'Priya Singh', icon: UsersIcon },
    { name: Department.Health, email: 'health@city.gov', phone: '555-0106', head: 'Dr. Ben Carter', icon: UsersIcon },
];


export const DEPARTMENT_COLORS: { [key in Department]: string } = {
  [Department.Traffic]: 'bg-blue-100 text-blue-800',
  [Department.Sanitation]: 'bg-green-100 text-green-800',
  [Department.Water]: 'bg-cyan-100 text-cyan-800',
  [Department.Power]: 'bg-yellow-100 text-yellow-800',
  [Department.PublicWorks]: 'bg-purple-100 text-purple-800',
  [Department.Health]: 'bg-red-100 text-red-800',
};

export const SEVERITY_COLORS: { [key in Severity]: string } = {
  [Severity.Low]: 'bg-gray-200 text-gray-800',
  [Severity.Medium]: 'bg-yellow-400 text-yellow-900',
  [Severity.High]: 'bg-orange-500 text-white',
  [Severity.Critical]: 'bg-red-600 text-white',
};

export const STATUS_COLORS: { [key in Status]: string } = {
    [Status.Submitted]: 'bg-gray-200 text-gray-800',
    [Status.Triaged]: 'bg-indigo-200 text-indigo-800',
    [Status.Assigned]: 'bg-blue-200 text-blue-800',
    [Status.InProgress]: 'bg-yellow-200 text-yellow-800',
    [Status.Resolved]: 'bg-green-200 text-green-800',
    [Status.Closed]: 'bg-purple-200 text-purple-800',
};


// Explicit hex colors for charts
export const SEVERITY_CHART_COLORS: { [key in Severity]: string } = {
  [Severity.Low]: '#d1d5db',       // gray-300
  [Severity.Medium]: '#facc15',   // yellow-400
  [Severity.High]: '#f97316',      // orange-500
  [Severity.Critical]: '#dc2626',  // red-600
};

export const STATUS_CHART_COLORS: { [key in Status]: string } = {
  [Status.Submitted]: '#e5e7eb',   // gray-200
  [Status.Triaged]: '#a5b4fc',     // indigo-300
  [Status.Assigned]: '#93c5fd',     // blue-300
  [Status.InProgress]: '#fde047',  // yellow-300
  [Status.Resolved]: '#86efac',    // green-300
  [Status.Closed]: '#d8b4fe',      // purple-300
};
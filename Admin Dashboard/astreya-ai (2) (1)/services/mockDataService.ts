import { Incident, Department, Severity, Status } from '../types';

interface IncidentTemplate {
  type: string;
  description: string;
  department: Department;
  mediaSeed: string;
}

const incidentTemplates: IncidentTemplate[] = [
  {
    type: 'Pothole',
    description: 'A large, dangerous pothole has formed in the middle of the road, causing issues for traffic.',
    department: Department.PublicWorks,
    mediaSeed: 'pothole'
  },
  {
    type: 'Broken Streetlight',
    description: 'The main streetlight at the intersection has been out for three days, creating a safety hazard at night.',
    department: Department.Power,
    mediaSeed: 'streetlight'
  },
  {
    type: 'Garbage Overflow',
    description: 'The public dustbin is overflowing with garbage, and waste is spilling onto the sidewalk.',
    department: Department.Sanitation,
    mediaSeed: 'garbage'
  },
  {
    type: 'Water Leakage',
    description: 'There is a constant stream of water leaking from a pipe under the pavement, flooding the street corner.',
    department: Department.Water,
    mediaSeed: 'waterleak'
  },
  {
    type: 'Fallen Tree',
    description: 'A large tree branch has fallen during the storm and is blocking the right lane of the road.',
    department: Department.PublicWorks,
    mediaSeed: 'fallentree'
  },
  {
    type: 'Traffic Signal Malfunction',
    description: 'The traffic lights are stuck on red in one direction, causing a major traffic jam during peak hours.',
    department: Department.Traffic,
    mediaSeed: 'trafficsignal'
  },
  {
    type: 'Illegal Parking',
    description: 'A car has been illegally parked in front of the fire hydrant for over 24 hours, blocking access.',
    department: Department.Traffic,
    mediaSeed: 'parking'
  },
  {
    type: 'Stray Animal',
    description: 'A pack of stray dogs is causing a nuisance and safety concern in the neighborhood park.',
    department: Department.Health,
    mediaSeed: 'straydog'
  },
  {
    type: 'Power Outage',
    description: 'The entire block has been without power for the last 4 hours without any notification or update.',
    department: Department.Power,
    mediaSeed: 'poweroutage'
  }
];


const addresses = [
  '123 MG Road, Ashok Nagar', '456 100 Feet Road, Indiranagar', '789 JNC Road, Koramangala',
  '321 Bannerghatta Road, Jayanagar', '654 Outer Ring Road, Marathahalli', '987 Palace Road, Vasanth Nagar'
];
const reporters = [
  { name: 'Arjun Kumar', credibility: 85 },
  { name: 'Priya Sharma', credibility: 92 },
  { name: 'Rohan Gupta', credibility: 78 },
  { name: 'Sneha Patel', credibility: 95 },
];


function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getMockIncidents(count: number): Incident[] {
  const incidents: Incident[] = [];
  const bengaluruCenter = { lat: 12.9716, lng: 77.5946 };

  for (let i = 0; i < count; i++) {
    const template = getRandom(incidentTemplates);
    incidents.push({
      id: crypto.randomUUID(),
      type: template.type,
      description: template.description,
      department: template.department,
      severity: getRandom(Object.values(Severity)),
      status: getRandom(Object.values(Status)),
      location: {
        lat: bengaluruCenter.lat + (Math.random() - 0.5) * 0.3, // Spread around Bengaluru
        lng: bengaluruCenter.lng + (Math.random() - 0.5) * 0.3, 
        address: getRandom(addresses),
      },
      reportedAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7)), // within last 7 days
      reporter: getRandom(reporters),
      media: Math.random() > 0.6 ? { type: 'image', url: `https://picsum.photos/seed/${template.mediaSeed}/400/300` } : undefined
    });
  }
  return incidents;
}
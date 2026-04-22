import type { Component } from 'vue'
import {
  BriefcaseIcon,
  UsersIcon,
  DollarSignIcon,
  TrendingUpIcon,
} from 'lucide-vue-next'

export type ProjectStatus = 'On Track' | 'At Risk' | 'Delayed' | 'Completed'
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost'

export interface StatMetric {
  key: string
  label: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: Component
  accent: 'blue' | 'emerald' | 'amber' | 'violet'
}

export interface RevenuePoint {
  label: string
  revenue: number
  target: number
}

export interface ServiceBreakdown {
  service: string
  slug: string
  projects: number
  revenue: number
  share: number
}

export interface ProjectSummary {
  id: string
  name: string
  client: string
  service: string
  progress: number
  status: ProjectStatus
  dueDate: string
  team: string[]
}

export interface LeadSummary {
  id: string
  name: string
  company: string
  service: string
  estValue: number
  status: LeadStatus
  receivedAt: string
}

export interface ActivityEntry {
  id: string
  message: string
  actor: string
  timestamp: string
  kind: 'project' | 'lead' | 'invoice' | 'system'
}

export const stats: StatMetric[] = [
  {
    key: 'revenue',
    label: 'Monthly Revenue',
    value: '$184,250',
    change: 12.4,
    trend: 'up',
    icon: DollarSignIcon,
    accent: 'blue',
  },
  {
    key: 'projects',
    label: 'Active Projects',
    value: '24',
    change: 4.2,
    trend: 'up',
    icon: BriefcaseIcon,
    accent: 'emerald',
  },
  {
    key: 'clients',
    label: 'Active Clients',
    value: '38',
    change: 8.1,
    trend: 'up',
    icon: UsersIcon,
    accent: 'violet',
  },
  {
    key: 'pipeline',
    label: 'Open Pipeline',
    value: '$612,800',
    change: -2.3,
    trend: 'down',
    icon: TrendingUpIcon,
    accent: 'amber',
  },
]

export const revenueSeries: RevenuePoint[] = [
  { label: 'Nov', revenue: 118_400, target: 120_000 },
  { label: 'Dec', revenue: 132_900, target: 130_000 },
  { label: 'Jan', revenue: 141_200, target: 140_000 },
  { label: 'Feb', revenue: 152_700, target: 150_000 },
  { label: 'Mar', revenue: 164_500, target: 160_000 },
  { label: 'Apr', revenue: 184_250, target: 175_000 },
]

export const serviceBreakdown: ServiceBreakdown[] = [
  { service: 'SaaS Development', slug: 'saas-development', projects: 8, revenue: 72_400, share: 39 },
  { service: 'Web Development', slug: 'web-development', projects: 6, revenue: 48_900, share: 27 },
  { service: 'Mobile Development', slug: 'mobile-development', projects: 4, revenue: 31_200, share: 17 },
  { service: 'Technical Consulting', slug: 'consulting', projects: 3, revenue: 18_750, share: 10 },
  { service: 'UI/UX Design', slug: 'ui-ux', projects: 2, revenue: 8_300, share: 4 },
  { service: 'Maintenance & Support', slug: 'support', projects: 1, revenue: 4_700, share: 3 },
]

export const projects: ProjectSummary[] = [
  {
    id: 'PRJ-1042',
    name: 'Helix Analytics Platform',
    client: 'Helix Data Co.',
    service: 'SaaS Development',
    progress: 78,
    status: 'On Track',
    dueDate: 'May 14',
    team: ['AM', 'JD', 'KP'],
  },
  {
    id: 'PRJ-1039',
    name: 'NorthRider Mobile App',
    client: 'NorthRider Logistics',
    service: 'Mobile Development',
    progress: 54,
    status: 'At Risk',
    dueDate: 'May 02',
    team: ['SK', 'RV'],
  },
  {
    id: 'PRJ-1037',
    name: 'Atlas Client Portal',
    client: 'Atlas Consulting',
    service: 'Web Development',
    progress: 92,
    status: 'On Track',
    dueDate: 'Apr 29',
    team: ['MN', 'AM', 'BR'],
  },
  {
    id: 'PRJ-1031',
    name: 'PaySwift Billing Engine',
    client: 'PaySwift Inc.',
    service: 'SaaS Development',
    progress: 38,
    status: 'Delayed',
    dueDate: 'Jun 10',
    team: ['JD', 'TL'],
  },
  {
    id: 'PRJ-1024',
    name: 'Vivid Studio Rebrand',
    client: 'Vivid Studio',
    service: 'UI/UX Design',
    progress: 100,
    status: 'Completed',
    dueDate: 'Apr 12',
    team: ['BR', 'KP'],
  },
]

export const leads: LeadSummary[] = [
  {
    id: 'LD-2087',
    name: 'Rachel Singh',
    company: 'Lumen Health',
    service: 'SaaS Development',
    estValue: 84_000,
    status: 'Qualified',
    receivedAt: '2h ago',
  },
  {
    id: 'LD-2086',
    name: 'Marcus Reed',
    company: 'Beacon Logistics',
    service: 'Mobile Development',
    estValue: 52_500,
    status: 'Proposal',
    receivedAt: '5h ago',
  },
  {
    id: 'LD-2085',
    name: 'Priya Natarajan',
    company: 'OrbitWorks',
    service: 'Technical Consulting',
    estValue: 18_000,
    status: 'New',
    receivedAt: '1d ago',
  },
  {
    id: 'LD-2084',
    name: 'Tom Bradshaw',
    company: 'Greenline Retail',
    service: 'Web Development',
    estValue: 36_400,
    status: 'Contacted',
    receivedAt: '2d ago',
  },
  {
    id: 'LD-2083',
    name: 'Elena Park',
    company: 'Northwind Studios',
    service: 'UI/UX Design',
    estValue: 12_800,
    status: 'Won',
    receivedAt: '3d ago',
  },
]

export const activity: ActivityEntry[] = [
  {
    id: 'ACT-901',
    message: 'closed deal with Northwind Studios for $12,800',
    actor: 'Sara Mitchell',
    timestamp: '32 min ago',
    kind: 'lead',
  },
  {
    id: 'ACT-900',
    message: 'pushed milestone v0.7 to Helix Analytics Platform',
    actor: 'Adam Mansour',
    timestamp: '1h ago',
    kind: 'project',
  },
  {
    id: 'ACT-899',
    message: 'sent invoice INV-2041 to Atlas Consulting',
    actor: 'Billing Bot',
    timestamp: '3h ago',
    kind: 'invoice',
  },
  {
    id: 'ACT-898',
    message: 'flagged NorthRider Mobile App as At Risk',
    actor: 'System',
    timestamp: '5h ago',
    kind: 'system',
  },
  {
    id: 'ACT-897',
    message: 'qualified new lead from Lumen Health',
    actor: 'Jordan Davis',
    timestamp: '6h ago',
    kind: 'lead',
  },
]

// Mock data for the Community Health Alert System UI

export type CheckInFrequency = "daily" | "weekly"
export type CheckInStatus = "okay" | "needs_support" | "missed"
export type AlertStatus = "active" | "resolved"
export type AlertType = "missed_checkin" | "needs_support"

export interface Member {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  healthConditions: string[]
  checkInFrequency: CheckInFrequency
  preferredContact: "email" | "sms" | "both"
  emergencyContacts: EmergencyContact[]
  lastCheckIn: string | null
  consecutiveMissed: number
  joinedAt: string
}

export interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  email: string
}

export interface CheckIn {
  id: string
  memberId: string
  status: CheckInStatus
  notes: string | null
  supportNeeded: string | null
  createdAt: string
}

export interface Alert {
  id: string
  memberId: string
  type: AlertType
  status: AlertStatus
  message: string
  createdAt: string
  resolvedAt: string | null
  resolvedBy: string | null
  resolutionNotes: string | null
}

// Mock Members
export const mockMembers: Member[] = [
  {
    id: "1",
    firstName: "Eleanor",
    lastName: "Thompson",
    email: "eleanor.t@email.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1945-03-15",
    address: "123 Oak Street, Springfield, IL 62701",
    healthConditions: ["Diabetes Type 2", "Hypertension"],
    checkInFrequency: "daily",
    preferredContact: "email",
    emergencyContacts: [
      {
        id: "ec1",
        name: "Michael Thompson",
        relationship: "Son",
        phone: "(555) 234-5678",
        email: "michael.t@email.com"
      },
      {
        id: "ec2",
        name: "Sarah Thompson",
        relationship: "Daughter",
        phone: "(555) 345-6789",
        email: "sarah.t@email.com"
      }
    ],
    lastCheckIn: "2026-05-24T09:30:00Z",
    consecutiveMissed: 0,
    joinedAt: "2026-01-15T00:00:00Z"
  },
  {
    id: "2",
    firstName: "Robert",
    lastName: "Martinez",
    email: "robert.m@email.com",
    phone: "(555) 456-7890",
    dateOfBirth: "1952-08-22",
    address: "456 Maple Avenue, Springfield, IL 62702",
    healthConditions: ["Heart Disease", "Arthritis"],
    checkInFrequency: "daily",
    preferredContact: "sms",
    emergencyContacts: [
      {
        id: "ec3",
        name: "Maria Martinez",
        relationship: "Wife",
        phone: "(555) 567-8901",
        email: "maria.m@email.com"
      }
    ],
    lastCheckIn: "2026-05-22T10:15:00Z",
    consecutiveMissed: 2,
    joinedAt: "2026-02-01T00:00:00Z"
  },
  {
    id: "3",
    firstName: "Dorothy",
    lastName: "Chen",
    email: "dorothy.c@email.com",
    phone: "(555) 678-9012",
    dateOfBirth: "1948-11-30",
    address: "789 Pine Road, Springfield, IL 62703",
    healthConditions: ["COPD", "Osteoporosis"],
    checkInFrequency: "weekly",
    preferredContact: "both",
    emergencyContacts: [
      {
        id: "ec4",
        name: "James Chen",
        relationship: "Son",
        phone: "(555) 789-0123",
        email: "james.c@email.com"
      }
    ],
    lastCheckIn: "2026-05-23T14:00:00Z",
    consecutiveMissed: 0,
    joinedAt: "2026-03-10T00:00:00Z"
  },
  {
    id: "4",
    firstName: "William",
    lastName: "Johnson",
    email: "william.j@email.com",
    phone: "(555) 890-1234",
    dateOfBirth: "1940-05-08",
    address: "321 Elm Court, Springfield, IL 62704",
    healthConditions: ["Parkinson's Disease"],
    checkInFrequency: "daily",
    preferredContact: "email",
    emergencyContacts: [
      {
        id: "ec5",
        name: "Linda Johnson",
        relationship: "Daughter",
        phone: "(555) 901-2345",
        email: "linda.j@email.com"
      }
    ],
    lastCheckIn: "2026-05-24T08:00:00Z",
    consecutiveMissed: 0,
    joinedAt: "2026-01-20T00:00:00Z"
  },
  {
    id: "5",
    firstName: "Margaret",
    lastName: "Wilson",
    email: "margaret.w@email.com",
    phone: "(555) 012-3456",
    dateOfBirth: "1955-02-14",
    address: "654 Birch Lane, Springfield, IL 62705",
    healthConditions: ["Depression", "Anxiety"],
    checkInFrequency: "daily",
    preferredContact: "email",
    emergencyContacts: [
      {
        id: "ec6",
        name: "David Wilson",
        relationship: "Husband",
        phone: "(555) 123-4567",
        email: "david.w@email.com"
      }
    ],
    lastCheckIn: null,
    consecutiveMissed: 0,
    joinedAt: "2026-05-24T00:00:00Z"
  }
]

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: "alert1",
    memberId: "2",
    type: "missed_checkin",
    status: "active",
    message: "Robert Martinez has missed 2 consecutive daily check-ins",
    createdAt: "2026-05-24T12:00:00Z",
    resolvedAt: null,
    resolvedBy: null,
    resolutionNotes: null
  },
  {
    id: "alert2",
    memberId: "3",
    type: "needs_support",
    status: "active",
    message: "Dorothy Chen indicated she needs support with medication management",
    createdAt: "2026-05-23T14:05:00Z",
    resolvedAt: null,
    resolvedBy: null,
    resolutionNotes: null
  },
  {
    id: "alert3",
    memberId: "1",
    type: "needs_support",
    status: "resolved",
    message: "Eleanor Thompson requested help with transportation to doctor",
    createdAt: "2026-05-20T09:00:00Z",
    resolvedAt: "2026-05-20T15:30:00Z",
    resolvedBy: "Admin Jane",
    resolutionNotes: "Arranged volunteer driver for appointment on May 22nd"
  }
]

// Mock Check-ins
export const mockCheckIns: CheckIn[] = [
  {
    id: "ci1",
    memberId: "1",
    status: "okay",
    notes: "Feeling well today. Blood sugar levels stable.",
    supportNeeded: null,
    createdAt: "2026-05-24T09:30:00Z"
  },
  {
    id: "ci2",
    memberId: "4",
    status: "okay",
    notes: null,
    supportNeeded: null,
    createdAt: "2026-05-24T08:00:00Z"
  },
  {
    id: "ci3",
    memberId: "3",
    status: "needs_support",
    notes: "Having trouble keeping track of new medication schedule",
    supportNeeded: "Need help organizing my medications",
    createdAt: "2026-05-23T14:00:00Z"
  }
]

// Helper functions
export function getMemberById(id: string): Member | undefined {
  return mockMembers.find(m => m.id === id)
}

export function getAlertsByMemberId(memberId: string): Alert[] {
  return mockAlerts.filter(a => a.memberId === memberId)
}

export function getCheckInsByMemberId(memberId: string): CheckIn[] {
  return mockCheckIns.filter(c => c.memberId === memberId)
}

export function getActiveAlerts(): Alert[] {
  return mockAlerts.filter(a => a.status === "active")
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  })
}

export function getRelativeTime(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

export function calculateAge(dateOfBirth: string): number {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

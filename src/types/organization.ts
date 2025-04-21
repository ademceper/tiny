import type React from "react"
export type Member = {
  id: number
  name: string
  email: string
  role: "OWNER" | "ADMIN" | "MANAGER" | "MEMBER"
  joinedAt: string
  status: "active" | "inactive" | "pending"
  lastActive: string | null
  avatar?: string
  twoFactorEnabled?: boolean
  teams?: number[]
  skills?: string[]
  location?: string
  department?: string
  bio?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export type Team = {
  id: number
  name: string
  description?: string
  members: number
  projects: number
  progress: number
  activity: "high" | "medium" | "low"
  createdAt: string
  leadId?: number
  color?: string
  tags?: string[]
  completedProjects?: number
}

export type Permission = {
  id: string
  name: string
  description: string
  category: string
}

export type Role = {
  id: string
  name: string
  description: string
  permissions: string[]
  memberCount: number
  createdAt?: string
  updatedAt?: string
  createdBy?: number
}

export type ActivityLog = {
  id: number
  user: string
  userId: number
  action: string
  target: string
  targetId?: number
  targetType?: string
  timestamp: string
  ipAddress: string
  metadata?: Record<string, any>
}

export type Project = {
  id: number
  name: string
  description: string
  status: "active" | "completed" | "on-hold" | "cancelled" | "planned"
  progress: number
  deadline: string
  startDate: string
  teamId: number
  members: number[]
  priority: "low" | "medium" | "high" | "critical"
  budget?: number
  tags?: string[]
  milestones?: Milestone[]
}

export type Milestone = {
  id: number
  name: string
  description?: string
  dueDate: string
  status: "pending" | "in-progress" | "completed" | "delayed"
  projectId: number
}

export type Task = {
  id: number
  title: string
  description?: string
  status: "todo" | "in-progress" | "review" | "completed"
  priority: "low" | "medium" | "high"
  assigneeId: number
  projectId: number
  dueDate: string
  createdAt: string
  completedAt?: string
}

export type Integration = {
  id: string
  name: string
  icon: React.ReactNode
  status: "connected" | "disconnected"
  lastSync?: string
  description?: string
  category?: "communication" | "development" | "productivity" | "analytics" | "other"
}

"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog"
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu"
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Search, Filter, AlertTriangle, Building, Plus, MoreVertical, Eye, Edit, UserPlus, Trash, CalendarIcon, Check, X, Rocket } from 'lucide-react'
import { Member, Team, Project } from "@/types/organization"

interface ProjectsTabProps {
  projects: Project[]
  teams: Team[]
  members: Member[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedTeam: string
  setSelectedTeam: (team: string) => void
  selectedProjectFilter: string
  setSelectedProjectFilter: (status: string) => void
  selectedPriorityFilter: string
  setSelectedPriorityFilter: (priority: string) => void
}

export function ProjectsTab({
  projects,
  teams,
  members,
  searchTerm,
  setSearchTerm,
  selectedTeam,
  setSelectedTeam,
  selectedProjectFilter,
  setSelectedProjectFilter,
  selectedPriorityFilter,
  setSelectedPriorityFilter
}: ProjectsTabProps) {
  const [showProjectDetails, setShowProjectDetails] = useState<number | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState("")
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {})
  const [newProjectData, setNewProjectData] = useState({
    name: "",
    description: "",
    teamId: "",
    members: [] as string[],
    startDate: new Date().toISOString().split("T")[0],
    deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0],
    priority: "medium",
    status: "planned",
    tags: [] as string[],
  })

  // Filtered projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedProjectFilter === "all" || project.status === selectedProjectFilter
    
    const matchesPriority = selectedPriorityFilter === "all" || project.priority === selectedPriorityFilter
    
    const matchesTeam = selectedTeam === "all" || project.teamId === Number.parseInt(selectedTeam)
    
    return matchesSearch && matchesStatus && matchesPriority && matchesTeam
  })

  // Helper functions
  const getProjectStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            Active
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400">
            <Check className="h-3 w-3" />
            Completed
          </Badge>
        )
      case "on-hold":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-400">
            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            On Hold
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
            <X className="h-3 w-3" />
            Cancelled
          </Badge>
        )
      case "planned":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900 dark:bg-purple-950 dark:text-purple-400">
            <CalendarIcon className="h-3 w-3" />
            Planned
          </Badge>
        )
      default:
        return null
    }
  }

  const getProjectPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-red-300 bg-red-100 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            <AlertTriangle className="h-3 w-3" />
            Critical
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  const getProjectMembers = (memberIds: number[]) => {
    return members.filter((member) => memberIds.includes(member.id))
  }

  const getProjectTeam = (teamId: number) => {
    return teams.find((team) => team.id === teamId)
  }

  // Handle project actions
  const handleCreateProject = () => {
    // In a real app, this would call an API to create the project
    toast.success("Project created successfully")
    
    // Reset form
    setNewProjectData({
      name: "",
      description: "",
      teamId: "",
      members: [],
      startDate: new Date().toISOString().split("T")[0],
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0],
      priority: "medium",
      status: "planned",
      tags: [],
    })
  }

  const handleDeleteProject = (projectId: number) => {
    setConfirmMessage("Are you sure you want to delete this project? This action cannot be undone.")
    setConfirmAction(() => () => {
      // In a real app, this would call an API to delete the project
      toast.success("Project deleted successfully")
      setShowConfirmDialog(false)
    })
    setShowConfirmDialog(true)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Organization Projects</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Set up a new project for your organization.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-name" className="text-right">
                  Project Name
                </Label>
                <Input 
                  id="project-name" 
                  className="col-span-3" 
                  value={newProjectData.name}
                  onChange={(e) => setNewProjectData({ ...newProjectData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-description" className="text-right">
                  Description
                </Label>
                <Textarea 
                  id="project-description" 
                  className="col-span-3"
                  value={newProjectData.description}
                  onChange={(e) => setNewProjectData({ ...newProjectData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-team" className="text-right">
                  Team
                </Label>
                <Select 
                  value={newProjectData.teamId}
                  onValueChange={(value) => setNewProjectData({ ...newProjectData, teamId: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id.toString()}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-members" className="text-right">
                  Members
                </Label>
                <div className="col-span-3">
                  <div className="mb-2 flex flex-wrap gap-1">
                    {newProjectData.members.map((memberId) => {
                      const member = members.find((m) => m.id.toString() === memberId)
                      return member ? (
                        <Badge key={member.id} variant="secondary" className="gap-1">
                          {member.name}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0"
                            onClick={() => {
                              setNewProjectData({
                                ...newProjectData,
                                members: newProjectData.members.filter((id) => id !== memberId),
                              })
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ) : null
                    })}
                  </div>
                  <Select
                    onValueChange={(value) => {
                      if (!newProjectData.members.includes(value)) {
                        setNewProjectData({
                          ...newProjectData,
                          members: [...newProjectData.members, value],
                        })
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Add members" />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((member) => (
                        <SelectItem key={member.id} value={member.id.toString()}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-dates" className="text-right">
                  Dates
                </Label>
                <div className="col-span-3 grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="start-date" className="text-xs">Start Date</Label>
                    <Input 
                      id="start-date" 
                      type="date" 
                      value={newProjectData.startDate}
                      onChange={(e) => setNewProjectData({ ...newProjectData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="deadline" className="text-xs">Deadline</Label>
                    <Input 
                      id="deadline" 
                      type="date" 
                      value={newProjectData.deadline}
                      onChange={(e) => setNewProjectData({ ...newProjectData, deadline: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-priority" className="text-right">
                  Priority
                </Label>
                <Select 
                  value={newProjectData.priority}
                  onValueChange={(value) => setNewProjectData({ ...newProjectData, priority: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-status" className="text-right">
                  Status
                </Label>
                <Select 
                  value={newProjectData.status}
                  onValueChange={(value) => setNewProjectData({ ...newProjectData, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-tags" className="text-right">
                  Tags
                </Label>
                <div className="col-span-3">
                  <div className="mb-2 flex flex-wrap gap-1">
                    {newProjectData.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="gap-1">
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0"
                          onClick={() => {
                            setNewProjectData({
                              ...newProjectData,
                              tags: newProjectData.tags.filter((t) => t !== tag),
                            })
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value) {
                          e.preventDefault()
                          setNewProjectData({
                            ...newProjectData,
                            tags: [...newProjectData.tags, e.currentTarget.value],
                          })
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.previousSibling as HTMLInputElement
                        if (input.value) {
                          setNewProjectData({
                            ...newProjectData,
                            tags: [...newProjectData.tags, input.value],
                          })
                          input.value = ""
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setNewProjectData({
                  name: "",
                  description: "",
                  teamId: "",
                  members: [],
                  startDate: new Date().toISOString().split("T")[0],
                  deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0],
                  priority: "medium",
                  status: "planned",
                  tags: [],
                })
              }}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleCreateProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="h-9 w-full pl-8 md:w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedProjectFilter} onValueChange={setSelectedProjectFilter}>
            <SelectTrigger className="h-9 w-[120px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPriorityFilter} onValueChange={setSelectedPriorityFilter}>
            <SelectTrigger className="h-9 w-[120px]">
              <AlertTriangle className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="h-9 w-[120px]">
              <Building className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id.toString()}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full flex h-60 flex-col items-center justify-center rounded-lg border border-dashed">
            <Rocket className="mb-4 h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">No projects found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or create a new project.</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>{project.name}</CardTitle>
                      {getProjectPriorityBadge(project.priority)}
                    </div>
                    <CardDescription className="mt-1 line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setShowProjectDetails(project.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Members
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteProject(project.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>{getProjectStatusBadge(project.status)}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <CalendarIcon className="h-3 w-3" />
                    Due {new Date(project.deadline).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                <div className="mt-4 flex -space-x-2">
                  {getProjectMembers(project.members)
                    .slice(0, 5)
                    .map((member) => (
                      <Avatar key={member.id} className="border-2 border-background">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  {project.members.length > 5 && (
                    <Avatar className="border-2 border-background">
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        +{project.members.length - 5}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                {project.tags && project.tags.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setShowProjectDetails(project.id)}>
                  View Project Details
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>{confirmMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmAction}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Project Details Dialog */}
      <Dialog open={showProjectDetails !== null} onOpenChange={() => setShowProjectDetails(null)}>
        <DialogContent className="sm:max-w-[700px]">
          {showProjectDetails !== null && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl">{projects.find(p => p.id === showProjectDetails)?.name}</DialogTitle>
                  <div className="flex items-center gap-2">
                    {getProjectStatusBadge(projects.find(p => p.id === showProjectDetails)?.status || "")}
                    {getProjectPriorityBadge(projects.find(p => p.id === showProjectDetails)?.priority || "")}
                  </div>
                </div>
                <DialogDescription>
                  {projects.find(p => p.id === showProjectDetails)?.description}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium">Project Details</h3>
                </div>
                <div className="space-y-4">
                  {/* Project details would be displayed here */}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowProjectDetails(null)}>
                  Close
                </Button>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Project
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

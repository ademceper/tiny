"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Plus, MoreVertical, Eye, Edit, UserPlus, Trash, Users, ClipboardList, Activity, Star, Building, X } from 'lucide-react'
import { Member, Team } from "@/types/organization"

interface TeamsTabProps {
  teams: Team[]
  members: Member[]
  selectedTeam: string
}

export function TeamsTab({ teams, members, selectedTeam }: TeamsTabProps) {
  const [showTeamDetails, setShowTeamDetails] = useState<number | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState("")
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {})
  const [newTeamData, setNewTeamData] = useState({
    name: "",
    description: "",
    leadId: "",
    members: [] as string[],
    tags: [] as string[],
  })

  // Filter teams based on selected team
  const filteredTeams = selectedTeam === "all" ? teams : teams.filter((team) => team.id === Number.parseInt(selectedTeam))

  // Helper functions
  const getActivityIndicator = (activity: string) => {
    switch (activity) {
      case "high":
        return (
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-green-700 dark:text-green-400">High</span>
          </div>
        )
      case "medium":
        return (
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-yellow-700 dark:text-yellow-400">Medium</span>
          </div>
        )
      case "low":
        return (
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <span className="text-sm text-red-700 dark:text-red-400">Low</span>
          </div>
        )
      default:
        return null
    }
  }

  const getTeamLead = (teamId: number) => {
    const team = teams.find((t) => t.id === teamId)
    if (!team?.leadId) return null
    return members.find((m) => m.id === team.leadId)
  }

  // Handle team actions
  const handleCreateTeam = () => {
    // In a real app, this would call an API to create the team
    toast.success("Team created successfully")
    
    // Reset form
    setNewTeamData({
      name: "",
      description: "",
      leadId: "",
      members: [],
      tags: [],
    })
  }

  const handleDeleteTeam = (teamId: number) => {
    setConfirmMessage("Are you sure you want to delete this team? This action cannot be undone.")
    setConfirmAction(() => () => {
      // In a real app, this would call an API to delete the team
      toast.success("Team deleted successfully")
      setShowConfirmDialog(false)
    })
    setShowConfirmDialog(true)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Organization Teams</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>Set up a new team in your organization.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="team-name" className="text-right">
                  Team Name
                </Label>
                <Input 
                  id="team-name" 
                  className="col-span-3" 
                  value={newTeamData.name}
                  onChange={(e) => setNewTeamData({ ...newTeamData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="team-lead" className="text-right">
                  Team Lead
                </Label>
                <Select 
                  value={newTeamData.leadId}
                  onValueChange={(value) => setNewTeamData({ ...newTeamData, leadId: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a team lead" />
                  </SelectTrigger>
                  <SelectContent>
                    {members
                      .filter((m) => ["OWNER", "ADMIN", "MANAGER"].includes(m.role))
                      .map((member) => (
                        <SelectItem key={member.id} value={member.id.toString()}>
                          {member.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="team-description" className="text-right">
                  Description
                </Label>
                <Textarea 
                  id="team-description" 
                  className="col-span-3"
                  value={newTeamData.description}
                  onChange={(e) => setNewTeamData({ ...newTeamData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="team-members" className="text-right">
                  Members
                </Label>
                <div className="col-span-3">
                  <div className="mb-2 flex flex-wrap gap-1">
                    {newTeamData.members.map((memberId) => {
                      const member = members.find((m) => m.id.toString() === memberId)
                      return member ? (
                        <Badge key={member.id} variant="secondary" className="gap-1">
                          {member.name}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0"
                            onClick={() => {
                              setNewTeamData({
                                ...newTeamData,
                                members: newTeamData.members.filter((id) => id !== memberId),
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
                      if (!newTeamData.members.includes(value)) {
                        setNewTeamData({
                          ...newTeamData,
                          members: [...newTeamData.members, value],
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
                <Label htmlFor="team-tags" className="text-right">
                  Tags
                </Label>
                <div className="col-span-3">
                  <div className="mb-2 flex flex-wrap gap-1">
                    {newTeamData.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="gap-1">
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0"
                          onClick={() => {
                            setNewTeamData({
                              ...newTeamData,
                              tags: newTeamData.tags.filter((t) => t !== tag),
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
                          setNewTeamData({
                            ...newTeamData,
                            tags: [...newTeamData.tags, e.currentTarget.value],
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
                          setNewTeamData({
                            ...newTeamData,
                            tags: [...newTeamData.tags, input.value],
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
                setNewTeamData({
                  name: "",
                  description: "",
                  leadId: "",
                  members: [],
                  tags: [],
                })
              }}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleCreateTeam}>Create Team</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeams.length === 0 ? (
          <div className="col-span-full flex h-60 flex-col items-center justify-center rounded-lg border border-dashed">
            <Building className="mb-4 h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">No teams found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or create a new team.</p>
          </div>
        ) : (
          filteredTeams.map((team) => (
            <Card key={team.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{team.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {team.description || "No description provided"}
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
                      <DropdownMenuItem onClick={() => setShowTeamDetails(team.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Team
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Members
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteTeam(team.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Team
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
                  {[...Array(Math.min(5, team.members))].map((_, i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {String.fromCharCode(65 + i)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {team.members > 5 && (
                    <Avatar className="border-2 border-background">
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        +{team.members - 5}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{team.progress}%</span>
                  </div>
                  <Progress value={team.progress} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span>{team.members} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClipboardList className="h-3 w-3 text-muted-foreground" />
                    <span>{team.projects} projects</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3 text-muted-foreground" />
                    <span>Activity: </span>
                    {getActivityIndicator(team.activity)}
                  </div>
                  {team.leadId && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>Lead: {getTeamLead(team.id)?.name}</span>
                    </div>
                  )}
                </div>
                {team.tags && team.tags.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {team.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setShowTeamDetails(team.id)}>
                  View Team Details
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

      {/* Team Details Dialog */}
      <Dialog open={showTeamDetails !== null} onOpenChange={() => setShowTeamDetails(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {showTeamDetails !== null && (
            <>
              <DialogHeader>
                <DialogTitle>{teams.find(t => t.id === showTeamDetails)?.name}</DialogTitle>
                <DialogDescription>
                  {teams.find(t => t.id === showTeamDetails)?.description || "No description provided"}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium">Team Members</h3>
                  <Button variant="outline" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Members
                  </Button>
                </div>
                <div className="space-y-2">
                  {/* Team members would be listed here */}
                  <div className="text-sm text-muted-foreground">No members to display</div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowTeamDetails(null)}>
                  Close
                </Button>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Team
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select"
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table"
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
import { toast } from "sonner"
import { Search, Filter, Building, Shield, Plus, MoreVertical, UserCircle, Edit, Mail, Trash, Clock, ChevronLeft, ChevronRight, Users, UserCheck, UserMinus, UserPlus } from 'lucide-react'
import { useRouter } from "next/navigation"
import { Member, Team } from "@/types/organization"

interface MembersTabProps {
  members: Member[]
  teams: Team[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedTeam: string
  setSelectedTeam: (team: string) => void
  selectedStatusFilter: string
  setSelectedStatusFilter: (status: string) => void
  selectedRoleFilter: string
  setSelectedRoleFilter: (role: string) => void
}

export function MembersTab({
  members,
  teams,
  searchTerm,
  setSearchTerm,
  selectedTeam,
  setSelectedTeam,
  selectedStatusFilter,
  setSelectedStatusFilter,
  selectedRoleFilter,
  setSelectedRoleFilter
}: MembersTabProps) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState("")
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {})

  // Filter members based on search, filter and team
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      selectedStatusFilter === "all" ||
      (selectedStatusFilter === "active" && member.status === "active") ||
      (selectedStatusFilter === "inactive" && member.status === "inactive") ||
      (selectedStatusFilter === "pending" && member.status === "pending")

    const matchesTeam = selectedTeam === "all" || (member.teams && member.teams.includes(Number.parseInt(selectedTeam)))

    const matchesRole =
      selectedRoleFilter === "all" || member.role.toLowerCase() === selectedRoleFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesTeam && matchesRole
  })

  // Helper functions
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "OWNER":
        return "destructive"
      case "ADMIN":
        return "purple"
      case "MANAGER":
        return "orange"
      default:
        return "secondary"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
            <div className="h-2 w-2 rounded-full bg-gray-500"></div>
            Inactive
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400">
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            Pending
          </Badge>
        )
      default:
        return null
    }
  }

  const getMemberTeams = (memberId: number) => {
    return teams.filter((team) => members.find((m) => m.id === memberId)?.teams?.includes(team.id))
  }

  // Handle member actions
  const handleRemoveMember = (memberId: number) => {
    setConfirmMessage("Are you sure you want to remove this member? This action cannot be undone.")
    setConfirmAction(() => () => {
      // In a real app, this would call an API to remove the member
      toast.success("Member removed successfully")
      setShowConfirmDialog(false)
    })
    setShowConfirmDialog(true)
  }

  const handleResendInvite = (email: string) => {
    toast.info(`Invitation resent to ${email}`)
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle bulk actions
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(filteredMembers.map(m => m.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id])
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id))
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedItems.length === 0) {
      toast.error("No items selected")
      return
    }

    switch (action) {
      case "delete":
        setConfirmMessage(`Are you sure you want to remove ${selectedItems.length} member${selectedItems.length > 1 ? 's' : ''}? This action cannot be undone.`)
        setConfirmAction(() => () => {
          // In a real app, this would call an API to remove the members
          toast.success(`${selectedItems.length} member${selectedItems.length > 1 ? 's' : ''} removed successfully`)
          setSelectedItems([])
          setShowConfirmDialog(false)
        })
        setShowConfirmDialog(true)
        break
      case "activate":
        // In a real app, this would call an API to activate the members
        toast.success(`${selectedItems.length} member${selectedItems.length > 1 ? 's' : ''} activated successfully`)
        setSelectedItems([])
        break
      case "deactivate":
        // In a real app, this would call an API to deactivate the members
        toast.success(`${selectedItems.length} member${selectedItems.length > 1 ? 's' : ''} deactivated successfully`)
        setSelectedItems([])
        break
      case "addToTeam":
        // This would open a dialog to select a team in a real app
        toast.info("Select a team to add members to")
        break
      default:
        break
    }
  }

  return (
    <>
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-medium">Organization Members</h2>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                className="h-9 w-full pl-8 md:w-64"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedStatusFilter} onValueChange={setSelectedStatusFilter}>
              <SelectTrigger className="h-9 w-[120px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
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
            <Select value={selectedRoleFilter} onValueChange={setSelectedRoleFilter}>
              <SelectTrigger className="h-9 w-[120px]">
                <Shield className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogDescription>Add a new member to your organization.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Form fields would go here */}
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          {selectedItems.length > 0 && (
            <div className="flex items-center justify-between bg-muted/50 p-2 dark:bg-muted/20">
              <div className="text-sm">
                <span className="font-medium">{selectedItems.length}</span> item{selectedItems.length !== 1 && 's'} selected
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleBulkAction("activate")}>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Activate
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction("deactivate")}>
                  <UserMinus className="mr-2 h-4 w-4" />
                  Deactivate
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction("addToTeam")}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add to Team
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleBulkAction("delete")}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox 
                    checked={
                      filteredMembers.length > 0 && 
                      selectedItems.length === filteredMembers.length
                    }
                    
                  />
                </TableHead>
                <TableHead className="w-[200px]">Member</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Teams</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Users className="mb-2 h-10 w-10" />
                      <p className="mb-2 text-lg font-medium">No members found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedItems.includes(member.id)}
                        onCheckedChange={(checked) => handleSelectItem(member.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell>
                      
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {getMemberTeams(member.id)
                          .slice(0, 2)
                          .map((team) => (
                            <Badge key={team.id} variant="outline" className="text-xs">
                              {team.name}
                            </Badge>
                          ))}
                        {getMemberTeams(member.id).length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{getMemberTeams(member.id).length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {member.lastActive ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {new Date(member.lastActive).toLocaleDateString()}
                        </div>
                      ) : (
                        "Never"
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/profile/${member.id}`)}>
                            <UserCircle className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Role
                          </DropdownMenuItem>
                          {member.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleResendInvite(member.email)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Resend Invite
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between px-4 py-2">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredMembers.length}</span> of{" "}
              <span className="font-medium">{members.length}</span> members
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
              </Button>
              <div className="text-sm">
                Page <span className="font-medium">{currentPage}</span> of{" "}
                <span className="font-medium">{Math.ceil(filteredMembers.length / itemsPerPage)}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= Math.ceil(filteredMembers.length / itemsPerPage)}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
    </>
  )
}

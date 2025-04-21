"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MembersTab } from "@/components/organization/tabs/member-tab"
import { TeamsTab } from "@/components/organization/tabs/team-tab"
import { ProjectsTab } from "@/components/organization/tabs/projects-tab"
import { PermissionsTab } from "@/components/organization/tabs/permissions-tab"
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Download, Users, Building, Rocket, Shield } from 'lucide-react'
import { Member, Team, Project, Role, Permission } from "@/types/organization"

interface OrganizationTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  members: Member[]
  teams: Team[]
  projects: Project[]
  roles: Role[]
  permissions: Permission[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedTeam: string
  setSelectedTeam: (team: string) => void
}

export function OrganizationTabs({
  activeTab,
  setActiveTab,
  members,
  teams,
  projects,
  roles,
  permissions,
  searchTerm,
  setSearchTerm,
  selectedTeam,
  setSelectedTeam
}: OrganizationTabsProps) {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all")
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("all")
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>("all")
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>("all")
  
  const handleExport = (type: string) => {

  }

  return (
    <Tabs defaultValue="members" value={activeTab} onValueChange={setActiveTab}>
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:w-auto">
          <TabsTrigger value="members" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Members
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            Teams
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center">
            <Rocket className="mr-2 h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Permissions
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          {activeTab === "members" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("members-csv")}>CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("members-json")}>JSON</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("members-pdf")}>PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {activeTab === "teams" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("teams-csv")}>CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("teams-json")}>JSON</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <TabsContent value="members" className="space-y-4">
        <MembersTab 
          members={members}
          teams={teams}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          selectedStatusFilter={selectedStatusFilter}
          setSelectedStatusFilter={setSelectedStatusFilter}
          selectedRoleFilter={selectedRoleFilter}
          setSelectedRoleFilter={setSelectedRoleFilter}
        />
      </TabsContent>

      <TabsContent value="teams" className="space-y-4">
        <TeamsTab 
          teams={teams}
          members={members}
          selectedTeam={selectedTeam}
        />
      </TabsContent>

      <TabsContent value="projects" className="space-y-4">
        <ProjectsTab 
          projects={projects}
          teams={teams}
          members={members}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          selectedProjectFilter={selectedProjectFilter}
          setSelectedProjectFilter={setSelectedProjectFilter}
          selectedPriorityFilter={selectedPriorityFilter}
          setSelectedPriorityFilter={setSelectedPriorityFilter}
        />
      </TabsContent>

      <TabsContent value="permissions" className="space-y-4">
        <PermissionsTab 
          roles={roles}
          permissions={permissions}
        />
      </TabsContent>
    </Tabs>
  )
}

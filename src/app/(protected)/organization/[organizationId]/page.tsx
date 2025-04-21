"use client"

import { useState } from "react"
import PageContainer from "@/components/layout/page-container"
import { OrganizationHeader } from "@/components/organization/organization-header"
import { OrganizationStats } from "@/components/organization/organization-stats"
import { OrganizationOverview } from "@/components/organization/organization-overview"
import { RecentActivity } from "@/components/organization/recent-activity"
import { useOrganizationData } from "@/hooks/use-organization-data"

export default function OrganizationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  })
  
  const { 
    members, 
    teams, 
    projects, 
    activityLogs,
    handleRefresh
  } = useOrganizationData()

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-4">
        <OrganizationHeader 
          isLoading={isLoading} 
          handleRefresh={handleRefresh} 
        />
        
        <OrganizationStats 
          members={members} 
          teams={teams} 
          projects={projects} 
          dateRange={dateRange} 
          setDateRange={setDateRange} 
        />
        
        <OrganizationOverview teams={teams} />
        
        <RecentActivity activityLogs={activityLogs} />
      </div>
    </PageContainer>
  )
}
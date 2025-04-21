"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu"
import { TrendingUp, TrendingDown, Download, FileText, FileSpreadsheet, CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  ResponsiveContainer 
} from "recharts"
import { Member, Team, Project } from "@/types/organization"

interface OrganizationStatsProps {
  members: Member[]
  teams: Team[]
  projects: Project[]
  dateRange: {
    start: Date
    end: Date
  }
  setDateRange: (range: { start: Date; end: Date }) => void
}

export function OrganizationStats({ 
  members, 
  teams, 
  projects, 
  dateRange, 
  setDateRange 
}: OrganizationStatsProps) {
  // Mock data for charts
  const memberGrowthData = [
    { month: "Nov", members: 32, active: 28 },
    { month: "Dec", members: 38, active: 34 },
    { month: "Jan", members: 42, active: 38 },
    { month: "Feb", members: 45, active: 41 },
    { month: "Mar", members: 50, active: 46 },
    { month: "Apr", members: 56, active: 52 },
  ]

  const activityData = [
    { day: "Mon", tasks: 12, comments: 24, meetings: 3 },
    { day: "Tue", tasks: 18, comments: 32, meetings: 5 },
    { day: "Wed", tasks: 15, comments: 28, meetings: 2 },
    { day: "Thu", tasks: 22, comments: 36, meetings: 4 },
    { day: "Fri", tasks: 20, comments: 30, meetings: 3 },
    { day: "Sat", tasks: 5, comments: 8, meetings: 0 },
    { day: "Sun", tasks: 3, comments: 6, meetings: 0 },
  ]

  const handleExport = (type: string) => {

  }

  const activeProjects = projects.filter(p => p.status === "active").length
  const completedProjects = projects.filter(p => p.status === "completed").length
  const activeMembers = members.filter(m => m.status === "active").length

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h2 className="text-lg font-medium">Key Metrics</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(dateRange.start, "LLL dd, y")} - {format(dateRange.end, "LLL dd, y")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={{
                  from: dateRange.start,
                  to: dateRange.end,
                }}
                onSelect={(range) => {
                  if (range?.from && range.to) {
                    setDateRange({ start: range.from, end: range.to })
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport("csv")}>
                <FileText className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("excel")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardDescription>Total Members</CardDescription>
            <CardTitle className="text-2xl font-semibold">{members.length}</CardTitle>
            <CardAction>
              <Badge variant="outline" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +4
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="pb-2">
            <ResponsiveContainer width="100%" height={60}>
              <AreaChart data={memberGrowthData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Area
                  type="monotone"
                  dataKey="members"
                  stroke="#2563eb"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1.5 pt-0 text-sm">
            <div className="flex gap-2 font-medium line-clamp-1">4 new members this month</div>
            <div className="text-muted-foreground">
              <span className="text-green-600 dark:text-green-400">{activeMembers} active</span> / {members.length} total
            </div>
          </CardFooter>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardDescription>Active Teams</CardDescription>
            <CardTitle className="text-2xl font-semibold">{teams.length}</CardTitle>
            <CardAction>
              <Badge variant="outline" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex gap-1">
              {teams.slice(0, 6).map((team, index) => (
                <div
                  key={team.id}
                  className="h-8 flex-1 rounded-sm"
                  style={{
                    backgroundColor: team.color || `hsl(${index * 40}, 70%, 50%)`,
                  }}
                ></div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1.5 pt-0 text-sm">
            <div className="flex gap-2 font-medium line-clamp-1">2 new teams formed</div>
            <div className="text-muted-foreground">
              <span className="text-green-600 dark:text-green-400">6 active</span> / {teams.length} total
            </div>
          </CardFooter>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardDescription>Active Projects</CardDescription>
            <CardTitle className="text-2xl font-semibold">{projects.length}</CardTitle>
            <CardAction>
              <Badge variant="outline" className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                -1
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex justify-between text-xs">
              <div>In Progress: {activeProjects}</div>
              <div>Completed: {completedProjects}</div>
            </div>
            <Progress value={71} className="mt-2 h-2" />
          </CardContent>
          <CardFooter className="flex-col items-start gap-1.5 pt-0 text-sm">
            <div className="flex gap-2 font-medium line-clamp-1">1 project completed</div>
            <div className="text-muted-foreground">
              <span className="text-yellow-600 dark:text-yellow-400">3 overdue</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardDescription>Member Activity</CardDescription>
            <CardTitle className="text-2xl font-semibold">87%</CardTitle>
            <CardAction>
              <Badge variant="outline" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="pb-2">
            <ResponsiveContainer width="100%" height={60}>
              <BarChart data={activityData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Bar dataKey="tasks" fill="#8884d8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="comments" fill="#82ca9d" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1.5 pt-0 text-sm">
            <div className="flex gap-2 font-medium line-clamp-1">Engagement up this month</div>
            <div className="text-muted-foreground">
              <span className="text-green-600 dark:text-green-400">+22 tasks</span>, <span className="text-blue-600 dark:text-blue-400">+12 comments</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import {
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  TrendingUp
} from 'lucide-react';
import { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Team } from '@/types/organization';

interface OrganizationOverviewProps {
  teams: Team[];
}

export function OrganizationOverview({ teams }: OrganizationOverviewProps) {
  const [timeRange, setTimeRange] = useState<
    'day' | 'week' | 'month' | 'quarter' | 'year'
  >('month');
  const [chartType, setChartType] = useState<
    'line' | 'bar' | 'area' | 'pie' | 'radar'
  >('area');

  // Mock data for charts
  const activityData = [
    { day: 'Mon', tasks: 12, comments: 24, meetings: 3 },
    { day: 'Tue', tasks: 18, comments: 32, meetings: 5 },
    { day: 'Wed', tasks: 15, comments: 28, meetings: 2 },
    { day: 'Thu', tasks: 22, comments: 36, meetings: 4 },
    { day: 'Fri', tasks: 20, comments: 30, meetings: 3 },
    { day: 'Sat', tasks: 5, comments: 8, meetings: 0 },
    { day: 'Sun', tasks: 3, comments: 6, meetings: 0 }
  ];

  const projectStatusData = [
    { name: 'Active', value: 10 },
    { name: 'Completed', value: 5 },
    { name: 'On Hold', value: 3 },
    { name: 'Planned', value: 2 }
  ];

  const teamPerformanceData = useMemo(() => {
    return teams.map((team) => ({
      name: team.name,
      progress: team.progress,
      projects: team.projects,
      completed: team.completedProjects || 0
    }));
  }, [teams]);

  // Colors for charts
  const STATUS_COLORS = {
    active: '#10B981',
    inactive: '#6B7280',
    pending: '#F59E0B',
    completed: '#3B82F6',
    'on-hold': '#F97316',
    cancelled: '#EF4444',
    planned: '#8B5CF6'
  };

  let chartContent : React.JSX.Element = (
    <RechartsLineChart
        data={activityData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray='3 3' vertical={false} />
        <XAxis dataKey='day' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='tasks'
          name='Tasks'
          stroke='#8884d8'
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line
          type='monotone'
          dataKey='comments'
          name='Comments'
          stroke='#82ca9d'
          strokeWidth={2}
        />
        <Line
          type='monotone'
          dataKey='meetings'
          name='Meetings'
          stroke='#ffc658'
          strokeWidth={2}
        />
      </RechartsLineChart>
  )

 if (chartType === 'bar') {
    chartContent = (
      <BarChart
        data={activityData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray='3 3' vertical={false} />
        <XAxis dataKey='day' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey='tasks'
          name='Tasks'
          fill='#8884d8'
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey='comments'
          name='Comments'
          fill='#82ca9d'
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey='meetings'
          name='Meetings'
          fill='#ffc658'
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    );
  } else if (chartType === 'area') {
    chartContent = (
      <AreaChart
        data={activityData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray='3 3' vertical={false} />
        <XAxis dataKey='day' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type='monotone'
          dataKey='tasks'
          name='Tasks'
          stroke='#8884d8'
          fill='#8884d8'
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Area
          type='monotone'
          dataKey='comments'
          name='Comments'
          stroke='#82ca9d'
          fill='#82ca9d'
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Area
          type='monotone'
          dataKey='meetings'
          name='Meetings'
          stroke='#ffc658'
          fill='#ffc658'
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </AreaChart>
    );
  } else if (chartType === 'pie') {
    chartContent = (
      <RechartsPieChart>
        <Tooltip />
        <Legend />
        <Pie
          data={projectStatusData}
          cx='50%'
          cy='50%'
          outerRadius={100}
          fill='#8884d8'
          dataKey='value'
          nameKey='name'
          label
        >
          {projectStatusData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                Object.values(STATUS_COLORS)[
                  index % Object.values(STATUS_COLORS).length
                ]
              }
            />
          ))}
        </Pie>
      </RechartsPieChart>
    );
  } else if (chartType === 'radar') {
    chartContent = (
      <RadarChart
        cx='50%'
        cy='50%'
        outerRadius={100}
        data={teamPerformanceData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey='name' />
        <PolarRadiusAxis />
        <Radar
          name='Progress'
          dataKey='progress'
          stroke='#8884d8'
          fill='#8884d8'
          fillOpacity={0.6}
        />
        <Radar
          name='Projects'
          dataKey='projects'
          stroke='#82ca9d'
          fill='#82ca9d'
          fillOpacity={0.6}
        />
        <Radar
          name='Completed'
          dataKey='completed'
          stroke='#ffc658'
          fill='#ffc658'
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
      <Card className='lg:col-span-2'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <div>
            <CardTitle>Organization Overview</CardTitle>
            <CardDescription>Activity and performance metrics</CardDescription>
          </div>
          <div className='flex items-center gap-2'>
            <Select
              value={timeRange}
              onValueChange={(value) => setTimeRange(value as any)}
            >
              <SelectTrigger className='w-[120px]'>
                <SelectValue placeholder='Time Range' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='day'>Last 24h</SelectItem>
                <SelectItem value='week'>Last Week</SelectItem>
                <SelectItem value='month'>Last Month</SelectItem>
                <SelectItem value='quarter'>Last Quarter</SelectItem>
                <SelectItem value='year'>Last Year</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                  <BarChart3 className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Chart Type</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setChartType('line')}>
                  <LineChart className='mr-2 h-4 w-4' />
                  Line Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setChartType('bar')}>
                  <BarChart3 className='mr-2 h-4 w-4' />
                  Bar Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setChartType('area')}>
                  <LineChart className='mr-2 h-4 w-4' />
                  Area Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setChartType('pie')}>
                  <PieChart className='mr-2 h-4 w-4' />
                  Pie Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setChartType('radar')}>
                  <Activity className='mr-2 h-4 w-4' />
                  Radar Chart
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              {chartContent}
            </ResponsiveContainer>
          </div>
          <div className='mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4'>
            <div className='col-span-1'>
              <div className='text-muted-foreground text-xs font-medium uppercase'>
                Active Users
              </div>
              <div className='mt-1 flex items-center'>
                <span className='text-2xl font-bold'>42</span>
                <Badge
                  variant='outline'
                  className='ml-2 flex items-center gap-1'
                >
                  <TrendingUp className='h-3 w-3' />
                  +5%
                </Badge>
              </div>
            </div>
            <div className='col-span-1'>
              <div className='text-muted-foreground text-xs font-medium uppercase'>
                Completion Rate
              </div>
              <div className='mt-1 flex items-center'>
                <span className='text-2xl font-bold'>76%</span>
                <Badge
                  variant='outline'
                  className='ml-2 flex items-center gap-1'
                >
                  <TrendingUp className='h-3 w-3' />
                  +12%
                </Badge>
              </div>
            </div>
            <div className='col-span-1'>
              <div className='text-muted-foreground text-xs font-medium uppercase'>
                Task Creation
              </div>
              <div className='mt-1 flex items-center'>
                <span className='text-2xl font-bold'>95</span>
                <Badge
                  variant='outline'
                  className='ml-2 flex items-center gap-1'
                >
                  <TrendingUp className='h-3 w-3' />
                  +8%
                </Badge>
              </div>
            </div>
            <div className='col-span-1'>
              <div className='text-muted-foreground text-xs font-medium uppercase'>
                Avg. Response
              </div>
              <div className='mt-1 flex items-center'>
                <span className='text-2xl font-bold'>3.2h</span>
                <Badge
                  variant='outline'
                  className='ml-2 flex items-center gap-1'
                >
                  <TrendingUp className='h-3 w-3' />
                  -15%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Distribution</CardTitle>
          <CardDescription>Members across teams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='h-[250px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <RechartsPieChart>
                <Pie
                  data={teams.map((team) => ({
                    name: team.name,
                    value: team.members
                  }))}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {teams.map((team, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={team.color || `hsl(${index * 40}, 70%, 50%)`}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} members`, 'Count']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

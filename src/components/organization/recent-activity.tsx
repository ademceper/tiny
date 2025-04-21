"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ActivityLog } from "@/types/organization"

interface RecentActivityProps {
  activityLogs: ActivityLog[]
}

export function RecentActivity({ activityLogs }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Track important organization events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activityLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-4">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback>{log.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{log.user}</div>
                  <div className="text-sm text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</div>
                </div>
                <p className="text-sm">
                  <span className="font-medium text-primary">{log.action}</span> {log.target}
                </p>
                <div className="mt-1 text-xs text-muted-foreground">IP: {log.ipAddress}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Activity
        </Button>
      </CardFooter>
    </Card>
  )
}

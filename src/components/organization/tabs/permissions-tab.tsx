"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Check, Edit, Eye, Plus } from 'lucide-react'
import { Role, Permission } from "@/types/organization"

interface PermissionsTabProps {
  roles: Role[]
  permissions: Permission[]
}

export function PermissionsTab({ roles, permissions }: PermissionsTabProps) {
  const [newRoleData, setNewRoleData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })

  // Handle role actions
  const handleCreateRole = () => {
    // In a real app, this would call an API to create the role
    toast.success("Role created successfully")
    
    // Reset form
    setNewRoleData({
      name: "",
      description: "",
      permissions: [],
    })
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Role Permissions</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>Define a new role with custom permissions.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role-name" className="text-right">
                  Role Name
                </Label>
                <Input 
                  id="role-name" 
                  className="col-span-3" 
                  value={newRoleData.name}
                  onChange={(e) => setNewRoleData({ ...newRoleData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role-description" className="text-right">
                  Description
                </Label>
                <Textarea 
                  id="role-description" 
                  className="col-span-3"
                  value={newRoleData.description}
                  onChange={(e) => setNewRoleData({ ...newRoleData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Permissions</Label>
                <div className="col-span-3 space-y-4">
                  {[...new Set(permissions.map((p) => p.category))].map((category) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-medium">{category}</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {permissions
                          .filter((p) => p.category === category)
                          .map((permission) => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={permission.id} 
                                checked={newRoleData.permissions.includes(permission.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setNewRoleData({
                                      ...newRoleData,
                                      permissions: [...newRoleData.permissions, permission.id],
                                    })
                                  } else {
                                    setNewRoleData({
                                      ...newRoleData,
                                      permissions: newRoleData.permissions.filter(id => id !== permission.id),
                                    })
                                  }
                                }}
                              />
                              <Label htmlFor={permission.id} className="flex-1 font-normal">
                                <div>{permission.name}</div>
                                <p className="text-xs text-muted-foreground">{permission.description}</p>
                              </Label>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setNewRoleData({
                  name: "",
                  description: "",
                  permissions: [],
                })
              }}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleCreateRole}>Create Role</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{role.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{role.description}</CardDescription>
                </div>
                <Badge variant="outline" className="ml-2">
                  {role.memberCount} members
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Permissions</span>
                  <span className="text-sm text-muted-foreground">{role.permissions.length} enabled</span>
                </div>
                <div className="space-y-2">
                  {role.permissions.slice(0, 3).map((permissionId) => {
                    const permission = permissions.find((p) => p.id === permissionId)
                    return permission ? (
                      <div key={permission.id} className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-green-500" />
                        <span className="text-sm">{permission.name}</span>
                      </div>
                    ) : null
                  })}
                  {role.permissions.length > 3 && (
                    <div className="text-sm text-muted-foreground">
                      +{role.permissions.length - 3} more permissions
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

import {
  Building,
  Flag,
  Frame,
  LifeBuoy,
  ListTodo,
  Logs,
  Map,
  PieChart,
  Send,
  Settings,
  Settings2,
  UserRound,
  UsersRound
} from "lucide-react";

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: 'dashboard',
      icon: Logs,
      shortcut: 'D',
      isActive: true,
      items: [
        {
          title: 'Activity Feed',
          url: '/dashboard/activity',
          shortcut: 'D A'
        },
        {
          title: 'Daily Tasks',
          url: '/dashboard/daily',
          shortcut: 'D T'
        },
        {
          title: 'Upcoming Deadlines',
          url: '/dashboard/upcoming',
          shortcut: 'D U'
        }
      ]
    },
    {
      title: 'Settings',
      url: '/organization/settings',
      icon: Settings,
      shortcut: 'S'
    },
    {
      title: 'Teams',
      url: 'teams',
      icon: UsersRound,
      shortcut: 'T',
      items: [
        {
          title: 'Team List',
          url: '#',
          shortcut: 'T L'
        },
        {
          title: 'Team Details',
          url: '#',
          shortcut: 'T D'
        },
        {
          title: 'Team Members',
          url: '#',
          shortcut: 'T M'
        },
        {
          title: 'Team Performance',
          url: '#',
          shortcut: 'T P'
        }
      ]
    },
    {
      title: 'Tasks',
      url: 'task',
      icon: ListTodo,
      shortcut: 'L',
      items: [
        {
          title: 'All Tasks',
          url: '#',
          shortcut: 'K A'
        },
        {
          title: 'Assigned to Me',
          url: '#',
          shortcut: 'K M'
        },
        {
          title: 'Created by Me',
          url: '#',
          shortcut: 'K C'
        },
        {
          title: 'Watched Tasks',
          url: '#',
          shortcut: 'K W'
        },
        {
          title: 'Task Statuses',
          url: '#',
          shortcut: 'K S'
        },
        {
          title: 'Labels and Categories',
          url: '#',
          shortcut: 'K L'
        },
        {
          title: 'Recurring Tasks',
          url: '#',
          shortcut: 'K R'
        },
        {
          title: 'Task Dependencies',
          url: '#',
          shortcut: 'K D'
        },
        {
          title: 'Task Archive',
          url: '#',
          shortcut: 'K H'
        }
      ]
    },
    {
      title: 'Time Management',
      url: 'time',
      icon: Settings2,
      shortcut: 'M',
      items: [
        {
          title: 'Time Entries',
          url: '#',
          shortcut: 'M E'
        },
        {
          title: 'Calendar View',
          url: '#',
          shortcut: 'M C'
        },
        {
          title: 'Time Reports',
          url: '#',
          shortcut: 'M R'
        }
      ]
    },
    {
      title: 'Reports',
      url: 'report',
      icon: Flag,
      shortcut: 'R',
      items: [
        {
          title: 'Project Reports',
          url: '#',
          shortcut: 'R P'
        },
        {
          title: 'Team Performance',
          url: '#',
          shortcut: 'R T'
        },
        {
          title: 'Task Analysis',
          url: '#',
          shortcut: 'R A'
        },
        {
          title: 'Time Tracking Analysis',
          url: '#',
          shortcut: 'R TT'
        },
        {
          title: 'Custom Reports',
          url: '#',
          shortcut: 'R C'
        }
      ]
    },
    {
      title: 'Users',
      url: 'user',
      icon: UserRound,
      shortcut: 'U',
      items: [
        {
          title: 'User List',
          url: '#',
          shortcut: 'U L'
        },
        {
          title: 'Roles and Permissions',
          url: '#',
          shortcut: 'U R'
        },
        {
          title: 'Task Analysis',
          url: '#',
          shortcut: 'U A'
        },
        {
          title: 'Time Tracking Analysis',
          url: '#',
          shortcut: 'U T'
        },
        {
          title: 'Custom Reports',
          url: '#',
          shortcut: 'U C'
        }
      ]
    }
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
      shortcut: 'S'
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
      shortcut: 'F'
    }
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
      shortcut: 'P D'
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
      shortcut: 'P S'
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
      shortcut: 'P T'
    }
  ]
};

export default data;

import { Link, useLocation } from 'react-router-dom'
import { Briefcase } from 'lucide-react'
import { cn } from '../lib/utils'

type AppItem = {
  name: string
  route: string
  icon: React.ReactNode
  description: string
}

const APPS: AppItem[] = [
  {
    name: 'JobBuddy',
    route: '/apps/jobbuddy',
    icon: <Briefcase className="h-5 w-5" />,
    description: 'AI-powered job search assistant',
  },
]

const AppsSidebar = () => {
  const location = useLocation()

  return (
    <nav className="w-64 min-h-full border-r border-border bg-card p-4">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Apps</h2>
      <ul className="space-y-2 p-0">
        {APPS.map((app) => (
          <li className="list-none" key={app.route}>
            <Link
              to={app.route}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                location.pathname.includes(app.route)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent text-foreground'
              )}
            >
              {app.icon}
              <div>
                <div className="font-medium">{app.name}</div>
                <div className="text-xs opacity-75">{app.description}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default AppsSidebar

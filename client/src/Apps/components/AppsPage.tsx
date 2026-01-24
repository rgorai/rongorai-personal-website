import { Routes, Route, Navigate } from 'react-router-dom'
import '../styles/tailwind.css'
import AppsSidebar from './AppsSidebar'
import JobBuddyPage from './JobBuddyPage'

const AppsPage = () => {
  return (
    <div className="apps-container">
      <div className="flex min-h-[calc(100vh-4rem)]">
        <AppsSidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to="/apps/jobbuddy" />}
            />
            <Route path="/jobbuddy/*" element={<JobBuddyPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default AppsPage

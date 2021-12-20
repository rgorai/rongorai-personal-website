import { useEffect } from 'react'

const MaintenanceNotice = () => {
  useEffect(() => {
    document.title = 'Under Maintenance!'
  }, [])

  return (
    <>
      <div className="maint-notice-container">
        <h1>Ron Gorai's Website</h1>
        <h2>Under Maintenance!</h2>
        <h2>What's in store:</h2>
        <div className="maint-notice">
          I am rebuilding my website from the ground up using the MERN
          full-stack. Users will be able to view and read about
          different aspects of my life and sign/view a guestbook for
          my site.
        </div>
      </div>
    </>
  )
}

export default MaintenanceNotice

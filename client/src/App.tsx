import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import { parseRoute } from './services/utils'
import ApiError from './Misc/components/ApiError'
import GuestbookPage from './Guestbook/components/GuestbookPage'
import NavBar from './Home/components/NavBar'
import HomePage from './Home/components/HomePage'

import PageTemplate from './PageTemplate/components/PageTemplate'

const App = () => {
  const appContent = [
    {
      name: 'About',
      navItems: ['Myself', 'This Website'],
    },
    {
      name: 'Projects',
      navItems: ['Professional', 'Personal', 'Other'],
    },
    {
      name: 'Hobbies',
      navItems: ['Music', 'STEM', 'Bowling', 'Snowboarding'],
    },
    { name: 'Guestbook', element: <GuestbookPage /> },
  ]

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar
          navItems={appContent.map((e) => ({
            name: e.name,
            route: parseRoute(e.name),
          }))}
        />

        <main>
          <Routes>
            <Route path="/home" element={<Navigate replace to="/" />} />
            <Route path="/" element={<HomePage />} />

            {appContent.map((e, i) => (
              <React.Fragment key={i}>
                <Route
                  path={parseRoute(e.name)}
                  element={
                    e.navItems ? (
                      <Navigate
                        replace
                        to={parseRoute(e.name, e.navItems[0])}
                      />
                    ) : (
                      <PageTemplate contentTitle={e.name} element={e.element} />
                    )
                  }
                />
                {e.navItems &&
                  e.navItems.map((f, j) => (
                    <Route
                      path={parseRoute(e.name, f)}
                      element={
                        <PageTemplate
                          contentSubtitle={f}
                          contentTitle={e.name}
                          navItems={e.navItems}
                          src={parseRoute(e.name, f)}
                        />
                      }
                      key={j}
                    />
                  ))}
              </React.Fragment>
            ))}

            <Route
              path="*"
              element={
                <ApiError
                  status={404}
                  statusText="Not Found"
                  data="invalid react route"
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App

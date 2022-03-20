import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import { parseRoute } from './services/utils'
import ApiError from './Misc/components/ApiError'
import GuestbookPage from './Guestbook/components/GuestbookPage'
import NavBar from './Home/components/NavBar'
import HomePage from './Home/components/HomePage'
import Footer from './Home/components/Footer'
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
      navItems: ['Music', 'Snowboarding', 'STEM', 'Bowling'],
    },
    {
      name: 'Pets',
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
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate replace to="/" />} />

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
                    ) : e.element ? (
                      <PageTemplate contentTitle={e.name} element={e.element} />
                    ) : (
                      <PageTemplate
                        contentTitle={e.name}
                        src={parseRoute(e.name)}
                      />
                    )
                  }
                  key={parseRoute(e.name)}
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
                      key={parseRoute(e.name, f)}
                    />
                  ))}
              </React.Fragment>
            ))}

            <Route
              path="*"
              element={
                <ApiError
                  status={404}
                  statusText="Page Not Found"
                  data="invalid react route"
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>

      <Footer />
    </div>
  )
}

export default App

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import React, { ReactElement } from 'react'
import { parseRoute } from './services/utils'
import ApiError from './Misc/components/ApiError'
import GuestbookPage from './Guestbook/components/GuestbookPage'
import NavBar from './Home/components/NavBar'
import HomePage from './Home/components/HomePage'

import ContentPage from './ContentPage/components/ContentPage'
import Myself from './AppContent/components/About/Myself'
import ThisWebsite from './AppContent/components/About/ThisWebsite'
import Professional from './AppContent/components/Projects/Professional'
import Other from './AppContent/components/Projects/Other'
import Personal from './AppContent/components/Projects/Personal'

function App() {
  const appContent = [
    {
      name: 'About',
      navItems: [
        { name: 'Myself', element: <Myself /> },
        { name: 'This Website', element: <ThisWebsite /> },
      ],
    },
    {
      name: 'Projects',
      navItems: [
        { name: 'Professional', element: <Professional /> },
        { name: 'Personal', element: <Personal /> },
        { name: 'Other', element: <Other /> },
      ],
    },
    {
      name: 'Hobbies',
      navItems: [
        { name: 'Music', element: null },
        { name: 'STEM', element: null },
        { name: 'Bowling', element: null },
        { name: 'Snowboarding', element: null },
      ],
    },
    { name: 'Guestbook', element: <GuestbookPage /> },
  ] as Array<{
    name: string
    navItems?: Array<{ name: string; element: ReactElement }>
    element?: ReactElement
  }>

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar
          navItems={appContent.map((e) => ({
            name: e.name,
            route: parseRoute([e.name]),
          }))}
        />

        <main>
          <Routes>
            <Route
              element={<Navigate replace to="/" />}
              path="/home"
            />
            <Route element={<HomePage />} path="/" />

            {appContent.map((e, i) => (
              <React.Fragment key={i}>
                <Route
                  element={
                    e.navItems ? (
                      <Navigate
                        replace
                        to={parseRoute([e.name, e.navItems[0].name])}
                      />
                    ) : (
                      e.element && (
                        <ContentPage
                          contentTitle={e.name}
                          element={e.element}
                        />
                      )
                    )
                  }
                  path={parseRoute([e.name])}
                />
                {e.navItems &&
                  e.navItems.map((f, j) => (
                    <Route
                      element={
                        <ContentPage
                          contentSubtitle={f.name}
                          contentTitle={e.name}
                          element={f.element}
                          navItems={e.navItems}
                        />
                      }
                      key={j}
                      path={parseRoute([e.name, f.name])}
                    />
                  ))}
              </React.Fragment>
            ))}

            <Route
              element={
                <ApiError
                  {...{
                    status: 404,
                    statusText: 'Not Found',
                    data: 'invalid react route',
                  }}
                />
              }
              path="*"
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App

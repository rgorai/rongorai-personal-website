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
import Music from './AppContent/components/Hobbies/Music'
import STEM from './AppContent/components/Hobbies/STEM'
import Bowling from './AppContent/components/Hobbies/Bowling'
import Snowboarding from './AppContent/components/Hobbies/Snowboarding'

const App = () => {
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
        { name: 'Music', element: <Music /> },
        { name: 'STEM', element: <STEM /> },
        { name: 'Bowling', element: <Bowling /> },
        { name: 'Snowboarding', element: <Snowboarding /> },
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
              path="/home"
              element={<Navigate replace to="/" />}
            />
            <Route path="/" element={<HomePage />} />

            {appContent.map((e, i) => (
              <React.Fragment key={i}>
                <Route
                  path={parseRoute([e.name])}
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
                />
                {e.navItems &&
                  e.navItems.map((f, j) => (
                    <Route
                      path={parseRoute([e.name, f.name])}
                      element={
                        <ContentPage
                          contentSubtitle={f.name}
                          contentTitle={e.name}
                          element={f.element}
                          navItems={e.navItems}
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
                  {...{
                    status: 404,
                    statusText: 'Not Found',
                    data: 'invalid react route',
                  }}
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

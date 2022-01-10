import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import React, { ReactElement } from 'react'
import ApiError from './Misc/components/ApiError'
import GuestbookPage from './Guestbook/components/GuestbookPage'
import NavBar from './Home/components/NavBar'
import HomePage from './Home/components/HomePage'
import ContentPage from './ContentPage/components/ContentPage'
import { getRoute } from './services/utils'

function App() {
  const appContent = [
    { name: 'About', navItems: ['Myself', 'This Website'] },
    {
      name: 'Projects',
      navItems: ['Professional', 'Personal', 'Miscellaneous'],
    },
    {
      name: 'Hobbies',
      navItems: ['Music', 'STEM', 'Bowling', 'Snowboarding'],
    },
    { name: 'Guestbook', element: <GuestbookPage /> },
  ] as Array<{
    name: string
    navItems?: Array<string>
    element?: ReactElement
  }>

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar
          navItems={appContent.map((e) => ({
            name: e.name,
            route: getRoute([e.name]),
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
                    e.element ? (
                      e.element
                    ) : e.navItems ? (
                      <Navigate
                        replace
                        to={e.navItems[0].toLowerCase()}
                      />
                    ) : (
                      <ContentPage contentTitle={e.name} />
                    )
                  }
                  path={getRoute([e.name])}
                />
                {e.navItems &&
                  e.navItems.map((f, j) => (
                    <Route
                      element={
                        <ContentPage
                          contentSubtitle={f}
                          contentTitle={e.name}
                          navItems={e.navItems}
                        />
                      }
                      key={j}
                      path={getRoute([e.name, f])}
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

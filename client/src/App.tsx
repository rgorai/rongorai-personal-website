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
import ContentPage from './Content/components/ContentPage'

function App() {
  const appContent = [
    { name: 'About', navItems: ['Myself', 'This Website'] },
    { name: 'Projects', navItems: ['Professional', 'Personal'] },
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
        <NavBar navItems={appContent.map((e) => e.name)} />

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
                  path={e.name.toLowerCase()}
                  element={
                    e.element ? (
                      e.element
                    ) : e.navItems ? (
                      <Navigate
                        replace
                        to={e.navItems[0].toLowerCase()}
                      />
                    ) : (
                      <ContentPage title={e.name} />
                    )
                  }
                />
                {e.navItems &&
                  e.navItems.map((f, j) => (
                    <Route
                      key={j}
                      path={`${e.name.toLowerCase()}/${f
                        .replace(' ', '')
                        .toLowerCase()}`}
                      element={
                        <ContentPage
                          title={e.name}
                          subtitle={f}
                          navItems={e.navItems}
                        />
                      }
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

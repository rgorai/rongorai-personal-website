import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React, { ReactNode } from 'react'
import { parseRoute, parseFilename } from './services/utils'
import ApiError from './Misc/components/ApiError'
import GuestbookPage from './Guestbook/components/GuestbookPage'
import NavBar from './Home/components/NavBar'
import HomePage from './Home/components/HomePage'
import Footer from './Home/components/Footer'
import PageTemplate from './PageTemplate/components/PageTemplate'
import ResumePage from './Home/components/ResumePage'

export type NavInfo = {
  name: string
  route: string
}

const APP_CONTENT = [
  {
    name: 'About',
    subItems: ['Myself', 'This Website'],
  },
  {
    name: 'Projects',
    subItems: ['Professional', 'Personal', 'Other'],
  },
  {
    name: 'Hobbies',
    subItems: ['Music', 'Snowboarding', 'STEM', 'Bowling'],
  },
  {
    name: 'Pets',
  },
  { name: 'Guestbook', element: <GuestbookPage /> },
] as Array<{
  name: string
  subItems?: Array<string>
  element?: ReactNode
}>

const App = () => (
  <div className="App">
    <BrowserRouter>
      <NavBar
        navItems={APP_CONTENT.map((e) => ({
          name: e.name,
          route: parseRoute(e.name),
          subItems: e.subItems?.map((f) => ({
            name: f,
            route: parseRoute(e.name, f),
          })),
        }))}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                startLocation={parseRoute(
                  APP_CONTENT[0].name,
                  APP_CONTENT[0].subItems ? APP_CONTENT[0].subItems[0] : ''
                )}
              />
            }
          />
          <Route path="/home" element={<Navigate replace to="/" />} />

          <Route path="/resume" element={<ResumePage />} />

          {APP_CONTENT.map((e, i) => (
            <React.Fragment key={i}>
              <Route
                path={parseRoute(e.name, e.subItems ? '*' : '')}
                element={
                  e.element ? (
                    <PageTemplate contentTitle={e.name} element={e.element} />
                  ) : (
                    <PageTemplate
                      contentTitle={e.name}
                      src={parseFilename(e.name)}
                      subItems={e.subItems}
                    />
                  )
                }
                key={parseRoute(e.name)}
              />
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

      <Footer
        navItems={APP_CONTENT.map((e) => ({
          name: e.name,
          route: parseRoute(e.name),
        }))}
      />
    </BrowserRouter>
  </div>
)

export default App

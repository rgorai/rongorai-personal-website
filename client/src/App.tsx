import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import { parseRoute } from './services/utils'
import ApiError from './Misc/components/ApiError'
import GuestbookPage from './Guestbook/components/GuestbookPage'
import NavBar from './Home/components/NavBar'
import HomePage from './Home/components/HomePage'
import Footer from './Home/components/Footer'
import PageTemplate from './PageTemplate/components/PageTemplate'

const appContent = [
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
]

const navItems = appContent.map((e) => ({
  name: e.name,
  route: parseRoute(e.name),
}))

const App = () => (
  <div className="App">
    <BrowserRouter>
      <NavBar navItems={navItems} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate replace to="/" />} />

          {appContent.map((e, i) => (
            <React.Fragment key={i}>
              <Route
                path={parseRoute(e.name)}
                element={
                  e.subItems ? (
                    <Navigate replace to={parseRoute(e.name, e.subItems[0])} />
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
              {e.subItems &&
                e.subItems.map((f) => (
                  <Route
                    path={parseRoute(e.name, f)}
                    element={
                      <PageTemplate
                        contentSubtitle={f}
                        contentTitle={e.name}
                        subItems={e.subItems}
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

      <Footer navItems={navItems} />
    </BrowserRouter>
  </div>
)

export default App

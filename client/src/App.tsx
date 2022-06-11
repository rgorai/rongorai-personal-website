import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import React, { ReactNode, useEffect } from 'react'
import { parseRoute, parseFilename } from './services/utils'
import ApiError from './Misc/components/ApiError'
import GuestbookPage from './Guestbook/components/GuestbookPage'
import NavBar from './Home/components/NavBar'
import HomePage from './Home/components/HomePage'
import PageTemplate from './Home/components/PageTemplate'
import ResumePage from './Home/components/ResumePage'
import Footer from './Misc/components/Footer'
import { StoreProvider } from './services/store'

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
  {
    name: 'Guestbook',
    element: <GuestbookPage />,
  },
  {
    name: 'Resume',
    element: <ResumePage />,
  },
] as Array<{
  name: string
  subItems?: Array<string>
  element?: ReactNode
}>

const App = () => {
  const RouteError = (
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
  )

  // wrapper to ensure page scrolls to top when navigating
  const ScrollToTop = (props: { children: ReactNode }) => {
    const { pathname } = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname])

    return <>{props.children}</>
  }

  return (
    <StoreProvider>
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
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate replace to="/" />} />

                {APP_CONTENT.map((e, i) => (
                  <React.Fragment key={i}>
                    <Route
                      path={parseRoute(e.name, e.subItems ? '*' : '')}
                      element={
                        <PageTemplate
                          {...{
                            contentTitle: e.name,
                            RouteError: RouteError,
                            ...(e.element
                              ? { element: e.element }
                              : {
                                  src: parseFilename(e.name),
                                  subItems: e.subItems,
                                }),
                          }}
                        />
                      }
                      key={parseRoute(e.name)}
                    />
                  </React.Fragment>
                ))}

                {RouteError}
              </Routes>
            </ScrollToTop>
          </main>

          <Footer
            navItems={APP_CONTENT.map((e) => ({
              name: e.name,
              route: parseRoute(e.name, e.subItems ? e.subItems[0] : ''),
            }))}
          />
        </BrowserRouter>
      </div>
    </StoreProvider>
  )
}

export default App

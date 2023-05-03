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
  subItems: Array<Omit<NavInfo, 'subItems'>> | undefined
}

const APP_CONTENT: Array<{
  name: string
  subItems?: Array<string>
  element?: ReactNode
  hideOnNav?: true
}> = [
  {
    name: 'About',
    subItems: ['Myself', 'This Website'],
  },
  {
    name: 'Projects',
    subItems: ['Professional', 'Personal', 'Other'],
  },
  {
    name: 'Extracurriculars',
    subItems: ['GDSC Stevens', 'Music', 'Snowboarding', 'Bowling', 'STEM'],
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
  {
    name: 'TEST RESUME',
    element: <ResumePage test />,
    hideOnNav: true,
  },
]

const NAV_ITEMS: Array<NavInfo> = APP_CONTENT.filter((e) => !e.hideOnNav).map(
  (e) => ({
    name: e.name,
    route: parseRoute(e.name),
    subItems: e.subItems?.map((f) => ({
      name: f,
      route: parseRoute(e.name, f),
    })),
  })
)

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
    const { pathname, hash } = useLocation()
    const url = pathname + hash

    useEffect(() => {
      if (url.split('#').length === 1) window.scrollTo(0, 0)
    }, [url])

    return <>{props.children}</>
  }

  return (
    <div className="App">
      <StoreProvider>
        <BrowserRouter>
          <NavBar navItems={NAV_ITEMS} />

          <main>
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate replace to="/" />} />

                <Route path="/resume" element={<ResumePage />} />

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

          <Footer navItems={NAV_ITEMS} />
        </BrowserRouter>
      </StoreProvider>
    </div>
  )
}

export default App

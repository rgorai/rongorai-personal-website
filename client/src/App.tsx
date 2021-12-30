import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import ApiError from './Misc/components/ApiError'
import GuestbookPage from './Guestbook/components/GuestbookPage'
import MaintenanceNotice from './Home/components/MaintenanceNotice'
import NavBar from './Home/components/NavBar'
import HomePage from './Home/components/HomePage'
import AboutPage from './About/components/AboutPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <main>
          <Routes>
            <Route
              path="/home"
              element={<Navigate replace to="/" />}
            />
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<MaintenanceNotice />} />
            <Route path="/hobbies" element={<MaintenanceNotice />} />
            <Route path="/guestbook" element={<GuestbookPage />} />
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

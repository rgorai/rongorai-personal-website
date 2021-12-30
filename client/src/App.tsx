import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import ApiError from './Misc/ApiError'
import GuestbookPage from './Guestbook/GuestbookPage'
import MaintenanceNotice from './Home/MaintenanceNotice'
import NavBar from './Home/NavBar'
import HomePage from './Home/HomePage'

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
            <Route path="/about" element={<MaintenanceNotice />} />
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

import './App.scss'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import ApiError from './Misc/ApiError'
import GuestbookPage from './Guestbook/GuestbookPage'
import MaintenanceNotice from './Homepage/MaintenanceNotice'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <header className="App-header">Ron Gorai's Website</header> */}

        <main>
          <Routes>
            <Route path="/" element={<MaintenanceNotice />} />
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

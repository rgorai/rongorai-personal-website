import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import ApiError from './components/misc/ApiError'
import GuestbookPage from './components/guestbook/GuestbookPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">Ron Gorai's Website</header>

        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={<div>Under Maintenance!</div>}
            />
            <Route
              exact
              path="/guestbook"
              element={<GuestbookPage />}
            />
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

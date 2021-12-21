import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import ApiError from './components/misc/ApiError'
import GuestbookPage from './components/guestbook/GuestbookPage'
import MaintenanceNotice from './components/homepage/MaintenanceNotice'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <header className="App-header">Ron Gorai's Website</header> */}

        <main>
          <Routes>
            <Route path="/" element={<MaintenanceNotice />} />
            <Route
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
  );
}

export default App;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Colleges from './pages/Colleges';
import AddColleges from './pages/AddColleges';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Notes from './pages/Notes';
import Login from './Login';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protect all other routes */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className='grid-container'>
                <Header OpenSidebar={OpenSidebar} />
                <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
                <main className='main-content'>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/colleges" element={<Colleges />} />
                    <Route path="/add-colleges" element={<AddColleges />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/notes" element={<Notes />} />
                  </Routes>
                </main>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

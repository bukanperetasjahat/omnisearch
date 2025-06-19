import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import SearchEngine from './components/SearchEngine';
import DataDisplay from './components/DataDisplay';
import Editor from './components/Editor';

function App() {
  // Simple auth state simulation (replace with real auth logic)
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={user ? (user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />) : <Navigate to="/" />}
        />
        <Route path="/search" element={user ? <SearchEngine /> : <Navigate to="/" />} />
        <Route path="/data" element={user ? <DataDisplay /> : <Navigate to="/" />} />
        <Route path="/editor" element={user ? <Editor /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

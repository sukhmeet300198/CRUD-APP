import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeCreate from './components/EmployeeCreate';
// import EmployeeUpdate from './components/EmployeeUpdate';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create Employee</Link>
            </li>
          </ul>
        </nav>

        {/* Route Configuration for React Router */}
        <Routes>
          <Route path="/create" element={<EmployeeCreate />} />
          {/* <Route path="/update/:id" element={<EmployeeUpdate />} /> */}
          <Route path="/employees/:type" element={<EmployeeDirectory />} />
          <Route path="/" element={<EmployeeDirectory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

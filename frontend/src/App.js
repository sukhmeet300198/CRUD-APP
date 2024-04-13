import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeDetail from './components/EmployeeDetail';
import EmployeeUpdate from './components/EmployeeUpdate';
import Header from './components/Header';
import UpcomingRetirements from './components/UpcomingRetirements';

function App() {
  return (
    <Router>
      <div>
        <nav>
        <Header />
        </nav>

        {/* Route Configuration for React Router */}
        <Routes>
          <Route path="/create" element={<EmployeeCreate />} />
          <Route path="/employees/update/:employeeId" element={<EmployeeUpdate />} />
          <Route path="/employeesDetail/:id" element={<EmployeeDetail />} />
          <Route path="/employees/:type" element={<EmployeeDirectory />} />
          <Route path="/upcoming-retirements" element={<UpcomingRetirements />} />
          <Route path="/" element={<EmployeeDirectory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

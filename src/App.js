import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyAdd from "./page/CompanyAdd.js";
import GetCompanies from './page/getCompany'
import EmployessAdd from './page/EmployessAdd'
import GetEmployess from './page/getEmployess.js';
import Home from './page/Home';
import Layout from './page/Layout.js';

function App() {
  return (
    <Router>
      <Layout />
      <Routes>
      <Route path='/' element={<GetCompanies />} />
        <Route path='/CompanyAdd' element={<CompanyAdd />} />
       
        <Route path='/EmployessAdd' element={<EmployessAdd />} />
        <Route path='/GetEmployess' element={<GetEmployess />} />
      </Routes>
    </Router>
  );
}

export default App;
// import React from 'react'
// import Home from './page/Home'
// import CompanyForm from './page/CompanyAdd'
// import GetCompanies from './page/getCompany'
// import EmployessAdd from './page/EmployessAdd'

// function App() {
//   return (
//   <CompanyForm />
//   )
// }

// export default App

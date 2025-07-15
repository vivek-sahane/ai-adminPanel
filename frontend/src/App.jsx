import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Edit from './pages/Edit';
import Create from './pages/Create';


function App() {


  return (
    <Router>
      <Navbar />
      <div className='p-4 max-w-6xl mx-auto'>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path='/edit/:id' element={<Edit/>} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

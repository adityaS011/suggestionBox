import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />  {/* Home component for root path */}
        <Route path="/Login" element={<Login/>} />  {/* About component for /about path */}
        <Route path="/MyDashboard" element={<Dashboard/>} />  {/* About component for /about path */}
        
      </Routes>
    </BrowserRouter>
  ); 
};

export default App;

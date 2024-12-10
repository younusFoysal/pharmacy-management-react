import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
// import Purchases from './pages/Purchases';
// import Suppliers from './pages/Suppliers';
// import Customers from './pages/Customers';
// import Reports from './pages/Reports';
// import Settings from './pages/Settings';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="sales" element={<Sales />} />
            {/*<Route path="purchases" element={<Purchases />} />*/}
            {/*<Route path="suppliers" element={<Suppliers />} />*/}
            {/*<Route path="customers" element={<Customers />} />*/}
            {/*<Route path="reports" element={<Reports />} />*/}
            {/*<Route path="settings" element={<Settings />} />*/}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
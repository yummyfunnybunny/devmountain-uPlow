import './styles/main.css';
import './styles/components/button.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import App from './App.jsx';
import Home from './components/pages/Home.jsx';
import Dashboard from './components/pages/Dashboard.jsx';
import Contact from './components/pages/Contact.jsx';
import Login from './components/pages/Login.jsx';
import Signup from './components/pages/Signup.jsx';

// ANCHOR -- Create Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/Dashboard' element={<Dashboard />} />
      <Route path='/Contact' element={<Contact />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

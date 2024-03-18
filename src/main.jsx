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
import FAQ from './components/pages/FAQ.jsx';

const root = import.meta.env.VITE_REACT_APP_ROOT;

// ANCHOR -- Create Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={`${root}/`} element={<App />}>
      <Route index element={<Home />} />
      <Route path={`${root}/login`} element={<Login />} />
      <Route path={`${root}/signup`} element={<Signup />} />
      <Route path={`${root}/dashboard`} element={<Dashboard />} />
      <Route path={`${root}/contact`} element={<Contact />} />
      <Route path={`${root}/faq`} element={<FAQ />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

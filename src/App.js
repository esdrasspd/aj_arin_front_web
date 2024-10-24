import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";
import { useEffect, useState } from "react";
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { AnimatePresence } from "framer-motion";
import Home from "./sections/index/Home";
import About from "./sections/index/About";
import ScrollTriggerProxy from './components/index/ScrollTriggerProxy';
import Footer from './sections/index/Footer';
import Loader from "./components/index/Loader";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Reportes from "./components/reportes/Reportes";
import Administradores from "./components/administradores/Administradores";
import InactivityHandler from "./InactivityHandler";

function ProtectedRoute({ element }) {
  const name = localStorage.getItem('name');
  const dpi = localStorage.getItem('dpi');

  if (!name || !dpi) {
    return <Navigate to="/" />;
  }

  return element;
}

function App() {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  const isLoginPage = location.pathname === '/login';

  return (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      {isLoginPage ? (
        <main className='App'>
          <Login />
        </main>
      ) : (
        <>
          <InactivityHandler />
          <AnimatePresence>
            {loaded ? null : <Loader />}
          </AnimatePresence>
          <ScrollTriggerProxy />
          <AnimatePresence>
            <main className='App' data-scroll-container>
              <Home />

            </main>
          </AnimatePresence>
        </>
      )}
    </ThemeProvider>
  );
}

export default function AppWrapper() {
  return (
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<App />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/admins" element={<ProtectedRoute element={<Administradores />} />} />
        <Route path="/reports" element={<ProtectedRoute element={<Reportes />} />} />
      </Routes>
  );
}

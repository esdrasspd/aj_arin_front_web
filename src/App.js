import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";
import { useEffect, useState } from "react";
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { AnimatePresence } from "framer-motion";
import Home from "./sections/index/Home";
import About from "./sections/index/About";
import Shop from "./sections/index/Shop";
import ScrollTriggerProxy from './components/index/ScrollTriggerProxy';
import Footer from './sections/index/Footer';
import Loader from "./components/index/Loader";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import User from "./components/user/User";
import Sidebar from "./sections/reutilizables/SidebarCustom";
import { Business } from "@mui/icons-material";
import Empresa from "./components/empresa/Empresa";

function App() {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  const isLoginPage = location.pathname === '/login';
  const isDashboardPage = location.pathname === '/dashboard';
  const isUserPage = location.pathname === '/user';
  const isBusinessPage = location.pathname === '/business';

  return (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      {isDashboardPage ? (
        <main className='App'>
          <Dashboard />
        </main>
      ): isBusinessPage ? (
        <main className='App'>
          <Empresa />
        </main>
      ) : isUserPage ? (
        <main className='App'>
          <User />
        </main>
      ) : isLoginPage ? (
        <main className='App'>
          <Login />
        </main>
      ) : (
        <>
          <AnimatePresence>
            {loaded ? null : <Loader />}
          </AnimatePresence>
          <ScrollTriggerProxy />
          <AnimatePresence>
            <main className='App' data-scroll-container>
              <Home />
              <About />
              <Shop />
              <Footer />
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
      <Route path="/dashboard" element={<App />} />
      <Route path="/user" element={<App />} />
      <Route path="/business" element={<App />} />
      {/* Añadir otras rutas aquí si es necesario */}
    </Routes>
  );
}

import React, { useEffect, useRef } from 'react';

const InactivityHandler = () => {
  const inactivityTimeoutRef = useRef(null);

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const resetInactivityTimer = () => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    inactivityTimeoutRef.current = setTimeout(() => {
      clearLocalStorage();
    }, 20 * 60 * 1000); 
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click'];

    events.forEach((event) => window.addEventListener(event, resetInactivityTimer));

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimeoutRef.current);
      events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
    };
  }, []);


  useEffect(() => {
    const handleUnload = () => {
      clearLocalStorage(); 
    };


    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return <div></div>;
};

export default InactivityHandler;

import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}


export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Get the user data from local storage if it exists
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [events, setEvents] = useState(() => {
    // Get the user's events data from local storage if it exists
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  // Store the user data and events data in local storage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Function to add an event to the user's events
  const addEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  // Function to handle user logout
  const logoutUser = () => {
    setUser(null);
    // Optionally, you can clear the events as well if needed
    setEvents([]);
  };

  return (
    <UserContext.Provider value={{ user, setUser, events, addEvent, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tf_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [addresses, setAddresses] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeAddress, setActiveAddress] = useState(null);
  
  const isLoaded = useRef(false);

  useEffect(() => {
    if (user?.id) {
      isLoaded.current = false;
      const savedAddresses = localStorage.getItem(`tf_addresses_${user.id}`);
      const savedFavorites = localStorage.getItem(`tf_favorites_${user.id}`);
      const savedActive = localStorage.getItem(`tf_active_address_${user.id}`);

      setAddresses(savedAddresses ? JSON.parse(savedAddresses) : []);
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
      setActiveAddress(savedActive ? JSON.parse(savedActive) : null);
      
      setTimeout(() => {
        isLoaded.current = true;
      }, 150);
    } else {
      setAddresses([]);
      setFavorites([]);
      setActiveAddress(null);
      isLoaded.current = false;
    }
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('tf_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tf_user');
    }
  }, [user]);

  useEffect(() => {
    if (isLoaded.current && user?.id) {
      localStorage.setItem(`tf_addresses_${user.id}`, JSON.stringify(addresses));
    }
  }, [addresses, user?.id]);

  useEffect(() => {
    if (isLoaded.current && user?.id) {
      localStorage.setItem(`tf_favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user?.id]);

  useEffect(() => {
    if (isLoaded.current && user?.id) {
      localStorage.setItem(`tf_active_address_${user.id}`, JSON.stringify(activeAddress));
    }
  }, [activeAddress, user?.id]);

  const clearSession = () => {
    isLoaded.current = false;
    setUser(null);
    setAddresses([]);
    setFavorites([]);
    setActiveAddress(null);
    localStorage.removeItem('tf_user');
  };

  const addAddress = (newAddr) => {
    const freshAddr = { 
      ...newAddr, 
      id: Date.now(),
      isDefault: addresses.length === 0 
    };
    setAddresses(prev => [...prev, freshAddr]);
    if (!activeAddress) setActiveAddress(freshAddr);
  };

  const deleteAddress = (id) => {
    setAddresses(prev => {
      const filtered = prev.filter(addr => addr.id !== id);
      if (activeAddress?.id === id) {
        setActiveAddress(filtered.length > 0 ? filtered[0] : null);
      }
      return filtered;
    });
  };

  const toggleFavorite = (restaurant) => {
    setFavorites(prev => {
      const isExist = prev.find(f => Number(f.id) === Number(restaurant.id));
      if (isExist) {
        return prev.filter(f => Number(f.id) !== Number(restaurant.id));
      }
      return [...prev, restaurant];
    });
  };

  return (
    <ProfileContext.Provider value={{ 
      user, setUser, addresses, setAddresses, activeAddress, setActiveAddress, addAddress, deleteAddress, favorites, toggleFavorite, clearSession
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
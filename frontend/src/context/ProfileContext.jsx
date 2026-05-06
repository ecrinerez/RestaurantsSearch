import React, { createContext, useState, useContext, useEffect } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tf_user');
    return saved ? JSON.parse(saved) : {
      firstName: "Ecrin", 
      lastName: "",
      email: "x@gmail.com", 
      phone: "+90 555 55 55", 
      birthDate: "2003-08-20"
    };
  });

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('tf_addresses');
    return saved ? JSON.parse(saved) : []; 
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('tf_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeAddress, setActiveAddress] = useState(() => {
    const savedActive = localStorage.getItem('tf_active_address');
    return savedActive ? JSON.parse(savedActive) : null;
  });

  useEffect(() => {
    localStorage.setItem('tf_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tf_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('tf_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('tf_active_address', JSON.stringify(activeAddress));
  }, [activeAddress]);

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
      const isExist = prev.find(f => f.id === restaurant.id);
      if (isExist) {
        return prev.filter(f => f.id !== restaurant.id);
      }
      return [...prev, restaurant];
    });
  };

  return (
    <ProfileContext.Provider value={{ 
      user, setUser, addresses, setAddresses, activeAddress, setActiveAddress, addAddress, deleteAddress, favorites, toggleFavorite 
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
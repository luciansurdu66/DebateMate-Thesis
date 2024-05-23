
import React, { useEffect, useState } from 'react';
export const DebaterContext = React.createContext();
import DebaterService from '../services/DebaterService';

export const DebaterProvider = ({ children }) => {
    const [debaters, setDebaters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchDebaters = async () => {
        setIsLoading(true);
        const debatersData = (await DebaterService.getDebaters()).debaters;
        if (Array.isArray(debatersData)) {
          setDebaters(debatersData);
        } else {
          console.error('DebaterService.getDebaters() did not return an array');
          setDebaters([]); // Set debaters to an empty array as a fallback
        }
        setIsLoading(false);
      };
  
      fetchDebaters();
    }, []);
  
    return (
      <DebaterContext.Provider value={{ debaters, isLoading }}>
        {children}
      </DebaterContext.Provider>
    );
  };
// LoadingContext.js
import React, {  useState } from 'react';
import { createContext } from '../utils/createContext';
import Loading from '../components/Loading';

// Create context
const [Provider,useLoadingContext] = createContext();

// Create provider component
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return (
    <Provider value={{loading, startLoading, stopLoading }}>
      {children}
      <Loading/>
    </Provider>
  );
};

export { useLoadingContext };
export default LoadingProvider;
// Custom hook to use the loading context

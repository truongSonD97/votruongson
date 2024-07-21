// Loading.js
import React from 'react';
import '../assets/styles/loading.css'; // Import CSS for styling
import { useLoadingContext } from '../contexts/LoadingContext';

const Loading = () => {
    const {loading} = useLoadingContext()
  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;

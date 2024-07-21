// src/components/TokenConversionForm.js
import React from "react";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import FancyForm from "./FancyForm";
import LoadingProvider from "./contexts/LoadingContext";

Modal.setAppElement("#root");

const App = () => {
  return (
    <LoadingProvider>
      <FancyForm />
      <Toaster position="top-right" reverseOrder={false} gutter={8} />
    </LoadingProvider>
  );
};

export default App;

// src/components/TokenConversionForm.js
import React, { useRef, useState, useEffect } from "react";
import IconSwap from "./components/icons/IconSwap";
import { getDefaultToken } from "./utils/token";
import { ModalListCoin } from "./components/ModalListCoin";
import { CONVERTING_SELECTED_TYPE } from "./constants/ModalType";
import toast from "react-hot-toast";
import { useLoadingContext } from "./contexts/LoadingContext";


const defaultTokenConverting = getDefaultToken();

const FancyForm = () => {
  const [isModalOpen, setIsModalOpen] = useState({ visible: false, type: "" });
  const [tokens, setTokens] = useState({
    fromToken: defaultTokenConverting[0],
    toToken: defaultTokenConverting[1],
  });
  const fromValueRef = useRef(null);
  const toValueRef = useRef(null);
  const submitButtonRef = useRef(null);
  const {startLoading, stopLoading} = useLoadingContext()

  const openModal = (type) => {
    setIsModalOpen({ visible: true, type });
  };

  const closeModal = () => {
    setIsModalOpen({ visible: false, type: "" });
  };

  const handleTokenSelect = (token) => {
    if (
      isModalOpen.type === CONVERTING_SELECTED_TYPE.FROM &&
      tokens.fromToken.name !== token.name
    ) {
      setTokens((prevTokens) => ({
        ...prevTokens,
        fromToken: token,
      }));
      fromValueRef.current.value = null;
      toValueRef.current.value = null;
    } else if (
      isModalOpen.type === CONVERTING_SELECTED_TYPE.TO &&
      tokens.toToken.name !== token.name
    ) {
      setTokens((prevTokens) => ({
        ...prevTokens,
        toToken: token,
      }));
      fromValueRef.current.value = null;
      toValueRef.current.value = null;
    }
    closeModal();
  };

  const handleInputChange = (e, type) => {
    const amount = e.target.value;
    const fromRate = tokens.fromToken.price;
    const toRate = tokens.toToken.price;
    let convertedAmount;
    if (type === "from") {
      convertedAmount = amount === '' ? "" : amount * (fromRate / toRate);
        toValueRef.current.value = convertedAmount;
    } else if (type === "to") {
      convertedAmount = amount === '' ? "" : amount * (toRate / fromRate);
        fromValueRef.current.value = convertedAmount;
    }
    handleUpdateButton(amount)
  };

  const handleUpdateButton = (value) => {
      if (value && submitButtonRef.current.disabled) {
        submitButtonRef.current.disabled = false;
        return
      } else if (!value && !submitButtonRef.current.disabled) {
        submitButtonRef.current.disabled = true;
        return
      }
      return
  }

  const handleSwap = () => {
    setTokens((prevTokens) => ({
      fromToken: prevTokens.toToken,
      toToken: prevTokens.fromToken,
    }));
    const currentFromTokenAmount = fromValueRef.current.value;
    fromValueRef.current.value = toValueRef.current.value;
    toValueRef.current.value = currentFromTokenAmount;
    handleUpdateButton(fromValueRef.current.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading()  
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
        fromValueRef.current.value = '';
        toValueRef.current.value = '';
        submitButtonRef.current.disabled = true
        toast.success("Conversation successfully!")
        stopLoading()
    } catch (error) {
        toast.error(error?.message || "Network error occurred. Please try again later.")
        stopLoading()
    }
  }

  useEffect(()=>{
    submitButtonRef.current.disabled = true
  },[])

  return (
    <div className="form-container">
      <div className="form-group">
        <label>From</label>
        <div className="form-group__input">
          <input
            ref={fromValueRef}
            type="number"
            placeholder="0.01 - 2800000"
            onChange={(e) => handleInputChange(e, "from")}
          />
          <div
            className="cursor form-group__token"
            onClick={() => openModal(CONVERTING_SELECTED_TYPE.FROM)}
          >
            {tokens.fromToken.imgPath && (
              <img
                src={tokens.fromToken.imgPath}
                alt={tokens.fromToken.name}
                style={{ width: "20px", marginRight: "5px" }}
              />
            )}
            {tokens.fromToken.name}
          </div>
        </div>
      </div>
      <div className="divide cursor" onClick={handleSwap}>
        <IconSwap className="icon__hover-color-white" />
      </div>
      <div className="form-group">
        <label>To</label>
        <div className="form-group__input">
          <input
            type="number"
            placeholder="0.00000015 - 42"
            autoComplete="off"
            ref={toValueRef}
            onChange={(e) => handleInputChange(e, "to")}
          />
          <div
            className="cursor form-group__token"
            onClick={() => openModal(CONVERTING_SELECTED_TYPE.TO)}
          >
            {tokens.toToken.imgPath && (
              <img
                src={tokens.toToken.imgPath}
                alt={tokens.toToken.name}
                style={{ width: "20px", marginRight: "5px" }}
              />
            )}
            {tokens.toToken.name}
          </div>
        </div>
      </div>
      <button 
      ref={submitButtonRef} 
      className="submit-button"
      onClick={handleSubmit}
      >
        Confirm
      </button>
      <ModalListCoin
        isOpen={isModalOpen.visible}
        closeModal={closeModal}
        handleTokenSelect={handleTokenSelect}
      />
    </div>
  );
};

export default FancyForm;

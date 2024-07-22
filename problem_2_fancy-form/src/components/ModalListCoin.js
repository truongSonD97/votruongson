import { useMemo, useState } from "react";
import { getListToken } from "../utils/token";
import Modal from "./common/Modal";

const tokens =  getListToken()

export const ModalListCoin = ({ isOpen, closeModal, handleTokenSelect }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Add more tokens as needed

  const filteredTokens = useMemo(()=>{
    return tokens.filter((token) =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase()))
  },[searchTerm]) 
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClose = () => {
    closeModal()
    setSearchTerm('')
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} className="modal">
      <h2>Select Currency</h2>
      <input
        type="text"
        placeholder="Search token"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <ul>
        {filteredTokens.map((token, index) => (
          <li key={index} onClick={() => handleTokenSelect(token)}>
            <img height={24} width={24} src={token.imgPath} alt={token.name} />
            {token.name}
          </li>
        ))}
      </ul>
    </Modal>
  );
};

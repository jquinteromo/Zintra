import { useState } from "react";

export const StatesDiscover = () => {
  const [ShowModal, setShowModal] = useState(false);
 
  return {
    ShowModal,
    setShowModal,
    
  };
};

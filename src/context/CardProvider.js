import React from "react";

export const CardContext = React.createContext();

const AppProvider = ({ children }) => {
  const [card, setCard] = React.useState(() => {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  });
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(card));
  }, [card]);

  return (
    <CardContext.Provider value={{ card, setCard, showModal, setShowModal }}>
      {children}
    </CardContext.Provider>
  );
};

export default AppProvider;

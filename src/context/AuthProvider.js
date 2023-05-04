import React from "react";

export const AuthContext = React.createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    const user = localStorage.getItem("Auth");
    if (user) {
      setUser({ username: "admin" });
    }
  }, [setUser]);
  const [loginModal, setLoginModal] = React.useState(false);
  return (
    <AuthContext.Provider value={{ user, setUser, loginModal, setLoginModal }}>
      {children}
    </AuthContext.Provider>
  );
}

import React from "react";

export const ThemeContext = React.createContext();
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(() => {
    const data = localStorage.getItem("Theme");
    return data
      ? JSON.parse(data)
      : {
          isLightTheme: true,
          light: {
            backgroundColor: "#F9F9F9",
            color: "black",
            navbarColor: "#1597BB",
            footerColor: "#1687A7",
            cardColor: "#FFFFFF",
            jumboColor: "#E8E8E8"
          },
          dark: {
            backgroundColor: "#232323",
            color: "white",
            navbarColor: "#3F3F3F",
            footerColor: "#151515",
            cardColor: "#343434",
            jumboColor: "#343434"
          }
        };
  });
  React.useEffect(() => {
    localStorage.setItem("Theme", JSON.stringify(theme));
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

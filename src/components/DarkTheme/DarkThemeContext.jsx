import { Children, createContext, useEffect, useReducer } from "react";

const initialState = {
  darkMode: false,
};

function darkModeReducer(state, action) {
  switch (action.type) {
    case "DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
}
export const DarkModeContext = createContext();

export function DarkThemeProvider({ children }) {
  const [state, dispatch] = useReducer(darkModeReducer, initialState);

  useEffect(() => {
    const body = document.body;
    body.className = state.darkMode ? "dark" : "light";
  }, [state.darkMode]);

  function handleDarkMode() {
    dispatch({ type: "DARK_MODE" });
  }

  return (
    <DarkModeContext.Provider value={{ ...state, handleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

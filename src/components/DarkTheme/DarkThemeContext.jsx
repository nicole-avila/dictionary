import { createContext, useEffect, useReducer } from "react";

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

/* 
DarkThemeProvider Component manages the application's dark mode state using a reducer.
It lets you switch between dark and light modes and updates the body class of 
the document to match the selected mode.
*/
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

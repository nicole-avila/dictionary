import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { DarkThemeProvider } from "./components/DarkTheme/DarkThemeContext.jsx";
import { FavoriteListProvider } from "./components/FavoriteListContext/FavoriteListContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkThemeProvider>
      <FavoriteListProvider>
        <App />
      </FavoriteListProvider>
    </DarkThemeProvider>
  </React.StrictMode>
);

/* I chose to import my DarkThemeProvider and FavoriteListProvider 
here, on main to make my app component look 'cleaner' */

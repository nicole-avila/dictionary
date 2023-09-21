import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* I chose to import my DarkThemeProvider and FavoriteListProvider 
here, on main to make my app component look 'cleaner' */

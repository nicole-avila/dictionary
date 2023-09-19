import "./DarkThemeButton.scss";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import { useContext } from "react";
import { DarkModeContext } from "../DarkTheme/DarkThemeContext";

export default function DarkThemeButton() {
  const { darkMode, handleDarkMode } = useContext(DarkModeContext);

  function ToggleThemeButon() {
    handleDarkMode();
  }

  return (
    <div className="theme-btn">
      {/* <button onClick={ToggleThemeButon}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button> */}

      <input type="checkbox" id="darkmode-toggle" />
      <label onClick={ToggleThemeButon} htmlFor="darkmode-toggle">
        {darkMode ? (
          <img className="theme-btn__sun" src={sun} alt="" />
        ) : (
          <img className="theme-btn__moon" src={moon} alt="" />
        )}
      </label>
    </div>
  );
}

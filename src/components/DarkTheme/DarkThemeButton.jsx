import "./DarkThemeButton.scss";
import { DarkModeContext } from "../DarkTheme/DarkThemeContext";
import { useContext } from "react";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";

export default function DarkThemeButton() {
  const { handleDarkMode } = useContext(DarkModeContext);

  function ToggleThemeButon() {
    handleDarkMode();
  }

  return (
    <div className="theme-btn">
      <input onClick={ToggleThemeButon} type="checkbox" id="darkmode-toggle" />
      <label htmlFor="darkmode-toggle">
        <img className="sun" src={sun} alt="sun" />
        <img className="moon" src={moon} alt="moon" />
      </label>
    </div>
  );
}

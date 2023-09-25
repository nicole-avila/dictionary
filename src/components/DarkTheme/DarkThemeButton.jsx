import "./DarkThemeButton.scss";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import { useContext } from "react";
import { DarkModeContext } from "../DarkTheme/DarkThemeContext";

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

{
  /* <button onClick={ToggleThemeButon}>
        {darkMode ? "Light" : "Dark"}
      </button> */
}

// {darkMode ? (
//   <img className="theme-btn__sun" src={sun} alt="" />
// ) : (
//   <img className="theme-btn__moon" src={moon} alt="" />
// )}

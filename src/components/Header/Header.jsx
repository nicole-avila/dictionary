import "./Header.scss";
import favoriteHeart from "../../assets/heart-w.svg";
import DarkThemeButton from "../DarkTheme/DarkThemeButton";

export default function Header({ setFavoriteListVisible }) {
  function toggleFavoriteList() {
    setFavoriteListVisible((prevListVisible) => !prevListVisible);
  }

  return (
    <header className="header">
      <div className="header__btn">
        <DarkThemeButton />
      </div>
      <div className="header__container" onClick={toggleFavoriteList}>
        <h1 className="header__title">dictionary</h1>
        <img
          className="header__heart-icon"
          src={favoriteHeart}
          alt="icon in a shape of a heart"
        />
      </div>
    </header>
  );
}

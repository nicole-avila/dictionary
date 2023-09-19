import "./Header.scss";

import DarkThemeButton from "../DarkTheme/DarkThemeButton";

export default function Header() {
  return (
    <header className="header">
      <div className="header__btn">
        <DarkThemeButton />
      </div>
    </header>
  );
}

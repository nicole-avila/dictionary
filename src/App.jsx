import "./App.scss";
import { useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import favoriteHeart from "./assets/heart-w.svg";
import FavoriteList from "./components/FavoriteList/FavoriteList";
import DisplaySearchWord from "./components/DisplaySearchWord/DisplaySearchWord";
import { FavoriteListProvider } from "./components/FavoriteListContext/FavoriteListContext";
import { DarkThemeProvider } from "./components/DarkTheme/DarkThemeContext";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [favoriteStar, setFavoriteStar] = useState(false);
  const [favoriteListVisible, setFavoriteListVisible] = useState(false);

  function toggleFavoriteList() {
    setFavoriteListVisible((prevListVisible) => !prevListVisible);
  }
  //TODO - audio elementen syns igenom toggle favoriteList när den är visible!
  //TODO - fixa darkThemeButton, se kommentar i scss filen
  //TODO - I favoritList gör bara ett ord visible vid klick och hidden på alla andra ord
  return (
    <DarkThemeProvider>
      <FavoriteListProvider>
        <div className="app">
          <Header />
          <div className="app__top-container">
            <SearchBar
              searchWord={searchWord}
              setSearchWord={setSearchWord}
              setFavoriteStar={setFavoriteStar}
            />
            <img
              className="app__heart"
              src={favoriteHeart}
              alt="icon in a shape of a heart"
              onClick={toggleFavoriteList}
            />
            <div className="app__favorite-list">
              {favoriteListVisible && <FavoriteList />}
            </div>
          </div>
        </div>

        {Array.isArray(searchWord) && searchWord.length > 0 && (
          <DisplaySearchWord
            searchWord={searchWord}
            favoriteStar={favoriteStar}
            setFavoriteStar={setFavoriteStar}
          />
        )}
      </FavoriteListProvider>
    </DarkThemeProvider>
  );
}

export default App;

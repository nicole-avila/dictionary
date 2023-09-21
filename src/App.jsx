import "./App.scss";
import { useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import FavoriteList from "./components/FavoriteList/FavoriteList";
import DisplaySearchWord from "./components/DisplaySearchWord/DisplaySearchWord";

//TODO - Lägg en state på dina FavoritList 'din favorit' och 'dina fivoriter' och ' du har inga favoriter' beroende på antal ord användare gillar
//TODO - Man ska bara kunna likea ett ord och inte alla!
//TODO - fixa darkThemeButton, toggel är inte komplett - se kommentar i scss filen
//TODO - I favoritList att bara visa innehåll för ett ord och inte alla.. useState . SelectedWord

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [favoriteStar, setFavoriteStar] = useState(false);
  const [favoriteListVisible, setFavoriteListVisible] = useState(false);

  return (
    <div className="app">
      <Header setFavoriteListVisible={setFavoriteListVisible} />
      {favoriteListVisible ? (
        <div className="app__favorite-list">
          <FavoriteList />
        </div>
      ) : (
        <div>
          <div className="app__search">
            <SearchBar
              setSearchWord={setSearchWord}
              setFavoriteStar={setFavoriteStar}
            />
          </div>
          {Array.isArray(searchWord) && searchWord.length > 0 && (
            <DisplaySearchWord
              searchWord={searchWord}
              favoriteStar={favoriteStar}
              setFavoriteStar={setFavoriteStar}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;

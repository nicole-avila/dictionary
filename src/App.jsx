import { useState } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import DisplaySearchWord from "./components/DisplaySearchWord/DisplaySearchWord";
import { FavoriteListProvider } from "./components/FavoriteListContext/FavoriteListContext";
import FavoriteList from "./components/FavoriteList/FavoriteList";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [favoriteStar, setFavoriteStar] = useState(false);

  return (
    <FavoriteListProvider>
      <div className="app">
        <SearchBar
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          setFavoriteStar={setFavoriteStar}
        />

        {Array.isArray(searchWord) && searchWord.length > 0 && (
          <DisplaySearchWord
            searchWord={searchWord}
            favoriteStar={favoriteStar}
            setFavoriteStar={setFavoriteStar}
          />
        )}
      </div>
      <FavoriteList />
    </FavoriteListProvider>
  );
}

export default App;

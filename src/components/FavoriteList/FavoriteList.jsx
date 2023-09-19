import "./FavoriteList.scss";
import { FavoriteListContext } from "../FavoriteListContext/FavoriteListContext";
import { useContext } from "react";

export default function FavoriteList() {
  const { favorites, removeFavorite } = useContext(FavoriteListContext);

  function handleRemoveFavorite(word) {
    removeFavorite(word);
  }

  return (
    <div className="favorites">
      <h1>dina favoriter</h1>
      {favorites.map((favorite, index) => (
        <article key={index}>
          <p>{favorite.word}</p>
          <button onClick={() => handleRemoveFavorite(favorite.word)}>
            delete word
          </button>
        </article>
      ))}
    </div>
  );
}

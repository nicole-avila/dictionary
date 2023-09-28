import "./FavoriteList.scss";
import { FavoriteListContext } from "../FavoriteListProvider/FavoriteListProvider";
import { useContext, useState } from "react";
import FavoriteWord from "./FavoriteWord";

/*
FavoriteList Component shows a list of favorite words that the user has marked as favorites. 
It uses the FavoriteListContext to handle and display these favorites. 
Each word in the list allows the user to view the details from the favorite word and remove it from the favorites list.
*/

export default function FavoriteList() {
  const [selectedWord, setSelectedWord] = useState("");
  const [favoriteInfoVisible, setFavoriteInfoVisible] = useState(false);
  const { favorites, removeFavorite } = useContext(FavoriteListContext);

  function handleRemoveFavorite(word) {
    removeFavorite(word);
  }

  function handleInfoVisibility(word) {
    setSelectedWord(word);
    setFavoriteInfoVisible((prevInfoVisible) => !prevInfoVisible);
  }

  return (
    <div className="favorites">
      {favorites.length === 0 ? (
        <h1 className="favorites__title">
          lägg till ett{" "}
          <span>
            {" "}
            <b>favorit</b>
          </span>
          ord
        </h1>
      ) : (
        <h1 className="favorites__title">
          {favorites.length > 1 ? "dina favoriter" : "din favorit"}
        </h1>
      )}
      {favorites.map((favorite, index) => (
        <article key={index}>
          <div className="favorites__word-container">
            <div
              className="favorites__word"
              onClick={() => handleInfoVisibility(favorite.word)}
            >
              <p className="favorites_favorite">{favorite.word} </p>
              <p>{favorite.phonetic}</p>
            </div>
            <div className="favorites__article">
              <button
                className="favorites__btn"
                onClick={() => handleRemoveFavorite(favorite.word)}
              >
                remove word
              </button>
            </div>
          </div>

          <div
            className={`favorites__container ${
              favoriteInfoVisible && favorite.word === selectedWord
                ? "visible"
                : "hidden"
            }`}
          >
            <h3>PHONETICS SPELLING</h3>
            <div className="favorites__phonetics-container">
              {favorite.phonetics.length > 0 ? (
                favorite.phonetics.map((phonetic, index) => (
                  <div key={index}>
                    {phonetic.audio !== "" && (
                      <div>
                        <p className="favorites__phonetic-p">{phonetic.text}</p>
                        <audio
                          controls
                          className="display__phonetic-audio"
                          data-testid="audio"
                          src={phonetic.audio}
                          type="audio/mpeg"
                          style={{ width: "150px" }}
                        ></audio>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No audio available to listen for this word</p>
              )}
            </div>
            <hr className="favorites__phonetics-line" />
            <h3>MEANINGS</h3>
            <FavoriteWord favorite={favorite} />
          </div>
          <hr />
        </article>
      ))}
    </div>
  );
}

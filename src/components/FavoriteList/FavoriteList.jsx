import "./FavoriteList.scss";
import { FavoriteListContext } from "../FavoriteListContext/FavoriteListContext";
import { useContext, useState } from "react";

export default function FavoriteList() {
  const [favoriteInfoVisible, setFavoriteInfoVisible] = useState(false);
  const { favorites, removeFavorite } = useContext(FavoriteListContext);

  function handleRemoveFavorite(word) {
    removeFavorite(word);
  }

  function handleInfoVisibility() {
    setFavoriteInfoVisible((prevInfoVisible) => !prevInfoVisible);
  }

  return (
    <div className="favorites">
      <h1>dina favoriter</h1>
      {favorites.map((favorite, index) => (
        <article>
          <div key={index} className="favorites__word-container">
            <div className="favorites__word" onClick={handleInfoVisibility}>
              <p>{favorite.word} </p>
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
              favoriteInfoVisible ? "visible" : "hidden"
            }`}
          >
            <h3>PHONETICS SPELLING</h3>
            <div className="favorites__phonetics-container">
              {favorite.phonetics.map((phonetic, index) => (
                <div key={index}>
                  <p className="favorites__phonetic-p">{phonetic.text}</p>

                  <audio controls style={{ width: "150px" }}>
                    <source src={phonetic.audio} type="audio/mpeg" />
                  </audio>
                </div>
              ))}
            </div>
            <hr className="favorites__phonetics-line" />
            <h3>MEANINGS</h3>
            {favorite.meanings.map((meaning, index) => (
              <div key={index}>
                <p>{meaning.partOfSpeech}</p>
                <ol>
                  {meaning.definitions.map((def, index) => (
                    <li key={index}>
                      {" "}
                      {def.definition}
                      {def.example ? (
                        <p style={{ color: "hotpink" }}>
                          example: {def.example}
                        </p>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <hr />
        </article>
      ))}
    </div>
  );
}

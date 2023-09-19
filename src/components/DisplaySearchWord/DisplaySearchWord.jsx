import "./DisplaySearchWord.scss";
import starFilled from "../../assets/star-filled.png";
import starEmpty from "../../assets/star-empty.png";
import { FavoriteListContext } from "../FavoriteListContext/FavoriteListContext";
import { useContext, useState } from "react";
import { findByText } from "@testing-library/react";

//Displayar ut det sökta ordet på ett användarvänligt sätt
export default function DisplaySearchWord({
  searchWord,
  favoriteStar,
  setFavoriteStar,
}) {
  const [showAudio, setShowAudio] = useState(false);
  const { addFavorite } = useContext(FavoriteListContext);

  function favoriteWord(word) {
    //handling the favorite word by uppdating the favoriteStar state and "adding" the word to favorites if the favoriteStar is true
    const favoriteWord = word;
    console.log(favoriteWord);

    setFavoriteStar((prevFavoriteStar) => !prevFavoriteStar);
    if (!favoriteStar) {
      addFavorite(favoriteWord);
    }
  }

  function handleToggle() {
    setShowAudio((prevShowAudio) => !prevShowAudio);
  }

  return (
    <div className="display">
      {searchWord.map((word, index) => (
        <div className="display__container" key={index}>
          <img
            src={favoriteStar ? starFilled : starEmpty}
            alt=""
            onClick={() => favoriteWord(word)} //sending word-object to favoriteWord function
          />
          <div className="display__word">
            <h1>{word.word}</h1>
            <p>{word.phonetic}</p>
          </div>
          <br />
          <h3 className="display__phonetics-title" onClick={handleToggle}>
            click here for phonetics spelling
          </h3>
          <div
            className={`display__phonetics ${showAudio ? "visible" : "hidden"}`}
          >
            {word.phonetics.map((phonetic, index) => (
              <div className="display__phonetics-container" key={index}>
                <p>{phonetic.text}</p>
                <audio controls style={{ width: "150px" }}>
                  <source src={phonetic.audio} type="audio/mpeg" />
                </audio>
              </div>
            ))}
          </div>
          <hr />

          <div>
            <h3>EXEMPEL OF MEANINGS</h3>
            {word.meanings.map((meaning, index) => (
              <div className="display__meanings-container" key={index}>
                <k>{meaning.partOfSpeech}</k>
                <div>
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
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

//   if (words.length === 0) {
//     return null;
//   }

// const testWords = words.map((word, index) => ({
//   word: word.toLowerCase(),
//   index: index,
// }));

// function favoriteWord(word) {
//   const favoriteWord = word.word;

//   setFavoriteStar((prevFavoriteStar) => !prevFavoriteStar);
//   const isFavorite = !favoriteStar;
//   if (isFavorite) {
//     addFavorite(favoriteWord);
//   }
//   console.log(favoriteWord);
// }
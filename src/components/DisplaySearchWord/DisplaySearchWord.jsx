import "./DisplaySearchWord.scss";
import heartFilled from "../../assets/heart-filled.svg";
import heartEmpty from "../../assets/heart-empty.svg";
import { FavoriteListContext } from "../FavoriteListContext/FavoriteListContext";
import { useContext } from "react";
import Word from "./Word";

//Displayar ut det sökta ordet på ett användarvänligt sätt
export default function DisplaySearchWord({
  searchWord,
  favoriteStar,
  setFavoriteStar,
}) {
  const { addFavorite } = useContext(FavoriteListContext);

  //handling favorite word by uppdating the favoriteStar state and "adding" the word to favorites if the favoriteStar is true
  function handleFavoriteWord(word) {
    const favoriteWord = word;
    setFavoriteStar((prevFavoriteStar) => !prevFavoriteStar);

    if (!favoriteStar) {
      addFavorite(favoriteWord);
    }
  }

  return (
    <div className="display">
      {searchWord.map((word, index) => (
        <div className="display__container" key={index}>
          <div className="display__word">
            <img
              src={favoriteStar ? heartFilled : heartEmpty}
              alt=""
              onClick={() => handleFavoriteWord(word)} //sending word-object to favoriteWord function
            />
            <h1>{word.word}</h1>
            <p>{word.phonetic}</p>
          </div>

          <br />
          <Word word={word} key={index} />
        </div>
      ))}
    </div>
  );
}

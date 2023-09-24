import "./DisplaySearchWord.scss";
import heartFilled from "../../assets/heart-filled.svg";
import heartEmpty from "../../assets/heart-empty.svg";
import { FavoriteListContext } from "../FavoriteListProvider/FavoriteListProvider";
import { useContext } from "react";
import Word from "./Word";

//Displayar ut det sökta ordet på ett användarvänligt sätt
export default function DisplaySearchWord({ searchWord, setSearchWord }) {
  const { addFavorite } = useContext(FavoriteListContext);

  //handling favorite word by uppdating the favoriteStar state and "adding" the word to favorites
  function handleFavoriteWord(favoriteWord) {
    const newSearchWord = searchWord.map((word) => {
      if (word === favoriteWord) {
        return { ...word, favorite: !word.favorite };
      }
      return { ...word, favorite: false };
    });

    setSearchWord(newSearchWord);
    if (!favoriteWord.favorite) {
      addFavorite(favoriteWord);
    }
  }

  return (
    <div className="display">
      {searchWord.map((word, index) => (
        <div className="display__container" key={index}>
          <div className="display__word">
            <div
              className="display__heart-container"
              onClick={() => handleFavoriteWord(word)} //sending word-object to favoriteWord function
            >
              {word.favorite ? (
                <img src={heartFilled} alt="pink heart shape icon" />
              ) : (
                <img src={heartEmpty} alt="gray heart shape icon" />
              )}
            </div>

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

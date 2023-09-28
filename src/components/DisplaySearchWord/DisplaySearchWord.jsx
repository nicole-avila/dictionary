import "./DisplaySearchWord.scss";
import { useContext } from "react";
import { FavoriteListContext } from "../FavoriteListProvider/FavoriteListProvider";
import heartFilled from "../../assets/heart-filled.svg";
import heartEmpty from "../../assets/heart-empty.svg";
import Word from "./Word";

/*
Displays the searched word and handle the favorite word by updating favorite status.
The function updates favorite property of the word thats been clicked, and sets all other words to false. 
If the word is marked as a favorite it's added to the favorite list.

And FavoriteListContext is imported to this component to acceess the addFovorite function
for adding words to the favorite list
 */
export default function DisplaySearchWord({ searchWord, setSearchWord }) {
  const { addFavorite } = useContext(FavoriteListContext);

  function handleFavoriteWord(favoriteWord) {
    const updatedSearchWord = searchWord.map((word) => ({
      ...word,
      favorite: word === favoriteWord ? !word.favorite : false,
    }));

    setSearchWord(updatedSearchWord);
    !favoriteWord.favorite && addFavorite(favoriteWord);
  }

  return (
    <div className="display">
      {searchWord.map((word, index) => (
        <div className="display__container" key={index}>
          <div className="display__word">
            <div
              className="display__heart-container"
              onClick={() => handleFavoriteWord(word)}
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

import "./SearchBar.scss";
import { fetchFreeDictionary } from "../../fetch/fetchFreeDictionary";
import { useState } from "react";
import Loading from "../Loading/Loading";

/*
SearchBar use for searching for a word using
 Free Dictionary API. It contains a form with input where the 
 user can search for a word.
*/

export default function SearchBar({ setSearchWord }) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  /*
  In this function there is a message set for the user when the user has not enterd a search word.
  And sets isLoading to true when the API calls begins and false when the API call is completed. There is also set a message for the user
  from the API when a word is not founded. At last updates the value from search word and send it to setSearchWord function and rest the input filde and 
   resets the favoriteStar when submittin the form. 
  */
  async function handleSubmit(e) {
    e.preventDefault();
    if (!searchValue) {
      setMessage("Please enter a word to search");
      return;
    }
    setIsLoading(true);
    try {
      const data = await fetchFreeDictionary({ searchValue, setMessage });
      console.log(data);
      if (data.message) {
        setMessage(data.message);
      }

      setSearchWord(data);
      setSearchValue("");
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          value={searchValue}
          placeholder="search your word.."
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
      {isLoading && <Loading />}
      {message && <p className="search__message">{message}</p>}
    </div>
  );
}

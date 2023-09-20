import "./SearchBar.scss";
import { fetchFreeDictionary } from "../../fetch/fetchFreeDictionary";
import { useState } from "react";

export default function SearchBar({
  searchWord,
  setSearchWord,
  setFavoriteStar,
}) {
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!searchWord) {
      setMessage("Please enter a word to search");
      return;
    }
    try {
      const data = await fetchFreeDictionary({ searchWord, setMessage });

      if (data.message) {
        setMessage(data.message);
      } else {
        setMessage("");
      }
      setSearchWord(data);
      setFavoriteStar(false);
    } catch (error) {
      console.error("Error", error);
    }
  }
  console.log(searchWord);

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          placeholder="search your word.."
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </form>
      {message && <p className="search__message">{message}</p>}
    </div>
  );
}

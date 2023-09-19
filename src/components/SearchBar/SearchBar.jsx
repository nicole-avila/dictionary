import "./SearchBar.scss";
import { fetchFreeDictionary } from "../../fetch/fetchFreeDictionary";
import { useEffect, useRef, useState } from "react";

export default function SearchBar({
  searchWord,
  setSearchWord,
  setFavoriteStar,
}) {
  const [message, setMessage] = useState("");
  const searchRef = useRef(null);

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
      //   setMessage(data.message);
      setFavoriteStar(false);
    } catch (error) {
      console.error("Error", error);
    }
  }
  console.log(searchWord);

  //   useEffect(() => {
  //     searchRef.current.focus();
  //   }, [searchWord]);

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

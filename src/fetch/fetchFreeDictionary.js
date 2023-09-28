export async function fetchFreeDictionary({ searchValue, setMessage }) {
  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.data) {
      setMessage(data.message);
    }
    return data;
  } catch (error) {
    console.error("opps, try again", error);
    throw error;
  }
}

export async function fetchFreeDictionary({ searchWord, setMessage }) {
  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (!response.data) {
      setMessage(data.message);
    }
    return data;
  } catch (error) {
    console.error("opps, try again", error);
    throw error;
  }
}

// export async function fetchFreeDictionary({ searchWord }) {
//     try {
//       const url = `https://api.dictionaryapi.dev/api/v2/entries/en/house`;
//       const response = await fetch(url);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("opps, try again", error);
//       throw error;
//     }
//   }

import "./FavoriteList.scss";

export default function FavoriteWord({ favorite }) {
  return (
    <div className="favorites">
      <div>
        {favorite.meanings.map((meaning, index) => (
          <div key={index}>
            <p>{meaning.partOfSpeech}</p>
            <ol>
              {meaning.definitions.map((def, index) => (
                <li key={index}>
                  {" "}
                  {def.definition}
                  {def.example ? (
                    <p className="favorites__exempel">
                      <b>Example: </b>

                      {def.example}
                    </p>
                  ) : (
                    ""
                  )}
                  {def.synonyms && def.synonyms.length > 0 && (
                    <div>
                      <h4>Synonyms</h4>
                      <ul>
                        {def.synonyms.map((synonym, index) => (
                          <li key={index}>{synonym}</li>
                        ))}
                      </ul>
                    </div>
                  )}{" "}
                  {def.antonyms && def.antonyms.length > 0 && (
                    <div>
                      <h4>Antonyms</h4>
                      <ul>
                        {def.antonyms.map((antonym, index) => (
                          <li key={index}>{antonym}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

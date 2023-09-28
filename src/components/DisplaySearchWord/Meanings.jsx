import "./DisplaySearchWord.scss";

export default function Meanings({ word }) {
  return (
    <div className="display">
      {word.meanings.map((meaning, index) => (
        <div className="display__meanings-container" key={index}>
          <p>{meaning.partOfSpeech}</p>
          <div>
            <ol>
              {meaning.definitions.map((def, index) => (
                <li key={index}>
                  {" "}
                  {def.definition}
                  {def.example ? (
                    <p className="display__exempel">
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
        </div>
      ))}
    </div>
  );
}

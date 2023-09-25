import { useState } from "react";
import "./DisplaySearchWord.scss";

export default function Word({ word }) {
  const [audioVisible, setAudioVisible] = useState(false);

  function handleToggle() {
    setAudioVisible((prevShowAudio) => !prevShowAudio);
  }
  return (
    <div className="display">
      <h3 className="display__phonetics-title" onClick={handleToggle}>
        click here for phonetics spelling
      </h3>
      <div
        className={`display__phonetics ${audioVisible ? "visible" : "hidden"}`}
      >
        {word.phonetics.map((phonetic, index) => (
          <div className="display__phonetics-container" key={index}>
            <p className="display__phonetic-p">{phonetic.text}</p>
            <audio
              controls
              className="display__phonetic-audio"
              data-testid="audio"
              src={phonetic.audio}
              type="audio/mpeg"
            ></audio>
          </div>
        ))}
      </div>

      <hr className="display__line" />

      <div>
        <h3>EXEMPEL OF MEANINGS</h3>
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
                      <p style={{ color: "hotpink" }}>example: {def.example}</p>
                    ) : (
                      ""
                    )}
                    {def.synonyms && def.synonyms.length > 0 && (
                      <div>
                        <strong>Synonyms</strong>
                        <ul>
                          {def.synonyms.map((synonym, index) => (
                            <li key={index} style={{ color: "green" }}>
                              {synonym}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}{" "}
                    {def.antonyms && def.antonyms.length > 0 && (
                      <div>
                        <strong>Antonyms</strong>
                        <ul>
                          {def.antonyms.map((antonym, index) => (
                            <li key={index} style={{ color: "blue" }}>
                              {antonym}
                            </li>
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
      <hr className="display__end-line" />
    </div>
  );
}

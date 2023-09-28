import "./DisplaySearchWord.scss";
import { useState } from "react";
import Meanings from "./Meanings";

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
        {word.phonetics.length > 0 ? (
          word.phonetics.map((phonetic, index) => (
            <div className="display__phonetics-container" key={index}>
              {phonetic.audio !== "" && (
                <div>
                  <p className="display__phonetic-p">{phonetic.text}</p>
                  <audio
                    controls
                    className="display__phonetic-audio"
                    data-testid="audio"
                    src={phonetic.audio}
                    type="audio/mpeg"
                  ></audio>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No video available to listen for this word</p>
        )}
      </div>
      <hr className="display__line" />
      <h3>EXEMPEL OF MEANINGS</h3>
      <div>
        <Meanings word={word} />
      </div>
      <hr className="display__end-line" />
    </div>
  );
}

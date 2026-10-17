import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const cards = [
  { text: 'Suggest beautiful places to see on an upcoming road trip', icon: assets.compass_icon },
  { text: 'Briefly summarize this concept: urban planning', icon: assets.bulb_icon },
  { text: 'Brainstorm team bonding activities for our work retreat', icon: assets.message_icon },
  { text: 'Improve the readability of the following code', icon: assets.code_icon },
]

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, error, input, setInput } =
    useContext(Context)

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {cards.map((c) => (
                <div className="card" key={c.text} onClick={() => onSent(c.text)}>
                  <p>{c.text}</p>
                  <img src={c.icon} alt="" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : error ? (
                <p className="result-error">{error}</p>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSent()}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input && <img onClick={() => onSent()} src={assets.send_icon} alt="" />}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main

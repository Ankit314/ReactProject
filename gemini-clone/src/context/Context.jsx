import { createContext, useState } from 'react'
import { runChat } from '../config/gemini'

export const Context = createContext()

function formatResponse(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .split('\n')
    .join('<br/>')
}

const ContextProvider = (props) => {
  const [input, setInput] = useState('')
  const [recentPrompt, setRecentPrompt] = useState('')
  const [prevPrompts, setPrevPrompts] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultData, setResultData] = useState('')
  const [error, setError] = useState('')

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
    setResultData('')
    setError('')
  }

  const onSent = async (prompt) => {
    const finalPrompt = prompt ?? input
    if (!finalPrompt.trim()) return

    setResultData('')
    setError('')
    setLoading(true)
    setShowResult(true)
    setRecentPrompt(finalPrompt)
    if (!prompt) setPrevPrompts((prev) => [...prev, finalPrompt])

    try {
      const text = await runChat(finalPrompt)
      setResultData(formatResponse(text))
    } catch (err) {
      setError(err.message || 'Something went wrong talking to Gemini.')
    } finally {
      setLoading(false)
      setInput('')
    }
  }

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    error,
    input,
    setInput,
    newChat,
  }

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>
}

export default ContextProvider

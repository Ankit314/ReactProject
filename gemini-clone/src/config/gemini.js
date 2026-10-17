import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null
const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' })

export async function runChat(prompt) {
  if (!model) {
    throw new Error(
      'No Gemini API key configured. Add VITE_GEMINI_API_KEY to a .env file (see .env.example).'
    )
  }
  const result = await model.generateContent(prompt)
  return result.response.text()
}

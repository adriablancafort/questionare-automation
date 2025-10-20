import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import "dotenv/config"

const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: "What is love?"
})

console.log(text)

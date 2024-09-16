const { OpenAI } = require("openai");
// const { z } = require("zod");
// const { zodResponseFormat } = require("openai/helpers/zod");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const schema = {
  type: "object",
  properties: {
    sanitized: { type: "boolean" },
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: {
            type: "array",
            items: { type: "string" },
          },
          correctOption: { type: "integer" },
        },
        required: ["question", "options", "correctOption"],
        additionalProperties: false,
      },
    },
  },
  required: ["sanitized", "questions"],
  additionalProperties: false,
};
export default async function generateQuiz(topicName, numQuestions) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [
        { role: "system", content: "You are a quiz generation assistant." },
        {
          role: "user",
          content: `Please analyze the following topic name: "${topicName}".
    First, check if the topic is nonsensical, contains sexual content, violence, or self-harm. 
    If any of these issues are present, return a JSON object like this:
    { "sanitized": true, "questions": [] }.If the topic is appropriate, generate ${Math.min(
      numQuestions,
      10
    )} multiple-choice quiz questions. 
    Each question should have a "question", 4 "options", and one "correctOption" which is index of the option.`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "quiz_response",
          schema,
          strict: true,
        },
      },
    });

    const quiz_response = response.choices[0].message.content;
    return quiz_response;
  } catch (e) {
    console.error("Error: ", e.message);
    return e.message;
  }
}

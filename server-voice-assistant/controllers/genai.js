import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

export const geminiAi = async (req, res) => {
  const { content, data } = req.body;

  const systemInstruction = `
  You are a friendly and knowledgeable culinary assistant. 
  IMPORTANT: ALWAYS RESPOND IN VALID JSON FORMAT.

  For recipe requests, use this exact structure:
  {
    "type": "recipe",
    "name": "Recipe Name",
    "difficulty": "Easy|Medium|Hard",
    "prepTime": "e.g., 15 minutes",
    "cookTime": "e.g., 30 minutes",
    "servings": "e.g., 4 servings",
    "ingredients": ["item 1", "item 2"],
    "instructions": ["step 1", "step 2"],
    "tips": ["tip 1", "tip 2"]   // optional
  }

  For non-recipe responses (general questions), use this structure:
  {
    "type": "answer",
    "answer": "Your detailed answer here."
  }

  RULES:
  1. Use exact field names shown above
  2. Always double-quote strings and property names
  3. Never include markdown or backticks in responses
  4. If unsure about a recipe, respond with type "answer"
  5. For lists, use string arrays only
  6. Maintain a positive and encouraging tone
  7. If you can't answer, return: {"type": "error", "message": "Sorry..."}
  `;

  if (typeof content !== "string" || !Array.isArray(data)) {
    return res.status(400).json({
      message:
        "Invalid request: `content` (string) and `data` (array) are required.",
    });
  }

  for (const item of data) {
    if (
      typeof item.userContent !== "string" ||
      (item.responseContent !== undefined &&
        typeof item.responseContent !== "string")
    ) {
      return res.status(400).json({
        message:
          "Invalid history format: items must have string `userContent` and optional string `responseContent`.",
      });
    }
  }

  const history = data.flatMap((item) => {
    const historyEntry = [
      {
        role: "user",
        parts: [{ text: String(item.userContent) }],
      },
    ];

    if (item.responseContent !== undefined && item.responseContent !== null) {
      historyEntry.push({
        role: "model",
        parts: [{ text: String(item.responseContent) }],
      });
    }

    return historyEntry;
  });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const chat = model.startChat({
      history,
      systemInstruction: {
        role: "system",
        parts: [{ text: systemInstruction }],
      },
    });

    const result = await chat.sendMessage(content);
    const responseText = result.response.text();

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (firstError) {
      try {
        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch) {
          parsedResponse = JSON.parse(jsonMatch[1]);
        } else {
          const braceMatch = responseText.match(/\{[\s\S]*\}/);
          if (braceMatch) {
            parsedResponse = JSON.parse(braceMatch[0]);
          } else {
            throw new Error("No JSON found in response");
          }
        }
      } catch (secondError) {
        console.error("Failed to parse response:", responseText);

        parsedResponse = {
          type: "answer",
          answer: responseText,
        };
      }
    }
    if (
      !parsedResponse.type ||
      !["recipe", "answer", "error"].includes(parsedResponse.type)
    ) {
      parsedResponse = {
        type: "answer",
        answer: responseText,
      };
    }

    return res.status(200).json({
      message: parsedResponse,
    });
  } catch (error) {
    console.error("Error interacting with Gemini API:", error);

    let errorMessage =
      "An unexpected error occurred while processing your request.";
    if (error.message.includes("API_KEY_INVALID")) {
      errorMessage = "Invalid API configuration. Please contact support.";
    } else if (error.message.includes("SAFETY")) {
      errorMessage =
        "The request was blocked for safety reasons. Please try a different query.";
    }

    res.status(500).json({
      message: errorMessage,
    });
  }
};

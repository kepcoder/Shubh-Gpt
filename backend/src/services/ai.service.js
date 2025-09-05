
const { GoogleGenAI }  = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateAiResponse(prompt) {

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text
}

const generateVector = async (text)=>{
   const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: text,
        config:{
          outputDimensionality: 768,
        }
    });

    return response.embeddings[0].values
}

module.exports = {
  generateAiResponse,
  generateVector
};
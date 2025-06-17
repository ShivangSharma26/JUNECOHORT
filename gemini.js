// ai/gemini.js
const axios = require('axios');

async function generatePrescription(promptText) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: promptText }] }]
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return "Error generating prescription.";
  }
}

module.exports = generatePrescription;

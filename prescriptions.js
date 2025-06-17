const express = require('express');
const router = express.Router();
const db = require('../firebase/config');
const generatePrescription = require('../api/gemini');

router.post('/', async (req, res) => {
  const { disease, symptoms } = req.body;

  try {
    // 1️⃣ Check if disease has already been learned
    const doc = await db.collection('learned_prescriptions').doc(disease.toLowerCase()).get();
    if (doc.exists) {
      return res.json({
        source: "learned",
        prescription: doc.data().medicines
      });
    }

    // 2️⃣ Build prompt for Gemini
    const prompt = `Suggest a medicine list for:
    Disease: ${disease}
    Symptoms: ${symptoms.join(', ')}
    Return only the medicine list in bullet format.`;

    const aiResponse = await generatePrescription(prompt);

    return res.json({
      source: "ai",
      prescription: aiResponse
    });

  } catch (error) {
    console.error("Error in prescription route:", error);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../firebase/config');

router.post('/', async (req, res) => {
  const { disease, finalPrescription, doctorId } = req.body;

  if (!disease || !finalPrescription || !doctorId) {
    return res.status(400).send("Missing required fields.");
  }

  try {
    await db.collection('learned_prescriptions').doc(disease.toLowerCase()).set({
      medicines: finalPrescription,
      doctorId,
      updatedAt: new Date()
    });

    res.send("✅ Final prescription saved successfully.");
  } catch (err) {
    console.error("Error saving learning:", err);
    res.status(500).send("Error saving final prescription.");
  }
});

module.exports = router;

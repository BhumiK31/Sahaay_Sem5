const express = require("express");
const router = express.Router();
const Payment = require("../models/payment");

// POST /api/payments/process
router.post("/process", async (req, res) => {
  try {
    const { bookingId, userId, amount, paymentMethod, paymentDetails } = req.body;

    // Basic validation
    if (!bookingId || !userId || !amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Create a new payment record
    const payment = new Payment({
      bookingId,
      userId,
      amount,
      paymentMethod,
      paymentDetails,
      status: "completed", // assume success for now
    });

    await payment.save();

    res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      payment,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({
      success: false,
      message: "Error processing payment",
      error: error.message,
    });
  }
});

module.exports = router;

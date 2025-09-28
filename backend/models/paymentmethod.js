db.paymentMethods.insertMany([
  {
    _id: ObjectId(),
    userId: ObjectId("user_id_reference"),
    type: "credit_card", // "credit_card", "bank_account", "paypal"
    isDefault: true,
    last4: "1234",
    brand: "visa",
    expiryMonth: 12,
    expiryYear: 2025,
    stripePaymentMethodId: "pm_external_id",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
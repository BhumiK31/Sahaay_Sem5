db.backgroundChecks.insertMany([
  {
    _id: ObjectId(),
    caregiverId: ObjectId("caregiver_id_reference"),
    provider: "Checkr",
    requestId: "external_check_id_123",
    status: "completed", // "pending", "completed", "failed", "expired"
    result: "clear", // "clear", "consider", "suspended"
    completedAt: new Date("2023-01-15"),
    expiresAt: new Date("2024-01-15"),
    report: {
      criminalHistory: "clear",
      sexOffenderRegistry: "clear", 
      globalWatchlist: "clear",
      creditHistory: "not_requested"
    },
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-15")
  }
]);
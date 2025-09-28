db.savedItems.insertMany([
  {
    _id: ObjectId(),
    userId: ObjectId("user_id_reference"),
    itemType: "job", // "job" or "caregiver"
    itemId: ObjectId("job_or_caregiver_id_reference"),
    notes: "Good fit for our family schedule",
    createdAt: new Date()
  }
]);
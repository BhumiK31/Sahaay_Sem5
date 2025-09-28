db.reviews.insertMany([
  {
    _id: ObjectId(),
    reviewerId: ObjectId("client_id_reference"), // Who wrote the review
    revieweeId: ObjectId("caregiver_id_reference"), // Who is being reviewed
    reviewerType: "client", // "client" or "caregiver" 
    jobId: ObjectId("job_id_reference"),
    applicationId: ObjectId("application_id_reference"),
    rating: {
      overall: 5,
      reliability: 5,
      communication: 4,
      quality: 5,
      safety: 5
    },
    title: "Excellent caregiver!",
    comment: "Sarah was amazing with our kids. Very reliable and the children loved her.",
    isVerified: true, // Only verified if actual employment occurred
    helpfulVotes: 3,
    reportedCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

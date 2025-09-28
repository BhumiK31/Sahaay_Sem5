db.applications.insertMany([
  {
    _id: ObjectId(),
    jobId: ObjectId("job_id_reference"),
    caregiverId: ObjectId("caregiver_id_reference"),
    clientId: ObjectId("client_id_reference"),
    status: "pending", // "pending", "under_review", "interview_scheduled", "accepted", "rejected", "withdrawn"
    coverLetter: "I would love to help care for your children. I have extensive experience with school-age kids and can help with homework and activities.",
    proposedRate: {
      amount: 22,
      currency: "USD",
      type: "hourly"
    },
    availability: {
      canStartDate: new Date("2024-02-01"),
      schedule: ["Monday", "Wednesday", "Friday"],
      isFlexible: true
    },
    timeline: [
      {
        status: "pending",
        timestamp: new Date(),
        note: "Application submitted"
      }
    ],
    interview: {
      isScheduled: false,
      scheduledDate: null,
      interviewType: null, // "phone", "video", "in_person"
      notes: ""
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
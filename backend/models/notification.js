db.notifications.insertMany([
  {
    _id: ObjectId(),
    userId: ObjectId("user_id_reference"),
    type: "application_received", // "application_received", "message_received", "interview_scheduled", etc.
    title: "New Application Received",
    message: "Sarah Anderson has applied to your babysitting job",
    data: {
      jobId: ObjectId("job_id_reference"),
      applicationId: ObjectId("application_id_reference"),
      caregiverId: ObjectId("caregiver_id_reference")
    },
    isRead: false,
    readAt: null,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  }
]);
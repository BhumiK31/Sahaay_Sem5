db.messages.insertMany([
  {
    _id: ObjectId(),
    conversationId: ObjectId(), // Groups messages in a conversation
    senderId: ObjectId("user_id_reference"),
    receiverId: ObjectId("user_id_reference"), 
    senderType: "caregiver", // "caregiver" or "client"
    relatedJobId: ObjectId("job_id_reference"),
    relatedApplicationId: ObjectId("application_id_reference"),
    content: "Hi! Thank you for posting the babysitting position. I'm very interested in caring for your children.",
    messageType: "text", // "text", "image", "document", "system"
    attachments: [],
    isRead: false,
    readAt: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
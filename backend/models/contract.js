db.contracts.insertMany([
  {
    _id: ObjectId(),
    clientId: ObjectId("client_id_reference"),
    caregiverId: ObjectId("caregiver_id_reference"),
    jobId: ObjectId("job_id_reference"),
    applicationId: ObjectId("application_id_reference"),
    status: "active", // "draft", "pending_signature", "active", "completed", "terminated"
    terms: {
      startDate: new Date("2024-02-01"),
      endDate: null, // ongoing
      schedule: {
        days: ["Monday", "Wednesday", "Friday"],
        startTime: "15:00",
        endTime: "19:00",
        timezone: "America/New_York"
      },
      compensation: {
        hourlyRate: 22,
        currency: "USD",
        paymentFrequency: "weekly"
      },
      responsibilities: [
        "Child supervision and safety",
        "Homework assistance", 
        "Light meal preparation",
        "Transportation to activities"
      ],
      policies: {
        cancellationNotice: "24_hours",
        sickDayPolicy: "unpaid",
        holidayPolicy: "discussed_separately"
      }
    },
    signatures: {
      client: {
        signedAt: new Date(),
        signature: "client_signature_data",
        ipAddress: "192.168.1.1"
      },
      caregiver: {
        signedAt: new Date(),
        signature: "caregiver_signature_data", 
        ipAddress: "192.168.1.2"
      }
    },
    documents: [
      {
        type: "contract",
        url: "https://storage.example.com/contracts/contract_123.pdf",
        uploadedAt: new Date()
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

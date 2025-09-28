db.jobs.insertMany([
  {
    _id: ObjectId(),
    clientId: ObjectId("client_id_reference"),
    title: "Part-time Babysitter for 2 Kids",
    description: "Looking for a reliable babysitter for our 5 and 7-year-old. Experience with school-age children preferred.",
    serviceType: "babysitting",
    location: {
      address: "Brooklyn, NY",
      coordinates: {
        lat: 40.6728,
        lng: -73.9786
      },
      radius: 10 // miles
    },
    schedule: {
      type: "recurring", // "one_time", "recurring"
      days: ["Monday", "Wednesday", "Friday"],
      startTime: "15:00",
      endTime: "19:00",
      timezone: "America/New_York",
      startDate: new Date("2024-02-01"),
      endDate: null // ongoing
    },
    compensation: {
      type: "hourly", // "hourly", "daily", "weekly", "monthly"
      rate: {
        min: 20,
        max: 25,
        currency: "USD"
      },
      paymentFrequency: "weekly" // "daily", "weekly", "monthly"
    },
    requirements: [
      "CPR Certified",
      "Background Check",
      "References Required",
      "Own Transportation",
      "Non-Smoker"
    ],
    children: [
      {
        age: 7,
        gender: "female",
        needs: ["homework_help", "after_school_activities"]
      },
      {
        age: 5,
        gender: "male", 
        needs: ["general_care", "outdoor_play"]
      }
    ],
    status: "active", // "draft", "active", "paused", "filled", "cancelled", "expired"
    urgency: false,
    views: 47,
    applicants: [], // Array of caregiver IDs who applied
    createdAt: new Date(),
    updatedAt: new Date(),
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  }
]);
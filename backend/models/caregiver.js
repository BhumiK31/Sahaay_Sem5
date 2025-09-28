db.caregivers.insertMany([
  {
    _id: ObjectId(),
    userId: ObjectId("user_id_reference"),
    personalInfo: {
      firstName: "Sarah",
      lastName: "Anderson",
      title: "Professional Caregiver",
      bio: "Experienced caregiver with a passion for helping families. I have worked with children of all ages and elderly clients.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b372",
      dateOfBirth: new Date("1990-05-15"),
      phone: "(555) 123-4567",
      address: {
        street: "123 Main St",
        city: "Brooklyn",
        state: "NY",
        zipCode: "11201",
        coordinates: {
          lat: 40.6892,
          lng: -74.0445
        }
      }
    },
    experience: {
      yearsOfExperience: 5,
      specialties: ["Childcare", "Elderly Care", "CPR Certified"],
      previousJobs: [
        {
          employer: "Smith Family",
          position: "Live-in Nanny",
          startDate: new Date("2020-01-01"),
          endDate: new Date("2022-12-31"),
          description: "Full-time care for two children ages 3-5"
        }
      ]
    },
    certifications: [
      {
        name: "CPR Certification",
        issuer: "American Red Cross",
        issueDate: new Date("2023-06-15"),
        expirationDate: new Date("2025-06-15"),
        certificateUrl: "https://example.com/cert.pdf"
      },
      {
        name: "First Aid Certification", 
        issuer: "American Red Cross",
        issueDate: new Date("2023-06-15"),
        expirationDate: new Date("2025-06-15"),
        certificateUrl: "https://example.com/cert2.pdf"
      }
    ],
    availability: {
      schedule: ["Monday", "Wednesday", "Friday"],
      startTime: "15:00",
      endTime: "19:00",
      timezone: "America/New_York",
      isFlexible: true,
      unavailableDates: [
        {
          startDate: new Date("2024-02-15"),
          endDate: new Date("2024-02-20"),
          reason: "Personal vacation"
        }
      ]
    },
    rates: {
      hourlyRate: {
        min: 18,
        max: 25,
        currency: "USD"
      },
      liveInRate: {
        monthly: 3500,
        currency: "USD"
      }
    },
    verification: {
      backgroundCheck: {
        isCompleted: true,
        completedDate: new Date("2023-01-15"),
        provider: "Checkr",
        status: "Clear"
      },
      identityVerified: true,
      phoneVerified: true,
      emailVerified: true,
      referencesVerified: true
    },
    reviews: {
      averageRating: 4.9,
      totalReviews: 27,
      ratings: {
        reliability: 4.8,
        communication: 5.0,
        childcare: 4.9,
        safety: 5.0
      }
    },
    preferences: {
      serviceTypes: ["babysitting", "elderly_care"],
      ageGroups: ["infants", "toddlers", "school_age"],
      maxChildren: 3,
      petFriendly: true,
      smokingPolicy: "non_smoker",
      hasOwnTransportation: true,
      languages: ["English", "Spanish"]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

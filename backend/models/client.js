db.clients.insertMany([
  {
    _id: ObjectId(),
    userId: ObjectId("user_id_reference"),
    familyInfo: {
      familyName: "The Johnson Family",
      primaryContactName: "Michael Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      phone: "(555) 987-6543",
      address: {
        street: "456 Oak Ave",
        city: "Brooklyn", 
        state: "NY",
        zipCode: "11215",
        coordinates: {
          lat: 40.6728,
          lng: -73.9786
        }
      }
    },
    familyMembers: [
      {
        name: "Emma",
        age: 7,
        relation: "Daughter",
        needs: ["homework_help", "after_school_care"],
        allergies: [],
        medications: [],
        emergencyContact: {
          name: "Sarah Johnson",
          phone: "(555) 987-6544",
          relation: "Mother"
        }
      },
      {
        name: "Oliver",
        age: 5,
        relation: "Son", 
        needs: ["general_care", "playtime"],
        allergies: ["peanuts"],
        medications: [],
        emergencyContact: {
          name: "Sarah Johnson",
          phone: "(555) 987-6544",
          relation: "Mother"
        }
      }
    ],
    careNeeds: {
      serviceType: "babysitting",
      careSettings: ["home"],
      schedule: {
        regularSchedule: [
          {
            day: "Monday",
            startTime: "15:00",
            endTime: "19:00"
          },
          {
            day: "Wednesday", 
            startTime: "15:00",
            endTime: "19:00"
          },
          {
            day: "Friday",
            startTime: "15:00", 
            endTime: "19:00"
          }
        ],
        timezone: "America/New_York",
        isFlexible: true
      }
    },
    preferences: [
      "Non-Smoker",
      "Background Check Required", 
      "References Required",
      "CPR Certified Preferred",
      "Own Transportation"
    ],
    emergencyContacts: [
      {
        name: "Sarah Johnson",
        relation: "Mother",
        phone: "(555) 987-6544",
        isPrimary: true
      },
      {
        name: "Robert Johnson", 
        relation: "Father",
        phone: "(555) 987-6545",
        isPrimary: false
      }
    ],
    verification: {
      identityVerified: true,
      phoneVerified: true,
      emailVerified: true,
      backgroundCheckConsent: true
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "userType": 1 });
db.users.createIndex({ "isActive": 1 });

db.caregivers.createIndex({ "userId": 1 }, { unique: true });
db.caregivers.createIndex({ "personalInfo.address.coordinates": "2dsphere" });
db.caregivers.createIndex({ "experience.specialties": 1 });
db.caregivers.createIndex({ "rates.hourlyRate.min": 1, "rates.hourlyRate.max": 1 });
db.caregivers.createIndex({ "verification.backgroundCheck.status": 1 });

db.clients.createIndex({ "userId": 1 }, { unique: true });
db.clients.createIndex({ "familyInfo.address.coordinates": "2dsphere" });

db.jobs.createIndex({ "clientId": 1 });
db.jobs.createIndex({ "status": 1 });
db.jobs.createIndex({ "serviceType": 1 });
db.jobs.createIndex({ "location.coordinates": "2dsphere" });
db.jobs.createIndex({ "createdAt": -1 });
db.jobs.createIndex({ "expirationDate": 1 });

db.applications.createIndex({ "jobId": 1 });
db.applications.createIndex({ "caregiverId": 1 });
db.applications.createIndex({ "clientId": 1 });
db.applications.createIndex({ "status": 1 });
db.applications.createIndex({ "createdAt": -1 });

db.messages.createIndex({ "conversationId": 1 });
db.messages.createIndex({ "senderId": 1, "receiverId": 1 });
db.messages.createIndex({ "createdAt": -1 });
db.messages.createIndex({ "isRead": 1 });

db.reviews.createIndex({ "revieweeId": 1 });
db.reviews.createIndex({ "reviewerId": 1 });
db.reviews.createIndex({ "jobId": 1 });

db.notifications.createIndex({ "userId": 1 });
db.notifications.createIndex({ "isRead": 1 });
db.notifications.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });

db.backgroundChecks.createIndex({ "caregiverId": 1 });
db.backgroundChecks.createIndex({ "status": 1 });
db.backgroundChecks.createIndex({ "expiresAt": 1 });

db.savedItems.createIndex({ "userId": 1 });
db.savedItems.createIndex({ "itemType": 1, "itemId": 1 });

db.paymentMethods.createIndex({ "userId": 1 });

db.contracts.createIndex({ "clientId": 1 });
db.contracts.createIndex({ "caregiverId": 1 });
db.contracts.createIndex({ "status": 1 });
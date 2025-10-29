import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Calendar,
  ClipboardList,
  User,
  CheckCircle2,
} from "lucide-react";

// MOCK DATA – keep this at the top!
const caregivers = [
  {
    id: 1,
    name: "Ananya Sharma",
    initials: "AS",
    rating: 4.9,
    experience: "8 years",
    skills: ["Elderly Care", "Mobility Assistance"],
    location: "Mumbai, Maharashtra",
    rate: "₹15,000/month",
    about:
      "Dedicated professional with passion for elder care. Friendly and highly recommended!",
    phone: "+91 99876 54321",
    email: "ananya.sharma@caremail.com",
    availability: "Available Now",
    verified: true,
    documents: [
      { name: "ID Proof.pdf", verified: true },
      { name: "Certification.pdf", verified: true },
    ],
    reviews: [
      {
        reviewer: "Sharma Family",
        text: "Excellent support, very patient and dedicated.",
        date: "Dec 2024",
        rating: 5,
      },
      {
        reviewer: "Kumar Family",
        text: "Truly caring and professional approach. Highly recommended!",
        date: "Nov 2024",
        rating: 4.8,
      },
    ],
    pastAssignments: [
      {
        family: "Kumar Family",
        duration: "4 months",
        type: "Elderly Care",
        city: "Delhi NCR",
      },
      {
        family: "Rao Family",
        duration: "6 months",
        type: "Mobility Support",
        city: "Mumbai",
      },
    ],
  },
  // Add more caregivers as needed
];

const CaregiverProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caregiver, setCaregiver] = useState<any>(null);

  useEffect(() => {
    setCaregiver(caregivers.find((c) => c.id === Number(id)));
  }, [id]);

  if (!caregiver) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-2">Caregiver Not Found</h1>
        <Button variant="link" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-3xl font-semibold">Caregiver Profile</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Reviews Sidebar */}
          <div className="md:col-span-1 xl:col-span-1 order-2 md:order-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {caregiver.reviews.map((review, i) => (
                    <div key={i} className="bg-secondary p-3 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold text-sm">{review.reviewer}</span>
                        <span className="ml-auto flex items-center text-primary font-semibold text-xs">
                          <Star className="w-3 h-3 mr-1 fill-primary" />
                          {review.rating}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground italic mb-1">{review.text}</div>
                      <div className="text-xs text-muted-foreground">{review.date}</div>
                    </div>
                  ))}
                  {caregiver.reviews.length === 0 && (
                    <p className="text-muted-foreground text-xs">No reviews yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Main Profile */}
          <div className="md:col-span-2 xl:col-span-2 order-1 md:order-2">
            <Card>
              <CardHeader className="flex flex-col items-center pb-2">
                <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-5xl font-bold relative mb-2">
                  {caregiver.initials}
                  {caregiver.verified && (
                    <CheckCircle2 className="w-6 h-6 text-success absolute bottom-1 right-1 bg-background rounded-full" />
                  )}
                </div>
                <h2 className="font-bold text-2xl text-center">{caregiver.name}</h2>
                <div className="flex items-center gap-1 mt-1 text-center justify-center">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                  <span className="font-semibold">{caregiver.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({caregiver.experience} experience)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {caregiver.skills.map((s, i) => (
                    <Badge key={i} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                  <Badge variant="outline">{caregiver.availability}</Badge>
                </div>
                <div className="my-2 text-primary font-bold text-xl">
                  {caregiver.rate}
                </div>
                <div className="flex items-center justify-center gap-1 text-md mb-1">
                  <MapPin className="w-5 h-5" /> {caregiver.location}
                </div>
                <p className="text-muted-foreground text-center max-w-prose">{caregiver.about}</p>
              </CardHeader>
              <CardContent>
                <Separator className="my-3" />
                <div className="grid grid-cols-2 gap-4 text-base">
                  <div>
                    <div className="flex items-center gap-1 mb-1 font-medium">
                      <Phone className="w-5 h-5" />
                      Phone
                    </div>
                    <div className="text-muted-foreground">{caregiver.phone}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1 font-medium">
                      <User className="w-5 h-5" />
                      Email
                    </div>
                    <div className="text-muted-foreground">{caregiver.email}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Side Section: Care History and Documents */}
          <div className="md:col-span-1 xl:col-span-1 order-3 flex flex-col gap-8">
            {/* Care History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  Care History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {caregiver.pastAssignments.map((p, i) => (
                    <div
                      key={i}
                      className="flex flex-wrap items-center gap-2 text-sm bg-secondary rounded p-2"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{p.family}</span>
                      <span className="text-xs text-muted-foreground">{p.duration}</span>
                      <Badge variant="outline">{p.type}</Badge>
                      <MapPin className="w-3 h-3" />
                      <span>{p.city}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Documents & Certification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {caregiver.documents.map((doc, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-4 h-4">📄</span>
                      <span>{doc.name}</span>
                      {doc.verified && (
                        <Badge className="bg-green-50 text-green-700 text-xs ml-2">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverProfile;

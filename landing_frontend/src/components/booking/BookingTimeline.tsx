import { Card } from "@/components/ui/card";

export const BookingTimeline = () => {
  const timelineItems = [
    {
      title: "Booking Confirmed",
      date: "Dec 20, 2024",
      completed: true,
    },
    {
      title: "Caregiver Assigned",
      date: "Dec 20, 2024",
      completed: true,
    },
    {
      title: "Service In Progress",
      date: "Now",
      completed: false,
      current: true,
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Booking Timeline</h2>

      <div className="space-y-4">
        {timelineItems.map((item, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full ${
                  item.completed
                    ? "bg-[hsl(var(--success))]"
                    : item.current
                    ? "bg-[hsl(var(--warning))]"
                    : "bg-muted"
                }`}
              />
              {index < timelineItems.length - 1 && (
                <div className="w-0.5 h-8 bg-border mt-1" />
              )}
            </div>
            <div className="flex-1 pb-2">
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

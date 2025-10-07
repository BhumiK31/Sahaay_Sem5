import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  description: string;
}

const StatCard = ({ icon: Icon, title, value, description }: StatCardProps) => {
  return (
    <div className="bg-card p-4 rounded-xl card-shadow card-lift">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;

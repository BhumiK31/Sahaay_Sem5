import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, MessageCircle } from 'lucide-react';

const ScheduleInterview = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulated backend submit
    setTimeout(() => {
      setLoading(false);
      alert('Interview request sent!');
      navigate(-1); // or navigate to a success/summary page
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <CardTitle className="text-xl ml-2">Schedule Interview</CardTitle>
            </div>
            <p className="text-muted-foreground text-sm ml-12">Booking ID: #{bookingId}</p>
          </CardHeader>
          <Separator />
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-4 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Interview Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2 text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2 text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Notes for Caregiver (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  className="w-full border rounded px-3 py-2 text-base"
                  placeholder="Add any questions or info for the caregiver"
                />
              </div>
              <Separator />
              <Button
                type="submit"
                className="w-full bg-primary text-white"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Interview Request'}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleInterview;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Job {
  id: string;
  family: string;
  location: string;
  postedDate: string; // ISO string
  rate: string;
  description: string;
  type: string;
}

const CATEGORY_OPTIONS = ['All Categories', 'Elderly Care', 'Child Care', 'Medical Care'];
const LOCATION_OPTIONS = ['All Locations', 'Mumbai', 'Delhi', 'Bangalore'];

const FindJobs = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/jobs/caregiver/find-jobs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        // Transform API response to fit Job[]
        const jobsList: Job[] = (data.jobs || []).map((job: any) => ({
          id: job.id || job._id,
          family: job.family || job.creator?.name || 'Unknown Family',
          location: job.location,
          postedDate: job.postedAt,
          rate: job.rate,
          description: job.description,
          type: job.type || job.schedule || 'Unknown'
        }));
        setJobs(jobsList);
      } catch (err) {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filter with search, category, and location
  const filtered = jobs.filter((j) => {
    const matchesSearch =
      j.family.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' || j.type === selectedCategory;
    const matchesLocation =
      selectedLocation === 'All Locations' || j.location.includes(selectedLocation);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleView = (id: string) => navigate(`/caregiver/job/${id}`);
  const handleApply = (id: string) => navigate(`/caregiver/apply/${id}`);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Jobs</h1>
          <p className="text-muted-foreground">
            Discover caregiving opportunities that match your skills
          </p>
        </div>

        {/* search box */}
        <div className="bg-card rounded-xl p-6 card-shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search recent jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 rounded-lg"
              />
            </div>
            <select
              className="h-11 px-4 rounded-lg border bg-background"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              {CATEGORY_OPTIONS.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            <select
              className="h-11 px-4 rounded-lg border bg-background"
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
            >
              {LOCATION_OPTIONS.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* job cards */}
        <div className="space-y-4">
          {loading && <p>Loading...</p>}
          {!loading &&
            filtered.map((job) => (
              <div key={job.id} className="bg-card rounded-xl p-6 card-shadow card-lift">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{job.family}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span>•</span>
                          <span>{job.postedDate?.split('T')[0]}</span>
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {job.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-foreground mb-4 line-clamp-2">{job.description}</p>

                    <div className="flex items-center gap-2 text-lg font-bold text-primary">
                      <DollarSign className="w-5 h-5" />
                      {job.rate}
                    </div>
                  </div>
                  <div className="flex lg:flex-col gap-2 lg:min-w-[140px]">
                    <Button
                      variant="outline"
                      className="flex-1 lg:flex-none rounded-lg"
                      onClick={() => handleView(job.id)}
                    >
                      View Details
                    </Button>
                    <Button
                      className="flex-1 lg:flex-none rounded-lg"
                      onClick={() => handleApply(job.id)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          {!loading && filtered.length === 0 &&
            <p className="text-center text-muted-foreground">No jobs found.</p>
          }
        </div>
      </div>
    </div>
  );
};

export default FindJobs;

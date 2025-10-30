import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Working Mother',
      avatar: 'https://tse2.mm.bing.net/th/id/OIP.tTsAe0QaR5t2w2iaAoTQNgHaFE?pid=Api&P=0&h=180', 
      rating: 5,
      quote:
        'Sahaay saved my sanity! Found a wonderful babysitter for my daughter in just 20 minutes. The verification process gave me complete peace of mind.',
      location: 'Mumbai',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Caring Son',
      avatar: 'https://tse1.mm.bing.net/th/id/OIP.VKwOQ7TD4NyD88vE3L8sMwHaIi?pid=Api&P=0&h=180',
      rating: 4,
      quote:
        'My elderly father loves his companion helper from Sahaay. She helps with daily tasks and provides such wonderful company. Highly recommend!',
      location: 'Delhi',
    },
    {
      name: 'Arjun Patel',
      role: 'Student Helper',
      avatar: 'https://tse4.mm.bing.net/th/id/OIP.Rd2RdhXENUmh0ayyqFNdUAHaE8?pid=Api&P=0&h=180',
      rating: 5,
      quote:
        'As a college student, Sahaay helps me earn money by tutoring kids in my neighborhood. Flexible hours and fair pay — perfect for students!',
      location: 'Pune',
    },
  ];

  return (
    <section className="py-16 bg-[#f9fbfe]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-poppins font-bold text-foreground mb-3">
            What Our Community Says
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Real stories from families and helpers who've found success with Sahaay.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-[#4e96df40] rounded-xl p-6 text-center 
              shadow-sm hover:shadow-[0_6px_18px_rgba(78,150,223,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#4e96df40]"
                />
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xs text-muted-foreground italic leading-relaxed mb-3">
                “{testimonial.quote}”
              </blockquote>

              {/* Author Info */}
              <div className="space-y-0.5">
                <p className="font-poppins font-semibold text-sm text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-[12px] text-muted-foreground">
                  {testimonial.role} • {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white border border-[#4e96df40] rounded-xl px-6 py-3 shadow-sm">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-[#4e96df]">
              4.8 Average Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

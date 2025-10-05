import { Star } from 'lucide-react';
const Testimonials = () => {
  const testimonials = [{
    name: 'Priya Sharma',
    role: 'Working Mother',
    avatar: '👩‍💼',
    rating: 5,
    quote: 'Sahaay saved my sanity! Found a wonderful babysitter for my daughter in just 20 minutes. The verification process gave me complete peace of mind.',
    location: 'Mumbai'
  }, {
    name: 'Rajesh Kumar',
    role: 'Caring Son',
    avatar: '👨‍🦳',
    rating: 5,
    quote: 'My elderly father loves his companion helper from Sahaay. She helps with daily tasks and provides such wonderful company. Highly recommend!',
    location: 'Delhi'
  }, {
    name: 'Arjun Patel',
    role: 'Student Helper',
    avatar: '👨‍🎓',
    rating: 5,
    quote: 'As a college student, Sahaay helps me earn money by tutoring kids in my neighborhood. Flexible hours and fair pay - perfect for students!',
    location: 'Pune'
  }];
  return <section className="section-padding bg-background">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-foreground mb-6">
            What Our Community Says
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories from families and helpers who've found success with Sahaay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="service-card text-center space-y-6">
              {/* Avatar */}
              <div className="text-6xl">{testimonial.avatar}</div>
              
              {/* Rating */}
              <div className="flex justify-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-highlight-yellow text-highlight-yellow" />)}
              </div>

              {/* Quote */}
              <blockquote className="text-muted-foreground italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="space-y-1">
                <p className="font-poppins font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role} • {testimonial.location}
                </p>
              </div>
            </div>)}
        </div>

        {/* Overall Rating */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-card border border-highlight-yellow/20 rounded-[var(--radius-lg)] px-8 py-4 shadow-[var(--shadow-soft)]">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-highlight-yellow text-highlight-yellow" />)}
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">4.87/5 Average Rating</p>
              <p className="text-sm text-muted-foreground">Based on 1,200+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Testimonials;
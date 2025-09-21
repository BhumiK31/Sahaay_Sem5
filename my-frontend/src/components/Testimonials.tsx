import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Working Mother',
      location: 'Mumbai',
      content: 'Sahaay has been a lifesaver! I found a wonderful babysitter for my 6-year-old through the platform. The verification process gave me complete peace of mind.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Son of Senior Citizen',
      location: 'Delhi',
      content: 'Finding companionship for my elderly father was so easy through Sahaay. The helper is professional, caring, and has become like family to us.',
      rating: 5,
      avatar: '👨‍🦱'
    },
    {
      name: 'Aisha Patel',
      role: 'College Student',
      location: 'Pune',
      content: 'As a student, Sahaay has given me the perfect opportunity to earn while helping families in my community. The flexible scheduling works perfectly with my studies.',
      rating: 5,
      avatar: '👩‍🎓'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-4">
            What our community says
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from families and helpers who are part of the Sahaay community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-feature hover:shadow-card transition-all duration-300">
              {/* Rating Stars */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-highlight-yellow text-highlight-yellow" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-muted-foreground mb-6 text-center italic">
                "{testimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-mint/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">{testimonial.avatar}</span>
                </div>
                
                <div className="font-poppins font-semibold text-foreground">
                  {testimonial.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
                <div className="text-xs text-accent-coral font-medium">
                  {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-6 bg-card rounded-2xl p-6 shadow-soft">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-highlight-yellow text-highlight-yellow" />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">4.8/5</span>
            </div>
            <div className="h-6 w-px bg-border"></div>
            <div className="text-sm text-muted-foreground">
              Based on 1,200+ reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
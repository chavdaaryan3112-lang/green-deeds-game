import Navigation from "@/components/Navigation";
import { TreePine, Heart, Target, Users, Globe, Award, Leaf, Sprout, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const team = [
    {
      name: "Dr. Elena Rodriguez",
      role: "Chief Environmental Scientist",
      bio: "Leading climate researcher with 15+ years in sustainability",
      avatar: "🌱"
    },
    {
      name: "Marcus Chen",
      role: "Lead Developer & Co-Founder",
      bio: "Tech innovator passionate about using code for good",
      avatar: "💻"
    },
    {
      name: "Aisha Patel",
      role: "Community Manager",
      bio: "Building global communities for environmental action",
      avatar: "🤝"
    },
    {
      name: "David Kim",
      role: "UX Designer",
      bio: "Creating intuitive experiences that drive behavior change",
      avatar: "🎨"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for the Planet",
      description: "We're driven by love for our Earth and commitment to its future"
    },
    {
      icon: Target,
      title: "Action-Oriented",
      description: "We believe in practical solutions that create real, measurable impact"
    },
    {
      icon: Users,
      title: "Community First",
      description: "Together, we're stronger. Every individual contributes to our collective success"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Environmental challenges know no borders - neither do our solutions"
    }
  ];

  const milestones = [
    { year: "2022", event: "EcoChallenge founded with 100 beta users" },
    { year: "2023", event: "Reached 10,000 active users milestone" },
    { year: "2023", event: "Launched mobile app for iOS and Android" },
    { year: "2024", event: "Partnership with 50+ environmental organizations" },
    { year: "2024", event: "1 million challenges completed globally" }
  ];

  const impact = [
    { metric: "25,000+", label: "Active Users", icon: Users },
    { metric: "1.2M", label: "Challenges Completed", icon: Award },
    { metric: "50,000", label: "Virtual Trees Planted", icon: TreePine },
    { metric: "125 tons", label: "CO2 Emissions Saved", icon: Leaf }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-br from-accent/10 via-primary/5 to-success/10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
            About EcoChallenge
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We're on a mission to make environmental action accessible, engaging, and impactful for everyone.
            Because every small step counts toward a sustainable future.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-8">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Climate change is the greatest challenge of our time, but individual actions can create
                massive collective impact. EcoChallenge bridges the gap between awareness and action,
                making it easy and rewarding for people to adopt sustainable habits.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe that gamification, community support, and real-time feedback can transform
                how people think about their environmental footprint. Every challenge completed,
                every tree planted, every habit changed brings us closer to a sustainable planet.
              </p>
              <Button className="eco-button text-lg px-8 py-4">
                Join Our Mission 🌍
              </Button>
            </div>

            <div className="eco-card">
              <div className="grid grid-cols-2 gap-6">
                {impact.map((item) => (
                  <div key={item.label} className="text-center p-4 rounded-lg bg-primary/5">
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-foreground mb-1">{item.metric}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center text-foreground mb-16">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="eco-card text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center text-foreground mb-16">
            Our Journey
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20"></div>

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="eco-card inline-block">
                      <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                      <div className="text-foreground font-medium">{milestone.event}</div>
                    </div>
                  </div>

                  <div className="w-2/12 flex justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  </div>

                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center text-foreground mb-16">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="eco-card text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-success/20 transition-colors duration-300">
                  <span className="text-3xl">{member.avatar}</span>
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="eco-card inline-block max-w-2xl mx-auto text-center">
            <Mail className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Have questions about EcoChallenge? Want to partner with us? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="eco-button text-lg px-8 py-4">
                Contact Us 📧
              </Button>
              <Button variant="outline" className="eco-button-secondary text-lg px-8 py-4">
                View Partnerships
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

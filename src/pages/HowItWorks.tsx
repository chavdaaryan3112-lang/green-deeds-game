import Navigation from "@/components/Navigation";
import { ArrowRight, CheckCircle, Users, Target, Award, TreePine, Lightbulb, Zap, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      icon: Lightbulb,
      title: "Discover Your Eco-Goals",
      description: "Set personalized environmental challenges based on your lifestyle and interests",
      color: "text-yellow-500"
    },
    {
      icon: Target,
      title: "Track Your Progress",
      description: "Monitor your daily actions and see real-time impact on your carbon footprint",
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "Join the Community",
      description: "Connect with like-minded individuals and share your sustainability journey",
      color: "text-green-500"
    },
    {
      icon: Award,
      title: "Earn Rewards",
      description: "Unlock badges, achievements, and real-world rewards for your eco-actions",
      color: "text-purple-500"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Real-time Feedback",
      description: "Instant notifications and progress updates keep you motivated"
    },
    {
      icon: Heart,
      title: "Personalized Experience",
      description: "AI-powered recommendations tailored to your preferences"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "See how your actions contribute to worldwide environmental goals"
    },
    {
      icon: TreePine,
      title: "Tree Planting Rewards",
      description: "Earn virtual trees that we plant in real life through our partners"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-br from-primary/10 via-accent/5 to-success/10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
            How EcoQuest Works
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Transform your daily habits into meaningful environmental impact.
            Our simple, engaging system makes sustainability accessible to everyone.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
              Your Journey to Sustainability
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Four simple steps to transform your environmental impact and join a global movement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="eco-card text-center group hover:scale-105 transition-transform duration-300">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-muted-foreground absolute top-5 -right-4 hidden lg:block" />
                  )}
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center text-foreground mb-16">
            Powerful Features for Real Impact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="eco-card group hover:scale-105 transition-transform duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="eco-card inline-block max-w-4xl mx-auto text-center">
            <TreePine className="w-16 h-16 text-success mx-auto mb-6" />
            <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
              Ready to Start Your Eco-Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join thousands of users who are already making a difference. Every action counts,
              and together we're creating a sustainable future for our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="eco-button text-lg px-8 py-4">
                Get Started Today 🌱
              </Button>
              <Button variant="outline" className="eco-button-secondary text-lg px-8 py-4">
                Learn More About Impact
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

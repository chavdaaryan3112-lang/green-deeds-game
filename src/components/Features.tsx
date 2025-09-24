import { Gamepad2, Target, Trophy, Users, TreePine, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Gamepad2,
      title: "Gamified Experience",
      description: "Complete daily eco-challenges, earn points, and unlock achievements in our fun, interactive platform.",
      color: "text-primary"
    },
    {
      icon: Target,
      title: "Daily Challenges",
      description: "Fresh eco-friendly tasks every day, from walking instead of driving to planting trees and recycling.",
      color: "text-accent"
    },
    {
      icon: Trophy,
      title: "Milestone Rewards",
      description: "Celebrate your progress with virtual trees, badges, and animations as you reach new eco-milestones.",
      color: "text-warning"
    },
    {
      icon: Users,
      title: "Community Leaderboard",
      description: "Compete with friends and eco-warriors worldwide. See where you rank in making a positive impact.",
      color: "text-success"
    },
    {
      icon: TreePine,
      title: "Real Impact Tracking",
      description: "Watch your cumulative environmental impact grow with detailed analytics and progress visualization.",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Instant Gratification",
      description: "Get immediate feedback with delightful animations and real-time point updates for every action.",
      color: "text-accent"
    }
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Features That Inspire Change
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Discover how our platform makes sustainability engaging, rewarding, and fun for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="eco-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon className={`w-12 h-12 ${feature.color} mb-6 animate-glow group-hover:scale-110 transition-spring`} />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="eco-card inline-block">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join our community and start your eco-journey today!
            </p>
            <button className="eco-button">
              Get Started Now 🌱
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
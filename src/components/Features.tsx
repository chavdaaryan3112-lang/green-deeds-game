import { Gamepad2, Target, Trophy, Users, TreePine, Zap, Sprout, Flower } from "lucide-react";
import { Button } from "@/components/ui/button";

const Features = () => {
  const features = [
    {
      icon: Sprout,
      title: "Plant-Based Challenges",
      description: "Start with simple eco-friendly tasks like reducing waste and gradually grow your environmental impact.",
      color: "text-primary"
    },
    {
      icon: TreePine,
      title: "Tree Planting Rewards",
      description: "Earn virtual trees for completed challenges and watch your personal forest grow with each achievement.",
      color: "text-success"
    },
    {
      icon: Flower,
      title: "Blooming Progress",
      description: "Track your journey from seed to full bloom as you complete more challenges and unlock new levels.",
      color: "text-accent"
    },
    {
      icon: Users,
      title: "Eco-Community",
      description: "Connect with fellow eco-warriors, share tips, and compete in community challenges together.",
      color: "text-primary"
    },
    {
      icon: Target,
      title: "Growth Goals",
      description: "Set personal sustainability targets and achieve them with guided daily and weekly challenges.",
      color: "text-success"
    },
    {
      icon: Trophy,
      title: "Green Achievements",
      description: "Unlock special badges and rewards for reaching environmental milestones and helping others.",
      color: "text-accent"
    }
  ];

  return (
    <section id="features" className="relative w-full py-24 px-6 plant-theme">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            🌱 Grow Your Environmental Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            From tiny seeds to mighty trees - discover how our platform nurtures your journey to sustainability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="eco-card group hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className={`w-8 h-8 ${feature.color} animate-glow`} />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
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
          <div className="eco-card inline-block max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <TreePine className="w-10 h-10 text-success animate-glow" />
            </div>
            <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
              🌿 Ready to Plant Your Eco-Roots?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join our thriving community and start growing your environmental impact today!
            </p>
            <Button className="eco-button text-lg px-12 py-4">
              <a href="/challenges" className="flex items-center">
                Start Growing Now 🌱
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
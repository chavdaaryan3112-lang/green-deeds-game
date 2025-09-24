import { Leaf, TreePine, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-eco.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
      </div>
      
      {/* Hero Image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroImage} 
          alt="Lush green forest representing eco-friendly future" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-float">
        <Leaf className="w-8 h-8 text-primary animate-glow" />
      </div>
      <div className="absolute top-32 right-32 animate-float" style={{ animationDelay: '2s' }}>
        <TreePine className="w-10 h-10 text-success animate-glow" />
      </div>
      <div className="absolute bottom-40 left-40 animate-float" style={{ animationDelay: '4s' }}>
        <Leaf className="w-6 h-6 text-accent animate-glow" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Logo & Tagline */}
        <div className="mb-8 animate-bounce-subtle">
          <div className="flex items-center justify-center mb-4">
            <TreePine className="w-12 h-12 text-primary mr-3 animate-glow" />
            <h1 className="text-5xl md:text-7xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EcoChallenge
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
            Small Acts, Big Impact 🌍
          </p>
        </div>

        {/* Hero Description */}
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 text-balance">
            Turn Your Green Dreams into Reality
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-balance">
            Join thousands of eco-warriors completing daily challenges, earning rewards, and making a real difference. 
            Gamify your journey to sustainability with our interactive platform.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <Button size="lg" className="eco-button text-lg px-12 py-4">
            Start Your Journey 🌱
          </Button>
          <Button variant="outline" size="lg" className="eco-button-secondary text-lg px-8 py-4">
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="eco-card text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4 animate-glow" />
            <div className="text-3xl font-bold text-foreground mb-2">25,000+</div>
            <div className="text-muted-foreground">Active Eco-Warriors</div>
          </div>
          
          <div className="eco-card text-center">
            <Award className="w-12 h-12 text-accent mx-auto mb-4 animate-glow" />
            <div className="text-3xl font-bold text-foreground mb-2">1.2M</div>
            <div className="text-muted-foreground">Challenges Completed</div>
          </div>
          
          <div className="eco-card text-center">
            <TreePine className="w-12 h-12 text-success mx-auto mb-4 animate-glow" />
            <div className="text-3xl font-bold text-foreground mb-2">50,000</div>
            <div className="text-muted-foreground">Trees Planted</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
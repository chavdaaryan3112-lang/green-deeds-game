import { Leaf, TreePine, Users, Award, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-eco.jpg";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden hero-section forest-theme">
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center min-h-[calc(100vh-6rem)]">
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
            <a href="/challenges" className="flex items-center">
              Start Your Journey 🌱
            </a>
          </Button>
          <Button variant="outline" size="lg" className="eco-button-secondary text-lg px-8 py-4">
            <a href="/how-it-works" className="flex items-center">
              Learn More
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
              <Users className="w-8 h-8 text-primary animate-glow" />
            </div>
            <div className="text-4xl font-bold text-foreground mb-3">25,000+</div>
            <div className="text-lg text-muted-foreground font-medium">Active Eco-Warriors</div>
          </div>

          <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-success/20 transition-colors duration-300">
              <Award className="w-8 h-8 text-success animate-glow" />
            </div>
            <div className="text-4xl font-bold text-foreground mb-3">1.2M</div>
            <div className="text-lg text-muted-foreground font-medium">Challenges Completed</div>
          </div>

          <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
              <TreePine className="w-8 h-8 text-accent animate-glow" />
            </div>
            <div className="text-4xl font-bold text-foreground mb-3">50,000</div>
            <div className="text-lg text-muted-foreground font-medium">Trees Planted</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
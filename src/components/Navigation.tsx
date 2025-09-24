import { TreePine, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <TreePine className="w-8 h-8 text-primary animate-glow" />
            <span className="text-2xl font-heading font-bold text-foreground">
              EcoChallenge
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-smooth">
              How it Works
            </a>
            <a href="#community" className="text-muted-foreground hover:text-primary transition-smooth">
              Community
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-smooth">
              About
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              Login
            </Button>
            <Button className="eco-button">
              Sign Up Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/50">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth py-2">
                Features
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-smooth py-2">
                How it Works
              </a>
              <a href="#community" className="text-muted-foreground hover:text-primary transition-smooth py-2">
                Community
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-smooth py-2">
                About
              </a>
              <div className="flex flex-col space-y-3 pt-4 border-t border-border/50">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary justify-start">
                  Login
                </Button>
                <Button className="eco-button justify-start">
                  Sign Up Free
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
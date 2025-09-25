import React, { useState } from "react";
import { TreePine, Menu, X, Leaf, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    closeMenu();
  };

  const handleLinkClick = (to: string) => {
    console.log('Navigation: Clicking link to', to);
    closeMenu();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Always links to home */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            onClick={() => handleLinkClick('/')}
          >
            <div className="relative">
              <TreePine className="w-8 h-8 text-primary animate-glow" />
              <Leaf className="w-4 h-4 text-success absolute -top-1 -right-1 animate-float" />
            </div>
            <span className="text-2xl font-heading font-bold text-foreground">
              EcoQuest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {location.pathname === "/" ? (
              // Show section links when on home page
              <>
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                  onClick={closeMenu}
                >
                  Features
                </a>
                <Link
                  to="/how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                  onClick={() => handleLinkClick('/how-it-works')}
                >
                  How it Works
                </Link>
                <Link
                  to="/community"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                  onClick={() => handleLinkClick('/community')}
                >
                  Community
                </Link>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                  onClick={() => handleLinkClick('/about')}
                >
                  About
                </Link>
              </>
            ) : (
              // Show page links when on other pages
              <>
                <Link
                  to="/how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                  onClick={() => handleLinkClick('/how-it-works')}
                >
                  How it Works
                </Link>
                <Link
                  to="/community"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                  onClick={() => handleLinkClick('/community')}
                >
                  Community
                </Link>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                  onClick={() => handleLinkClick('/about')}
                >
                  About
                </Link>
              </>
            )}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-muted-foreground hover:text-primary flex items-center gap-2"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                    <Button className="eco-button">
                      <Link to="/dashboard" className="flex items-center" onClick={() => handleLinkClick('/dashboard')}>
                        Dashboard
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => navigate("/auth")}
                    >
                      Login
                    </Button>
                    <Button className="eco-button">
                      <Link to="/auth" className="flex items-center" onClick={() => handleLinkClick('/auth')}>
                        Sign Up Free
                      </Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {location.pathname === "/" ? (
                // Show section links when on home page
                <>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-muted/50"
                    onClick={closeMenu}
                  >
                    Features
                  </a>
                  <Link
                    to="/how-it-works"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-muted/50"
                    onClick={() => handleLinkClick('/how-it-works')}
                  >
                    How it Works
                  </Link>
                  <Link
                    to="/community"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-muted/50"
                    onClick={() => handleLinkClick('/community')}
                  >
                    Community
                  </Link>
                  <Link
                    to="/about"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-muted/50"
                    onClick={() => handleLinkClick('/about')}
                  >
                    About
                  </Link>
                </>
              ) : (
                // Show page links when on other pages
                <>
                  <Link
                    to="/how-it-works"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-muted/50"
                    onClick={() => handleLinkClick('/how-it-works')}
                  >
                    How it Works
                  </Link>
                  <Link
                    to="/community"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-muted/50"
                    onClick={() => handleLinkClick('/community')}
                  >
                    Community
                  </Link>
                  <Link
                    to="/about"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-muted/50"
                    onClick={() => handleLinkClick('/about')}
                  >
                    About
                  </Link>
                </>
              )}

              {/* Mobile CTA Section */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border/50">
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground px-4 py-2">
                          <User className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          className="text-muted-foreground hover:text-primary justify-start flex items-center gap-2"
                          onClick={handleSignOut}
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </Button>
                        <Button className="eco-button justify-start">
                          <Link to="/dashboard" className="flex items-center w-full" onClick={() => handleLinkClick('/dashboard')}>
                            Dashboard
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="ghost" 
                          className="text-muted-foreground hover:text-primary justify-start"
                          onClick={() => navigate("/auth")}
                        >
                          Login
                        </Button>
                        <Button className="eco-button justify-start">
                          <Link to="/auth" className="flex items-center w-full" onClick={() => handleLinkClick('/auth')}>
                            Sign Up Free
                          </Link>
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
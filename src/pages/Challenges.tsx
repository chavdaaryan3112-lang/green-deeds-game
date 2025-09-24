import Navigation from "@/components/Navigation";
import { Filter, Search, Star, Clock, Users, Award, TreePine, Droplets, Zap, Recycle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const Challenges = () => {
  const categories = [
    { name: "All", icon: Star, count: 48, active: true },
    { name: "Energy", icon: Zap, count: 12, active: false },
    { name: "Water", icon: Droplets, count: 8, active: false },
    { name: "Waste", icon: Recycle, count: 10, active: false },
    { name: "Transportation", icon: TreePine, count: 6, active: false },
    { name: "Food", icon: Leaf, count: 12, active: false }
  ];

  const challenges = [
    {
      id: 1,
      title: "Zero Waste Week",
      description: "Commit to producing zero waste for 7 days straight",
      difficulty: "Hard",
      points: 500,
      duration: "7 days",
      participants: 15420,
      category: "Waste",
      icon: Recycle,
      color: "text-success"
    },
    {
      id: 2,
      title: "Energy Saver",
      description: "Reduce your household energy usage by 20%",
      difficulty: "Medium",
      points: 300,
      duration: "Ongoing",
      participants: 8750,
      category: "Energy",
      icon: Zap,
      color: "text-accent"
    },
    {
      id: 3,
      title: "Water Wise",
      description: "Track and reduce your daily water consumption",
      difficulty: "Easy",
      points: 150,
      duration: "30 days",
      participants: 6230,
      category: "Water",
      icon: Droplets,
      color: "text-primary"
    },
    {
      id: 4,
      title: "Green Commute",
      description: "Use sustainable transportation for a week",
      difficulty: "Medium",
      points: 250,
      duration: "7 days",
      participants: 4120,
      category: "Transportation",
      icon: TreePine,
      color: "text-success"
    },
    {
      id: 5,
      title: "Plant-Based Meal",
      description: "Try plant-based meals for 3 consecutive days",
      difficulty: "Easy",
      points: 100,
      duration: "3 days",
      participants: 2890,
      category: "Food",
      icon: Leaf,
      color: "text-primary"
    },
    {
      id: 6,
      title: "Solar Power Hour",
      description: "Maximize natural light and minimize electricity use",
      difficulty: "Easy",
      points: 75,
      duration: "1 day",
      participants: 5670,
      category: "Energy",
      icon: Zap,
      color: "text-accent"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/10 text-success";
      case "Medium": return "bg-accent/10 text-accent";
      case "Hard": return "bg-warning/10 text-warning";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-br from-primary/10 via-accent/5 to-success/10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
            Environmental Challenges
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose from hundreds of challenges designed to help you reduce your environmental impact and build sustainable habits.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search challenges..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">Filter by:</span>
              <select className="px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Difficulty</option>
                <option>Duration</option>
                <option>Category</option>
                <option>Points</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  category.active
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/50'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="font-medium">{category.name}</span>
                <span className="text-sm">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Grid */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="eco-card group hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <challenge.icon className={`w-6 h-6 ${challenge.color}`} />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {challenge.title}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {challenge.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-accent" />
                      <span>{challenge.points} pts</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{challenge.duration}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{challenge.participants.toLocaleString()} joined</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                    {challenge.category}
                  </span>
                </div>

                <Button className="w-full eco-button">
                  Start Challenge 🚀
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Challenge */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="eco-card text-center">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-accent" />
            </div>

            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              🌟 Challenge of the Month
            </h2>

            <h3 className="text-2xl font-semibold text-primary mb-4">
              Global Earth Day Initiative
            </h3>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
              Join millions worldwide in reducing plastic usage for Earth Day.
              Complete daily challenges and track your impact in real-time!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="eco-button text-lg px-8 py-4">
                Join Earth Day Challenge 🌍
              </Button>
              <Button variant="outline" className="eco-button-secondary text-lg px-8 py-4">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center text-foreground mb-12">
            Challenge Impact
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">1.2M</div>
              <div className="text-muted-foreground">Challenges Completed</div>
            </div>

            <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
              <Users className="w-8 h-8 text-success mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">25K</div>
              <div className="text-muted-foreground">Active Challengers</div>
            </div>

            <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
              <TreePine className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">50K</div>
              <div className="text-muted-foreground">Trees Planted</div>
            </div>

            <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
              <Leaf className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">125t</div>
              <div className="text-muted-foreground">CO2 Saved</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Challenges;

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Target, Star, Clock, Leaf, Zap, Car, Droplets, Utensils, 
  Recycle, Search, Filter, CheckCircle, Plus, TreePine 
} from "lucide-react";
import { useChallenges } from "@/hooks/useChallenges";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'energy': return <Zap className="w-5 h-5" />;
    case 'transportation': return <Car className="w-5 h-5" />;
    case 'water': return <Droplets className="w-5 h-5" />;
    case 'food': return <Utensils className="w-5 h-5" />;
    case 'waste reduction': return <Recycle className="w-5 h-5" />;
    default: return <Leaf className="w-5 h-5" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'bg-success text-success-foreground';
    case 'medium': return 'bg-warning text-warning-foreground';
    case 'hard': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const ChallengesBrowse = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { challenges, userChallenges, startChallenge, loading } = useChallenges();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const categories = [...new Set(challenges.map(c => c.category))];
  const difficulties = [...new Set(challenges.map(c => c.difficulty))];

  const userChallengeIds = userChallenges.map(uc => uc.challenge_id);

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || challenge.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || challenge.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const availableChallenges = filteredChallenges.filter(c => !userChallengeIds.includes(c.id));
  const startedChallenges = filteredChallenges.filter(c => userChallengeIds.includes(c.id));

  const handleStartChallenge = async (challengeId: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to start challenges.",
        variant: "destructive",
      });
      return;
    }

    try {
      await startChallenge(challengeId);
      toast({
        title: "Challenge Started! 🚀",
        description: "Good luck with your eco-challenge!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start challenge. It might already be started.",
        variant: "destructive",
      });
    }
  };

  const ChallengeCard = ({ challenge, isStarted = false }: { challenge: any; isStarted?: boolean }) => (
    <Card className="eco-card group hover:scale-105 transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            {getCategoryIcon(challenge.category)}
            <CardTitle className="text-lg font-semibold">{challenge.title}</CardTitle>
          </div>
          <Badge className={getDifficultyColor(challenge.difficulty)}>
            {challenge.difficulty}
          </Badge>
        </div>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-accent" />
              <span>{challenge.points} pts</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{challenge.estimated_time}</span>
            </span>
            <span className="flex items-center space-x-1">
              <TreePine className="w-4 h-4 text-success" />
              <span>{challenge.co2_impact_kg}kg CO2</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline">{challenge.category}</Badge>
          
          {isStarted ? (
            <div className="flex items-center space-x-2 text-success">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Started</span>
            </div>
          ) : (
            <Button 
              className="eco-button"
              onClick={() => handleStartChallenge(challenge.id)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Start Challenge
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <TreePine className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-muted-foreground">Loading challenges...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 bg-gradient-to-br from-primary/10 via-success/5 to-accent/5">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Eco Challenges 🌱
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from dozens of environmental challenges to reduce your carbon footprint and earn points!
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search challenges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">All Difficulties</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Challenges Tabs */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="available" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="available">
                Available Challenges ({availableChallenges.length})
              </TabsTrigger>
              <TabsTrigger value="started">
                My Challenges ({startedChallenges.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-6">
              {availableChallenges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableChallenges.map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No challenges found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setSelectedDifficulty("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="started" className="space-y-6">
              {startedChallenges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {startedChallenges.map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} isStarted />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No challenges started yet</h3>
                  <p className="text-muted-foreground mb-4">Start your first eco-challenge from the available challenges!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default ChallengesBrowse;
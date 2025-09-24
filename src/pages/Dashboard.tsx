import Navigation from "@/components/Navigation";
import { Trophy, Target, Calendar, TrendingUp, Award, TreePine, Flame, Star, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const userStats = {
    level: 12,
    points: 8750,
    streak: 28,
    treesPlanted: 67,
    challengesCompleted: 156,
    co2Saved: "23.5 kg"
  };

  const dailyChallenges = [
    {
      id: 1,
      title: "Reduce Plastic Usage",
      description: "Use reusable bags instead of plastic",
      points: 50,
      time: "15 min",
      completed: true,
      category: "Waste Reduction"
    },
    {
      id: 2,
      title: "Save Energy",
      description: "Turn off lights when not in use",
      points: 30,
      time: "Ongoing",
      completed: false,
      category: "Energy"
    },
    {
      id: 3,
      title: "Walk Instead of Drive",
      description: "Walk for short trips under 1km",
      points: 75,
      time: "20 min",
      completed: false,
      category: "Transportation"
    }
  ];

  const achievements = [
    { name: "First Steps", description: "Complete your first challenge", icon: "🎯", unlocked: true },
    { name: "Week Warrior", description: "Complete challenges for 7 days straight", icon: "🔥", unlocked: true },
    { name: "Tree Planter", description: "Plant 50 virtual trees", icon: "🌲", unlocked: true },
    { name: "Eco Master", description: "Reach level 25", icon: "👑", unlocked: false },
    { name: "Community Leader", description: "Help 10 friends join", icon: "🤝", unlocked: false }
  ];

  const weeklyProgress = [
    { day: "Mon", challenges: 3, points: 150 },
    { day: "Tue", challenges: 5, points: 225 },
    { day: "Wed", challenges: 2, points: 100 },
    { day: "Thu", challenges: 4, points: 200 },
    { day: "Fri", challenges: 6, points: 300 },
    { day: "Sat", challenges: 3, points: 150 },
    { day: "Sun", challenges: 4, points: 200 }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-6 bg-gradient-to-br from-primary/10 via-success/5 to-accent/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Welcome back, Eco-Warrior! 🌱
              </h1>
              <p className="text-xl text-muted-foreground">
                Level {userStats.level} • {userStats.points.toLocaleString()} points
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{userStats.streak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{userStats.treesPlanted}</div>
                  <div className="text-sm text-muted-foreground">Trees</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
              <Target className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">{userStats.challengesCompleted}</div>
              <div className="text-sm text-muted-foreground">Challenges Done</div>
            </div>

            <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
              <Flame className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">{userStats.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>

            <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
              <TreePine className="w-8 h-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">{userStats.treesPlanted}</div>
              <div className="text-sm text-muted-foreground">Trees Planted</div>
            </div>

            <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">{userStats.co2Saved}</div>
              <div className="text-sm text-muted-foreground">CO2 Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Daily Challenges */}
            <div className="lg:col-span-2">
              <div className="eco-card mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground">Today's Challenges</h2>
                  <Calendar className="w-6 h-6 text-primary" />
                </div>

                <div className="space-y-4">
                  {dailyChallenges.map((challenge) => (
                    <div key={challenge.id} className={`p-4 rounded-lg border transition-all duration-300 ${
                      challenge.completed
                        ? 'bg-success/10 border-success/30'
                        : 'bg-muted/30 border-border hover:bg-muted/50'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                            {challenge.completed && <CheckCircle className="w-5 h-5 text-success" />}
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{challenge.description}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-accent" />
                              <span>{challenge.points} points</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{challenge.time}</span>
                            </span>
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              {challenge.category}
                            </span>
                          </div>
                        </div>
                        {!challenge.completed && (
                          <Button size="sm" className="eco-button">
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Progress */}
              <div className="eco-card">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Weekly Progress</h2>
                <div className="space-y-3">
                  {weeklyProgress.map((day) => (
                    <div key={day.day} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="font-medium text-foreground">{day.day}</div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-muted-foreground">
                          {day.challenges} challenges
                        </div>
                        <div className="text-sm font-bold text-primary">
                          {day.points} pts
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Achievements */}
              <div className="eco-card mb-8">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Achievements</h2>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      achievement.unlocked
                        ? 'bg-success/10 border border-success/30'
                        : 'bg-muted/30 opacity-60'
                    }`}>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg">{achievement.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{achievement.name}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                      </div>
                      {achievement.unlocked && <CheckCircle className="w-5 h-5 text-success" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="eco-card">
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full eco-button justify-start" variant="outline">
                    <Target className="w-4 h-4 mr-2" />
                    Browse Challenges
                  </Button>
                  <Button className="w-full eco-button justify-start" variant="outline">
                    <TreePine className="w-4 h-4 mr-2" />
                    Plant a Tree
                  </Button>
                  <Button className="w-full eco-button justify-start" variant="outline">
                    <Trophy className="w-4 h-4 mr-2" />
                    View Leaderboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

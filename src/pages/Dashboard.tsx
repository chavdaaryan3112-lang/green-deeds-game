import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Trophy, Target, Calendar, TrendingUp, Award, TreePine, Flame, Star, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useChallenges } from "@/hooks/useChallenges";
import { useAchievements } from "@/hooks/useAchievements";
import { useGameLogic } from "@/hooks/useGameLogic";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { getTodaysChallenges, userChallenges, loading: challengesLoading } = useChallenges();
  const { getAchievementsWithStatus, loading: achievementsLoading } = useAchievements();
  const { completeUserChallenge, plantTree } = useGameLogic();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || profileLoading || challengesLoading || achievementsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <TreePine className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null; // Will redirect to auth
  }

  const todaysChallenges = getTodaysChallenges();
  const achievementsWithStatus = getAchievementsWithStatus().slice(0, 5);
  const recentChallenges = userChallenges.filter(uc => uc.is_completed).slice(0, 7);

  const handleCompleteChallenge = async (userChallengeId: string, challenge: any) => {
    await completeUserChallenge(userChallengeId, challenge.challenge);
  };

  const handlePlantTree = async () => {
    await plantTree();
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-6 bg-gradient-to-br from-primary/10 via-success/5 to-accent/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Welcome back, {profile.full_name || 'Eco-Warrior'}! 🌱
              </h1>
              <p className="text-xl text-muted-foreground">
                Level {profile.level} • {profile.total_points.toLocaleString()} points
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{profile.current_streak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{profile.trees_planted}</div>
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
              <div className="text-2xl font-bold text-foreground mb-1">{userChallenges.filter(uc => uc.is_completed).length}</div>
              <div className="text-sm text-muted-foreground">Challenges Done</div>
            </div>

            <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
              <Flame className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">{profile.current_streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>

            <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
              <TreePine className="w-8 h-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">{profile.trees_planted}</div>
              <div className="text-sm text-muted-foreground">Trees Planted</div>
            </div>

            <div className="eco-card text-center group hover:scale-105 transition-transform duration-300">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">{profile.co2_saved_kg.toFixed(1)}kg</div>
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
                  {todaysChallenges.length > 0 ? todaysChallenges.map((userChallenge) => (
                    <div key={userChallenge.id} className={`p-4 rounded-lg border transition-all duration-300 ${
                      userChallenge.is_completed
                        ? 'bg-success/10 border-success/30'
                        : 'bg-muted/30 border-border hover:bg-muted/50'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-foreground">{userChallenge.challenge.title}</h3>
                            {userChallenge.is_completed && <CheckCircle className="w-5 h-5 text-success" />}
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{userChallenge.challenge.description}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-accent" />
                              <span>{userChallenge.challenge.points} points</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{userChallenge.challenge.estimated_time}</span>
                            </span>
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              {userChallenge.challenge.category}
                            </span>
                          </div>
                        </div>
                        {!userChallenge.is_completed && (
                          <Button 
                            size="sm" 
                            className="eco-button"
                            onClick={() => handleCompleteChallenge(userChallenge.id, userChallenge)}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">No challenges started today</p>
                      <p className="text-sm">Visit the Challenges page to start some!</p>
                      <Button 
                        className="mt-4 eco-button" 
                        onClick={() => navigate("/challenges/browse")}
                      >
                        Browse Challenges
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Weekly Progress */}
              <div className="eco-card">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Recent Activity</h2>
                <div className="space-y-3">
                  {recentChallenges.length > 0 ? recentChallenges.map((userChallenge) => (
                    <div key={userChallenge.id} className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30">
                      <div className="font-medium text-foreground">{userChallenge.challenge.title}</div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-muted-foreground">
                          {userChallenge.challenge.category}
                        </div>
                        <div className="text-sm font-bold text-success">
                          +{userChallenge.challenge.points} pts
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No completed challenges yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Achievements */}
              <div className="eco-card mb-8">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Achievements</h2>
                <div className="space-y-4">
                  {achievementsWithStatus.map((achievement) => (
                    <div key={achievement.id} className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
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
                  <Button 
                    className="w-full eco-button justify-start" 
                    variant="outline"
                    onClick={() => navigate("/challenges/browse")}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Browse Challenges
                  </Button>
                  <Button 
                    className="w-full eco-button justify-start" 
                    variant="outline"
                    onClick={handlePlantTree}
                    disabled={profile.total_points < 100}
                  >
                    <TreePine className="w-4 h-4 mr-2" />
                    Plant a Tree (100 pts)
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

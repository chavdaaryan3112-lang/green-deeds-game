import Navigation from "@/components/Navigation";
import { Users, Trophy, MessageCircle, Heart, Star, TrendingUp, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Community = () => {
  const topContributors = [
    { name: "Sarah Green", points: 15420, trees: 127, badge: "Eco Master", avatar: "🌱" },
    { name: "Mike Forest", points: 12890, trees: 98, badge: "Tree Guardian", avatar: "🌲" },
    { name: "Emma Earth", points: 11200, trees: 85, badge: "Green Warrior", avatar: "🌍" },
    { name: "Alex Ocean", points: 9870, trees: 74, badge: "Water Saver", avatar: "🌊" },
    { name: "Luna Sky", points: 8940, trees: 67, badge: "Solar Hero", avatar: "☀️" }
  ];

  const recentActivities = [
    {
      user: "Sarah Green",
      action: "completed 'Zero Waste Week' challenge",
      points: 500,
      time: "2 hours ago",
      avatar: "🌱"
    },
    {
      user: "Mike Forest",
      action: "planted 5 virtual trees",
      points: 250,
      time: "4 hours ago",
      avatar: "🌲"
    },
    {
      user: "Emma Earth",
      action: "reduced energy usage by 20%",
      points: 300,
      time: "6 hours ago",
      avatar: "🌍"
    }
  ];

  const communityStats = [
    { label: "Active Members", value: "25,000+", icon: Users },
    { label: "Challenges Completed", value: "1.2M", icon: Trophy },
    { label: "Trees Planted", value: "50,000", icon: MessageCircle },
    { label: "CO2 Saved", value: "125 tons", icon: TrendingUp }
  ];

  const upcomingEvents = [
    {
      title: "Global Earth Day Challenge",
      date: "April 22, 2024",
      description: "Join the worldwide challenge to reduce plastic usage",
      participants: 15420
    },
    {
      title: "Community Tree Planting Drive",
      date: "April 28, 2024",
      description: "Virtual tree planting event with real impact",
      participants: 8750
    },
    {
      title: "Water Conservation Week",
      date: "May 5, 2024",
      description: "Learn and share water-saving techniques",
      participants: 6230
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-br from-success/10 via-primary/5 to-accent/10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
            EcoQuest Community
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with fellow eco-warriors, share your progress, and inspire others to make a difference.
          </p>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat) => (
              <div key={stat.label} className="eco-card text-center group hover:scale-105 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Leaderboard */}
            <div className="lg:col-span-1">
              <div className="eco-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground">Leaderboard</h2>
                  <Trophy className="w-6 h-6 text-accent" />
                </div>

                <div className="space-y-4">
                  {topContributors.map((user, index) => (
                    <div key={user.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm">{user.avatar}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.badge}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{user.points.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{user.trees} trees</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="eco-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground">Recent Activity</h2>
                  <MessageCircle className="w-6 h-6 text-success" />
                </div>

                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                      <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">{activity.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{activity.user}</div>
                        <div className="text-muted-foreground mb-2">{activity.action}</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-accent" />
                            <span className="text-sm font-medium text-primary">+{activity.points} points</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center text-foreground mb-12">
            Upcoming Community Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="eco-card group hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                  <span className="text-sm text-muted-foreground">{event.date}</span>
                </div>

                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {event.title}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {event.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-success" />
                    <span className="text-sm text-muted-foreground">
                      {event.participants.toLocaleString()} participants
                    </span>
                  </div>
                  <Button size="sm" className="eco-button">
                    Join Event
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="eco-card inline-block max-w-2xl mx-auto text-center">
            <Heart className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
              Be Part of the Green Revolution
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Every voice matters in our fight for a sustainable future. Join our community and amplify your impact!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="eco-button text-lg px-8 py-4">
                Join Community 🌍
              </Button>
              <Button variant="outline" className="eco-button-secondary text-lg px-8 py-4">
                View Challenges
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;

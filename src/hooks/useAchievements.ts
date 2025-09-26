import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_value: number;
  points_reward: number;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  achievement: Achievement;
}

export const useAchievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAchievements();
    if (user) {
      fetchUserAchievements();
    }
  }, [user]);

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("points_reward", { ascending: false });

      if (error) throw error;
      setAchievements(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const fetchUserAchievements = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_achievements")
        .select(`
          *,
          achievement:achievements(*)
        `)
        .eq("user_id", user.id)
        .order("unlocked_at", { ascending: false });

      if (error) throw error;
      setUserAchievements(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("user_achievements")
        .insert({
          user_id: user.id,
          achievement_id: achievementId,
        })
        .select(`
          *,
          achievement:achievements(*)
        `)
        .single();

      if (error) throw error;
      setUserAchievements(prev => [data, ...prev]);
      return data;
    } catch (err) {
      // Achievement might already be unlocked, ignore error
      console.log("Achievement unlock error:", err);
    }
  };

  const getAchievementsWithStatus = () => {
    const unlockedIds = userAchievements.map(ua => ua.achievement_id);
    return achievements.map(achievement => ({
      ...achievement,
      unlocked: unlockedIds.includes(achievement.id),
      unlockedAt: userAchievements.find(ua => ua.achievement_id === achievement.id)?.unlocked_at,
    }));
  };

  return {
    achievements,
    userAchievements,
    loading,
    error,
    fetchAchievements,
    fetchUserAchievements,
    unlockAchievement,
    getAchievementsWithStatus,
  };
};
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  estimated_time: string;
  difficulty: string;
  co2_impact_kg: number;
  is_active: boolean;
  created_at: string;
}

export interface UserChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  completed_at: string | null;
  started_at: string;
  is_completed: boolean;
  challenge: Challenge;
}

export const useChallenges = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChallenges();
    if (user) {
      fetchUserChallenges();
    }
  }, [user]);

  const fetchChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setChallenges(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const fetchUserChallenges = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_challenges")
        .select(`
          *,
          challenge:challenges(*)
        `)
        .eq("user_id", user.id)
        .order("started_at", { ascending: false });

      if (error) throw error;
      setUserChallenges(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const startChallenge = async (challengeId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("user_challenges")
        .insert({
          user_id: user.id,
          challenge_id: challengeId,
        })
        .select(`
          *,
          challenge:challenges(*)
        `)
        .single();

      if (error) throw error;
      setUserChallenges(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  const completeChallenge = async (userChallengeId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("user_challenges")
        .update({
          is_completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq("id", userChallengeId)
        .eq("user_id", user.id)
        .select(`
          *,
          challenge:challenges(*)
        `)
        .single();

      if (error) throw error;

      // Update local state
      setUserChallenges(prev =>
        prev.map(uc => (uc.id === userChallengeId ? data : uc))
      );

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  const getTodaysChallenges = () => {
    return userChallenges.filter(uc => {
      const startedToday = new Date(uc.started_at).toDateString() === new Date().toDateString();
      return startedToday;
    }).slice(0, 3); // Limit to 3 daily challenges
  };

  const getAvailableChallenges = () => {
    const userChallengeIds = userChallenges.map(uc => uc.challenge_id);
    return challenges.filter(c => !userChallengeIds.includes(c.id));
  };

  return {
    challenges,
    userChallenges,
    loading,
    error,
    fetchChallenges,
    fetchUserChallenges,
    startChallenge,
    completeChallenge,
    getTodaysChallenges,
    getAvailableChallenges,
  };
};
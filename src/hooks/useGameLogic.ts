import { useToast } from "@/hooks/use-toast";
import { useProfile } from "./useProfile";
import { useAchievements } from "./useAchievements";
import { useChallenges, Challenge } from "./useChallenges";

export const useGameLogic = () => {
  const { toast } = useToast();
  const { profile, updateProfile } = useProfile();
  const { unlockAchievement, achievements } = useAchievements();
  const { completeChallenge } = useChallenges();

  const calculateLevel = (points: number) => {
    return Math.floor(points / 500) + 1;
  };

  const calculateTreesEarned = (co2Saved: number) => {
    return Math.floor(co2Saved / 10); // 1 tree per 10kg CO2 saved
  };

  const completeUserChallenge = async (userChallengeId: string, challenge: Challenge) => {
    if (!profile) return;

    try {
      // Complete the challenge
      await completeChallenge(userChallengeId);

      // Calculate new stats
      const newPoints = profile.total_points + challenge.points;
      const newCO2Saved = profile.co2_saved_kg + challenge.co2_impact_kg;
      const newLevel = calculateLevel(newPoints);
      const newTrees = calculateTreesEarned(newCO2Saved);

      // Update profile
      await updateProfile({
        total_points: newPoints,
        co2_saved_kg: newCO2Saved,
        level: newLevel,
        trees_planted: newTrees,
        current_streak: profile.current_streak + 1,
      });

      // Check for achievements
      await checkAndUnlockAchievements(newPoints, newLevel, newTrees, newCO2Saved);

      toast({
        title: "Challenge Completed! 🎉",
        description: `You earned ${challenge.points} points and saved ${challenge.co2_impact_kg}kg CO2!`,
      });

      if (newLevel > profile.level) {
        toast({
          title: "Level Up! 🚀",
          description: `Congratulations! You reached level ${newLevel}!`,
        });
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete challenge. Please try again.",
        variant: "destructive",
      });
    }
  };

  const checkAndUnlockAchievements = async (
    totalPoints: number,
    level: number,
    treesPlanted: number,
    co2Saved: number
  ) => {
    // Check achievements based on current stats
    for (const achievement of achievements) {
      const { requirement_type, requirement_value } = achievement;
      
      let shouldUnlock = false;

      switch (requirement_type) {
        case "total_points":
          shouldUnlock = totalPoints >= requirement_value;
          break;
        case "level":
          shouldUnlock = level >= requirement_value;
          break;
        case "trees_planted":
          shouldUnlock = treesPlanted >= requirement_value;
          break;
        case "co2_saved":
          shouldUnlock = co2Saved >= requirement_value;
          break;
        case "challenges_completed":
          // This would need additional logic to count completed challenges
          break;
        default:
          break;
      }

      if (shouldUnlock) {
        const unlockedAchievement = await unlockAchievement(achievement.id);
        if (unlockedAchievement) {
          toast({
            title: "Achievement Unlocked! 🏆",
            description: `${achievement.name}: ${achievement.description}`,
          });
        }
      }
    }
  };

  const plantTree = async () => {
    if (!profile) return;

    const treeCost = 100; // Cost in points to plant a tree
    if (profile.total_points < treeCost) {
      toast({
        title: "Not enough points",
        description: `You need ${treeCost} points to plant a tree. Complete more challenges!`,
        variant: "destructive",
      });
      return;
    }

    try {
      await updateProfile({
        total_points: profile.total_points - treeCost,
        trees_planted: profile.trees_planted + 1,
      });

      toast({
        title: "Tree Planted! 🌳",
        description: "Your tree has been planted in partnership with our environmental partners!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to plant tree. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    completeUserChallenge,
    plantTree,
    calculateLevel,
    calculateTreesEarned,
  };
};
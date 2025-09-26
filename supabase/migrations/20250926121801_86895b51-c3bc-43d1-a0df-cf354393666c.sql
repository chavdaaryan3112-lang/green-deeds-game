-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  level INTEGER DEFAULT 1,
  total_points INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  trees_planted INTEGER DEFAULT 0,
  co2_saved_kg DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create challenges table
CREATE TABLE public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  points INTEGER NOT NULL,
  estimated_time TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'easy',
  co2_impact_kg DECIMAL(10,2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user challenges progress table
CREATE TABLE public.user_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_completed BOOLEAN DEFAULT false,
  UNIQUE(user_id, challenge_id)
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  requirement_type TEXT NOT NULL,
  requirement_value INTEGER NOT NULL,
  points_reward INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user achievements table
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for challenges (public read)
CREATE POLICY "Anyone can view active challenges" ON public.challenges
  FOR SELECT USING (is_active = true);

-- RLS Policies for user_challenges
CREATE POLICY "Users can view their own challenge progress" ON public.user_challenges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own challenge progress" ON public.user_challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenge progress" ON public.user_challenges
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for achievements (public read)
CREATE POLICY "Anyone can view achievements" ON public.achievements
  FOR SELECT USING (true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can view their own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample challenges
INSERT INTO public.challenges (title, description, category, points, estimated_time, difficulty, co2_impact_kg) VALUES
('Reduce Plastic Usage', 'Use reusable bags instead of plastic bags for shopping', 'Waste Reduction', 50, '15 min', 'easy', 0.5),
('Save Energy', 'Turn off lights and electronics when not in use', 'Energy', 30, 'Ongoing', 'easy', 1.2),
('Walk Instead of Drive', 'Walk for trips under 1km instead of driving', 'Transportation', 75, '20 min', 'medium', 2.5),
('Eat Plant-Based Meal', 'Choose a plant-based meal instead of meat', 'Food', 40, '30 min', 'easy', 3.2),
('Use Public Transport', 'Take public transport instead of private vehicle', 'Transportation', 60, '30 min', 'medium', 5.8),
('Recycle Properly', 'Sort and recycle your waste correctly', 'Waste Reduction', 35, '10 min', 'easy', 0.8),
('Water Conservation', 'Take shorter showers (under 5 minutes)', 'Water', 45, '5 min', 'medium', 1.5),
('Digital Receipts', 'Choose digital receipts instead of paper', 'Waste Reduction', 25, '1 min', 'easy', 0.2),
('Unplug Devices', 'Unplug chargers and devices when not in use', 'Energy', 20, '5 min', 'easy', 0.7),
('Bike to Work', 'Use bicycle for commuting instead of car', 'Transportation', 100, '45 min', 'hard', 8.4);

-- Insert sample achievements
INSERT INTO public.achievements (name, description, icon, requirement_type, requirement_value, points_reward) VALUES
('First Steps', 'Complete your first challenge', '🎯', 'challenges_completed', 1, 100),
('Week Warrior', 'Complete challenges for 7 days straight', '🔥', 'streak_days', 7, 500),
('Tree Planter', 'Plant 50 virtual trees', '🌲', 'trees_planted', 50, 1000),
('Eco Enthusiast', 'Complete 25 challenges', '🌱', 'challenges_completed', 25, 750),
('Streak Master', 'Maintain a 30-day streak', '⚡', 'streak_days', 30, 2000),
('Carbon Saver', 'Save 100kg of CO2', '🌍', 'co2_saved', 100, 1500),
('Point Collector', 'Earn 5000 total points', '💎', 'total_points', 5000, 1000),
('Transportation Hero', 'Complete 10 transportation challenges', '🚴', 'category_challenges', 10, 800),
('Energy Saver', 'Complete 15 energy challenges', '💡', 'category_challenges', 15, 900),
('Waste Warrior', 'Complete 20 waste reduction challenges', '♻️', 'category_challenges', 20, 1000);
import { model, Schema, type Document, type Types } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  profile: {
    age: number;
    fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  };
}

export interface TeamDocument extends Document {
  name: string;
  description: string;
  members: Types.ObjectId[];
}

export interface ActivityDocument extends Document {
  user: Types.ObjectId;
  type: 'running' | 'walking' | 'strength';
  durationMinutes: number;
  points: number;
  date: Date;
}

export interface LeaderboardDocument extends Document {
  user: Types.ObjectId;
  team: Types.ObjectId;
  points: number;
  rank: number;
}

export interface WorkoutDocument extends Document {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  activityType: 'running' | 'walking' | 'strength';
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    age: { type: Number, required: true },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  },
});

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const activitySchema = new Schema<ActivityDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
  durationMinutes: { type: Number, required: true },
  points: { type: Number, required: true },
  date: { type: Date, required: true },
});

const leaderboardSchema = new Schema<LeaderboardDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
});

const workoutSchema = new Schema<WorkoutDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  durationMinutes: { type: Number, required: true },
  activityType: { type: String, enum: ['running', 'walking', 'strength'], required: true },
});

export const User = model<UserDocument>('User', userSchema, 'users');
export const Team = model<TeamDocument>('Team', teamSchema, 'teams');
export const Activity = model<ActivityDocument>('Activity', activitySchema, 'activities');
export const Leaderboard = model<LeaderboardDocument>('Leaderboard', leaderboardSchema, 'leaderboard');
export const Workout = model<WorkoutDocument>('Workout', workoutSchema, 'workouts');
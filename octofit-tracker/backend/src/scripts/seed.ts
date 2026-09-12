import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        password: 'password123',
        profile: { age: 16, fitnessLevel: 'intermediate' },
      },
      {
        name: 'Jamie Lee',
        email: 'jamie.lee@example.com',
        password: 'password123',
        profile: { age: 15, fitnessLevel: 'beginner' },
      },
      {
        name: 'Taylor Smith',
        email: 'taylor.smith@example.com',
        password: 'password123',
        profile: { age: 17, fitnessLevel: 'advanced' },
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'A team focused on endurance and outdoor activity.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Power Pack',
        description: 'A team building strength through consistent training.',
        members: [users[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'running',
        durationMinutes: 30,
        points: 30,
        date: new Date('2026-09-08T16:00:00Z'),
      },
      {
        user: users[1]._id,
        type: 'walking',
        durationMinutes: 45,
        points: 22,
        date: new Date('2026-09-09T16:00:00Z'),
      },
      {
        user: users[2]._id,
        type: 'strength',
        durationMinutes: 40,
        points: 40,
        date: new Date('2026-09-10T16:00:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 30, rank: 1 },
      { user: users[2]._id, team: teams[1]._id, points: 40, rank: 2 },
      { user: users[1]._id, team: teams[0]._id, points: 22, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Steady Starter Run',
        description: 'A comfortable run to build aerobic endurance.',
        difficulty: 'beginner',
        durationMinutes: 20,
        activityType: 'running',
      },
      {
        title: 'Core and Strength Circuit',
        description: 'A balanced bodyweight circuit for a stronger core.',
        difficulty: 'intermediate',
        durationMinutes: 25,
        activityType: 'strength',
      },
      {
        title: 'Long Distance Challenge',
        description: 'A sustained run for advanced endurance training.',
        difficulty: 'advanced',
        durationMinutes: 45,
        activityType: 'running',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

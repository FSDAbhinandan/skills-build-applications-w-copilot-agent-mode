import { Router, type Request, type Response } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

const router = Router();

const sendError = (response: Response, error: unknown) => {
  if (error instanceof Error && error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
    return;
  }

  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
};

const handle = (action: (request: Request, response: Response) => Promise<void>) =>
  (request: Request, response: Response) => {
    action(request, response).catch((error: unknown) => sendError(response, error));
  };

const queryString = (value: unknown) => (typeof value === 'string' ? value : undefined);

router.get('/users', handle(async (_request, response) => {
  const users = await User.find().select('-password').sort({ name: 1 }).lean();
  response.json(users);
}));

router.post('/users', handle(async (request, response) => {
  const user = await User.create(request.body);
  const { password: _password, ...safeUser } = user.toObject();
  response.status(201).json(safeUser);
}));

router.get('/teams', handle(async (_request, response) => {
  const teams = await Team.find().populate('members', '-password').sort({ name: 1 }).lean();
  response.json(teams);
}));

router.post('/teams', handle(async (request, response) => {
  const team = await Team.create(request.body);
  response.status(201).json(await team.populate('members', '-password'));
}));

router.get('/activities', handle(async (request, response) => {
  const user = queryString(request.query.user);
  const filter = user ? { user } : {};
  const activities = await Activity.find(filter).populate('user', '-password').sort({ date: -1 }).lean();
  response.json(activities);
}));

router.post('/activities', handle(async (request, response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json(await activity.populate('user', '-password'));
}));

router.get('/leaderboard', handle(async (_request, response) => {
  const leaderboard = await Leaderboard.find()
    .populate('user', '-password')
    .populate('team')
    .sort({ rank: 1 })
    .lean();
  response.json(leaderboard);
}));

router.get('/workouts', handle(async (request, response) => {
  const difficulty = queryString(request.query.difficulty);
  const workoutsQuery = Workout.find();
  if (difficulty) {
    workoutsQuery.where('difficulty', difficulty);
  }
  const workouts = await workoutsQuery.sort({ difficulty: 1, title: 1 }).lean();
  response.json(workouts);
}));

router.use((request, response) => {
  response.status(404).json({ error: `Route not found: ${request.method} ${request.path}` });
});

export default router;
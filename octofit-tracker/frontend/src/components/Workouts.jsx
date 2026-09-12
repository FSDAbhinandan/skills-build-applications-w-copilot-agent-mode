import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';
import { ResourceState } from './ResourceState.jsx';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Suggested for you</p><h1>Workouts</h1></div><span className="section-count">{workouts.length} plans</span></div>
    <ResourceState {...state} emptyMessage="Your next workout will appear here."><div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.title}><span className={`difficulty difficulty-${workout.difficulty}`}>{workout.difficulty}</span><h2>{workout.title}</h2><p>{workout.description}</p><footer><span>{workout.durationMinutes} min</span><span>{workout.activityType}</span></footer></article>)}</div></ResourceState>
  </section>;
}
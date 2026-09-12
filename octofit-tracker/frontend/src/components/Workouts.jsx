import { useEffect, useState } from 'react';
import { apiOrigin, getItems } from '../lib/api.js';
import { ResourceState } from './ResourceState.jsx';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetch(`${apiOrigin}/api/workouts/`).then((response) => { if (!response.ok) throw new Error(`Unable to load workouts (${response.status})`); return response.json(); }).then((payload) => setWorkouts(getItems(payload))).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Suggested for you</p><h1>Workouts</h1></div><span className="section-count">{workouts.length} plans</span></div>
    <ResourceState {...state} emptyMessage="Your next workout will appear here."><div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.title}><span className={`difficulty difficulty-${workout.difficulty}`}>{workout.difficulty}</span><h2>{workout.title}</h2><p>{workout.description}</p><footer><span>{workout.durationMinutes} min</span><span>{workout.activityType}</span></footer></article>)}</div></ResourceState>
  </section>;
}
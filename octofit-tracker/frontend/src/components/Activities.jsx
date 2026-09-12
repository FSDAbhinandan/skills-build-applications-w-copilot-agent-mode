import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';
import { ResourceState } from './ResourceState.jsx';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection('activities')
      .then((items) => setActivities(items))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading">
        <div><p className="eyebrow">Movement log</p><h1>Activities</h1></div>
        <span className="section-count">{activities.length} logged</span>
      </div>
      <ResourceState {...state} emptyMessage="Log your first activity to start building momentum.">
        <div className="activity-list">
          {activities.map((activity) => (
            <article className="activity-row" key={activity._id || `${activity.type}-${activity.date}`}>
              <div className={`activity-mark activity-${activity.type}`}>{activity.type?.slice(0, 1).toUpperCase()}</div>
              <div className="row-main"><strong>{activity.type}</strong><span>{activity.user?.name || 'OctoFit member'}</span></div>
              <div className="row-detail"><strong>{activity.durationMinutes} min</strong><span>{new Date(activity.date).toLocaleDateString()}</span></div>
              <div className="points">+{activity.points}<small> pts</small></div>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  );
}
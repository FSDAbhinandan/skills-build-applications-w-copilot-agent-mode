import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';
import { ResourceState } from './ResourceState.jsx';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchCollection('leaderboard').then(setEntries).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return <section className="page-section">
    <div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1></div><span className="section-count">This season</span></div>
    <ResourceState {...state} emptyMessage="The leaderboard is waiting for its first points.">
      <div className="leaderboard-list">{entries.map((entry, index) => <article className={`leader-row ${index === 0 ? 'leader-first' : ''}`} key={entry._id || entry.user?._id}>
        <span className="rank">{entry.rank || index + 1}</span><div className="avatar">{entry.user?.name?.slice(0, 1) || '?'}</div><div className="row-main"><strong>{entry.user?.name || 'OctoFit member'}</strong><span>{entry.team?.name || 'Independent'}</span></div><strong className="leader-points">{entry.points} <small>pts</small></strong>
      </article>)}</div>
    </ResourceState>
  </section>;
}
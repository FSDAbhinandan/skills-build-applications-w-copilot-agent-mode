import { useEffect, useState } from 'react';
import { apiOrigin, getItems } from '../lib/api.js';
import { ResourceState } from './ResourceState.jsx';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetch(`${apiOrigin}/api/users/`).then((response) => { if (!response.ok) throw new Error(`Unable to load users (${response.status})`); return response.json(); }).then((payload) => setUsers(getItems(payload))).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Your crew</p><h1>Members</h1></div><span className="section-count">{users.length} active</span></div>
    <ResourceState {...state} emptyMessage="Invite a teammate to get started."><div className="user-grid">{users.map((user) => <article className="user-card" key={user._id || user.email}><div className="avatar avatar-large">{user.name?.slice(0, 1)}</div><div><h2>{user.name}</h2><p>{user.profile?.fitnessLevel || 'New member'}</p></div><span className="user-age">{user.profile?.age ? `${user.profile.age} yrs` : ''}</span></article>)}</div></ResourceState>
  </section>;
}
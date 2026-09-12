import { useEffect, useState } from 'react';
import { apiOrigin, getItems } from '../lib/api.js';
import { ResourceState } from './ResourceState.jsx';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetch(`${apiOrigin}/api/teams/`).then((response) => { if (!response.ok) throw new Error(`Unable to load teams (${response.status})`); return response.json(); }).then((payload) => setTeams(getItems(payload))).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div><span className="section-count">{teams.length} teams</span></div>
    <ResourceState {...state} emptyMessage="Create a team and make the next goal a group effort."><div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id || team.name}><div className="team-card-top"><span className="team-symbol">{team.name?.slice(0, 1)}</span><span className="member-count">{team.members?.length || 0} members</span></div><h2>{team.name}</h2><p>{team.description}</p><div className="member-stack">{team.members?.slice(0, 4).map((member, index) => <span key={member._id || index} title={member.name}>{member.name?.slice(0, 1)}</span>)}</div></article>)}</div></ResourceState>
  </section>;
}
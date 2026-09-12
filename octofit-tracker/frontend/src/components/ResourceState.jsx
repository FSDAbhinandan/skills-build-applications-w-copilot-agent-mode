export function ResourceState({ loading, error, emptyMessage = 'No records yet.', children }) {
  if (loading) return <div className="state-message">Loading your tracker...</div>;
  if (error) return <div className="state-message state-error">{error}</div>;
  if (!children) return <div className="state-message">{emptyMessage}</div>;
  return children;
}
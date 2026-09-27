export default function FeatureCard({ icon, title, text }) {
  return (
    <article className="card feature-card">
      <div className="feature-icon" aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

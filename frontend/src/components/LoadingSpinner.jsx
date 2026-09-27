export default function LoadingSpinner({ size = 20, label = 'Loading' }) {
  return (
    <span
      className="spinner"
      style={{ width: size, height: size }}
      role="status"
      aria-label={label}
    />
  );
}

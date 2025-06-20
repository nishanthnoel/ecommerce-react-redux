// Spinner.jsx
export default function LoaderSpinner() {
  return (
    <div className="sk-chase relative w-10 h-10 animate-sk-chase">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`sk-chase-dot absolute left-0 top-0 w-full h-full animate-sk-chase-dot`}
          style={{ animationDelay: `${-1.1 + i * 0.1}s` }}
        >
          <div
            className="absolute w-1/4 h-1/4 bg-white rounded-full animate-sk-chase-dot-before"
            style={{ animationDelay: `${-1.1 + i * 0.1}s` }}
          />
        </div>
      ))}
    </div>
  );
}

import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-container" id="loader">
      {/* Capital Gains Skeleton */}
      <div className="skeleton-cards">
        <div className="skeleton-card">
          <div className="skeleton-line skeleton-line--title"></div>
          <div className="skeleton-line skeleton-line--row"></div>
          <div className="skeleton-line skeleton-line--row"></div>
          <div className="skeleton-line skeleton-line--row"></div>
          <div className="skeleton-line skeleton-line--total"></div>
        </div>
        <div className="skeleton-card skeleton-card--blue">
          <div className="skeleton-line skeleton-line--title"></div>
          <div className="skeleton-line skeleton-line--row"></div>
          <div className="skeleton-line skeleton-line--row"></div>
          <div className="skeleton-line skeleton-line--row"></div>
          <div className="skeleton-line skeleton-line--total"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="skeleton-table">
        <div className="skeleton-line skeleton-line--table-title"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton-table-row">
            <div className="skeleton-line skeleton-line--checkbox"></div>
            <div className="skeleton-line skeleton-line--asset"></div>
            <div className="skeleton-line skeleton-line--cell"></div>
            <div className="skeleton-line skeleton-line--cell"></div>
            <div className="skeleton-line skeleton-line--cell"></div>
            <div className="skeleton-line skeleton-line--cell"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

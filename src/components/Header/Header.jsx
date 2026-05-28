import "./Header.css";

export default function Header() {
  return (
    <header className="app-header" id="app-header">
      <div className="header-left">
        <h1 className="header-title">Tax Optimisation</h1>
        <a href="#how-it-works" className="header-link" id="how-it-works-link">
          How it works?
        </a>
      </div>
    </header>
  );
}

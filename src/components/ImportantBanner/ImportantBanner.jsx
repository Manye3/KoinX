import { useState } from "react";
import "./ImportantBanner.css";

const disclaimers = [
  {
    title: "Price Source Disclaimer:",
    text: 'Please note that the current price of your coins may differ from the prices listed on specific exchanges. This is because we use <strong>CoinGecko</strong> as our default price source for certain exchanges, rather than fetching prices directly from the exchange.',
  },
  {
    title: "Country-specific Availability:",
    text: 'Tax loss harvesting may <strong>not be supported in all countries</strong>. We strongly recommend consulting your local tax advisor or accountant before performing any related actions on your exchange.',
  },
  {
    title: "Utilization of Losses:",
    text: 'Tax loss harvesting typically allows you to offset capital gains. However, if you have <strong>zero or no applicable crypto capital gains</strong>, the usability of these harvested losses may be limited. Kindly confirm with your tax advisor how such losses can be applied in your situation.',
  },
];

export default function ImportantBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="important-banner" id="important-banner">
      <div
        className="important-banner__header"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="important-banner__header-left">
          <svg
            className="important-banner__info-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span className="important-banner__title">
            Important Notes And Disclaimers
          </span>
        </div>
        <div className="important-banner__actions">
          <button
            className="important-banner__close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            aria-label="Close banner"
            id="close-banner-btn"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <svg
            className={`important-banner__chevron ${isExpanded ? "important-banner__chevron--up" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div
        className={`important-banner__content ${isExpanded ? "important-banner__content--expanded" : ""}`}
      >
        <ul className="important-banner__list">
          {disclaimers.map((item, index) => (
            <li key={index} className="important-banner__item">
              <strong>{item.title}</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: item.text }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

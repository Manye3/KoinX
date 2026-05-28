import { useHarvesting } from "../../context/HarvestingContext";
import { formatCurrency } from "../../utils/formatters";
import "./CapitalGainsCards.css";

export default function CapitalGainsCards() {
  const { preHarvesting, afterHarvesting, savings } = useHarvesting();

  return (
    <div className="capital-gains-container">
      {/* Pre Harvesting Card */}
      <div className="gains-card gains-card--pre">
        <h2 className="gains-card__title">Pre Harvesting</h2>
        <div className="gains-card__table">
          <div className="gains-card__header-row">
            <div className="gains-card__label"></div>
            <div className="gains-card__col-header">Short-term</div>
            <div className="gains-card__col-header">Long-term</div>
          </div>
          <div className="gains-card__row">
            <div className="gains-card__label">Profits</div>
            <div className="gains-card__value">
              {formatCurrency(preHarvesting.stcg.profits)}
            </div>
            <div className="gains-card__value">
              {formatCurrency(preHarvesting.ltcg.profits)}
            </div>
          </div>
          <div className="gains-card__row">
            <div className="gains-card__label">Losses</div>
            <div className="gains-card__value">
              {formatCurrency(preHarvesting.stcg.losses)}
            </div>
            <div className="gains-card__value">
              {formatCurrency(preHarvesting.ltcg.losses)}
            </div>
          </div>
          <div className="gains-card__row gains-card__row--net">
            <div className="gains-card__label">Net Capital Gains</div>
            <div className="gains-card__value">
              {formatCurrency(preHarvesting.stcg.net)}
            </div>
            <div className="gains-card__value">
              {formatCurrency(preHarvesting.ltcg.net)}
            </div>
          </div>
        </div>
        <div className="gains-card__realised">
          <span className="gains-card__realised-label">
            Realised Capital Gains:
          </span>
          <span className="gains-card__realised-value">
            {formatCurrency(preHarvesting.realisedGains)}
          </span>
        </div>
      </div>

      {/* After Harvesting Card */}
      <div className="gains-card gains-card--after">
        <h2 className="gains-card__title gains-card__title--after">
          After Harvesting
        </h2>
        <div className="gains-card__table">
          <div className="gains-card__header-row">
            <div className="gains-card__label"></div>
            <div className="gains-card__col-header">Short-term</div>
            <div className="gains-card__col-header">Long-term</div>
          </div>
          <div className="gains-card__row">
            <div className="gains-card__label">Profits</div>
            <div className="gains-card__value">
              {formatCurrency(afterHarvesting.stcg.profits)}
            </div>
            <div className="gains-card__value">
              {formatCurrency(afterHarvesting.ltcg.profits)}
            </div>
          </div>
          <div className="gains-card__row">
            <div className="gains-card__label">Losses</div>
            <div className="gains-card__value">
              {formatCurrency(afterHarvesting.stcg.losses)}
            </div>
            <div className="gains-card__value">
              {formatCurrency(afterHarvesting.ltcg.losses)}
            </div>
          </div>
          <div className="gains-card__row gains-card__row--net">
            <div className="gains-card__label">Net Capital Gains</div>
            <div className="gains-card__value">
              {formatCurrency(afterHarvesting.stcg.net)}
            </div>
            <div className="gains-card__value">
              {formatCurrency(afterHarvesting.ltcg.net)}
            </div>
          </div>
        </div>
        <div className="gains-card__realised">
          <span className="gains-card__realised-label">
            Effective Capital Gains:
          </span>
          <span className="gains-card__realised-value">
            {formatCurrency(afterHarvesting.effectiveGains)}
          </span>
        </div>
        {savings > 0 && (
          <div className="gains-card__savings">
            <span className="gains-card__savings-icon">🎉</span>
            <span>
              Your taxable capital gains are reduced by:{" "}
              <strong>{formatCurrency(savings)}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

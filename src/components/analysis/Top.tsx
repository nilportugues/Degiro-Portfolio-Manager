import { useState } from "react";

interface Props {
  selectedTab: number;
  updateSelectedTab: (tab: number) => void;
}

export default function ExampleComponent(props: Props) {
  const { selectedTab, updateSelectedTab } = props;

  const openPositionsLength = Object.keys($store.state.openPositions).length;
  const realizedPl = $store.state.calculated.realizedPl.toFixed(2);
  const commissionsSum = $store.state.calculated.commissions.sum.toFixed(2);
  const currency = $store.state.currency;

  const [isSelectedTab0, setIsSelectedTab0] = useState(selectedTab === 0);
  const [isSelectedTab1, setIsSelectedTab1] = useState(selectedTab === 1);
  const [isSelectedTab2, setIsSelectedTab2] = useState(selectedTab === 2);

  const handleTabClick = (tab: number) => {
    updateSelectedTab(tab);

    switch (tab) {
      case 0:
        setIsSelectedTab0(true);
        setIsSelectedTab1(false);
        setIsSelectedTab2(false);
        break;
      case 1:
        setIsSelectedTab0(false);
        setIsSelectedTab1(true);
        setIsSelectedTab2(false);
        break;
      case 2:
        setIsSelectedTab0(false);
        setIsSelectedTab1(false);
        setIsSelectedTab2(true);
        break;
    }
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      <div className="col">
        <div
          className={`card ${isSelectedTab0 ? "selected" : ""}`}
          onClick={() => handleTabClick(0)}
        >
          <div className="card-title">
            <span className="badge bg-info text-dark">
              <i className="bi bi-card-checklist"></i>
            </span>
          </div>
          <div className="card-body">
            <p className="card-text">{openPositionsLength} Open Positions</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className={`card ${isSelectedTab1 ? "selected" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          <div className="card-title">
            <span className="badge bg-success text-dark">
              <i className="bi bi-currency-euro"></i>
            </span>
          </div>
          <div className="card-body">
            <p className="card-text">
              {realizedPl}
              {currency} Profit/Loss
            </p>
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className={`card ${isSelectedTab2 ? "selected" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          <div className="card-title">
            <span className="badge bg-warning text-dark">
              <i className="bi bi-currency-exchange"></i>
            </span>
          </div>
          <div className="card-body">
            <p className="card-text">
              {commissionsSum}
              {currency} commissions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

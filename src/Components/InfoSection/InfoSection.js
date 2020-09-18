import React, { useState } from "react";
import BubbleSortCode from "./BubbleSortCode";
import SelectionSortCode from "./SelectionSortCode";
import InsertionSortCode from "./InsertionSortCode";
import "./CodeStyles.css";

export default function InfoSection() {
  const [currentView, setCurrentView] = useState("Bubble");

  const View = () => {
    if (currentView === "Insertion") {
      return <InsertionSortCode />;
    } else if (currentView === "Selection") {
      return <SelectionSortCode />;
    } else {
      return <BubbleSortCode />;
    }
  };
  return (
    <div className="info-section">
      <div className="sorting-name-container">
        <button
          className="button"
          onClick={() => {
            setCurrentView("Bubble");
          }}
        >
          Bubble Sort
        </button>
        <button className="button" onClick={() => setCurrentView("Insertion")}>
          Insertion Sort
        </button>
        <button className="button" onClick={() => setCurrentView("Selection")}>
          Selection Sort
        </button>
      </div>
      <div className="code-container">
        <View />
      </div>
    </div>
  );
}

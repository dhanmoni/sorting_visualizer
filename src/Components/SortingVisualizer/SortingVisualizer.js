import React, { useState, useEffect } from "react";
import "./SortingVisualizerStyles.css";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [maxlength, setLength] = useState(100);
  const [maxHeight, setHeightNum] = useState(500);
  useEffect(() => {
    resetArray();
  }, []);
  const resetArray = () => {
    setArray([]);
    for (let i = 0; i < maxlength; i++) {
      const randomNum = getRandomInt(5, maxHeight);
      setArray((array) => [...array, randomNum]);
    }
    console.log(array);
  };
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return (
    <div className="main">
      <div className="side-bar">
        <div className="side-bar-container">
          <h3>Sorting Visualizer</h3>
          <div className="speed">Speed:</div>

          <div className="size">Size:</div>
          <button className="button" onClick={resetArray}>
            Generate new array
          </button>
          <button className="button">Merge Sort</button>
          <button className="button">Bubble Sort</button>
          <button className="button">Quick Sort</button>
        </div>
      </div>
      <div className="visualizer-area">
        <div className="array-bar-container">
          {array.map((val, idx) => {
            return (
              <div
                key={idx}
                className="array-bar"
                style={{ height: `${val}px`, width: 5 }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./SortingVisualizerStyles.css";
import { mergeSort as animateMergeSort } from "../../Algorithms/MergeSortAlgorithm/MergeSort";
import { doBubbleSort } from "../SortingFunctions/BubbleSort";
import {
  getRandomInt,
  increaseArrayLength,
  increaseSpeed,
  decreaseArrayLength,
  decreaseSpeed,
} from "../HelperFunctions/HelperFunctions";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [maxlength, setLength] = useState(50);
  const [maxHeight, setHeightNum] = useState(500);
  const [speed, setSpeed] = useState(200);
  const [barWidth, setBarWidth] = useState(5);
  const [isSorting, setIsSorting] = useState(false);
  const [title, setTitle] = useState(false);

  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    let buttons = document.getElementsByClassName("toggleButton");
    if (isSorting) {
      Array.from(buttons).forEach((button) => {
        button.style.display = "none";
      });
    } else {
      Array.from(buttons).forEach((button) => {
        button.style.display = "inline";
      });
    }
  }, [isSorting]);

  const resetArray = () => {
    setArray([]);
    setTitle("");
    setIsSorting(false);
    for (let i = 0; i < maxlength; i++) {
      const randomNum = getRandomInt(5, maxHeight);
      setArray((array) => [...array, randomNum]);
    }
    if (maxlength > 50) setBarWidth(5);
    if (maxlength < 50) setBarWidth(15);
    if (maxlength < 20) setBarWidth(20);
  };

  const callIncreaseSpeed = (data) => {
    increaseSpeed({
      data,
      speed,
      setSpeed,
    });
  };
  const callDecreaseSpeed = (data) => {
    decreaseSpeed({
      data,
      speed,
      setSpeed,
    });
  };
  const callIncreaseArrayLength = (data) => {
    increaseArrayLength({
      data,
      maxlength,
      setLength,
    });
  };

  const callDecreaseArrayLength = (data) => {
    decreaseArrayLength({
      data,
      maxlength,
      setLength,
    });
  };

  const callMergeSort = () => {
    setIsSorting(true);
    setTitle("Merge Sort");
    const merge = animateMergeSort(array);
    //setArray(merge);
    array.splice(0, array.length, ...merge);
  };

  const callBubbleSort = () => {
    setIsSorting(true);
    const arrayBars = document.getElementsByClassName("array-bar");
    doBubbleSort({
      setTitle,
      array,
      arrayBars,
      speed,
      setIsSorting,
    });
  };

  const callSelectionSort = () => {
    setIsSorting(true);
    const arrayBars = document.getElementsByClassName("array-bar");
  };

  return (
    <div className="main">
      <div className="side-bar">
        <div className="side-bar-container">
          <h3>Sorting Visualizer</h3>
          <div className="speed">
            <h4>Speed: </h4>
            <div>
              <button
                className="toggleButton"
                onClick={() => callDecreaseSpeed("twice")}
              >
                --
              </button>
              <button
                className="toggleButton"
                onClick={() => callDecreaseSpeed("once")}
              >
                -
              </button>
              <span>{speed}</span>
              <button
                className="toggleButton"
                onClick={() => callIncreaseSpeed("once")}
              >
                +
              </button>
              <button
                className="toggleButton"
                onClick={() => callIncreaseSpeed("twice")}
              >
                ++
              </button>
            </div>
          </div>
          <div className="size">
            <h4>Size of Array: </h4>
            <div>
              <button
                className="toggleButton"
                onClick={() => callDecreaseArrayLength("twice")}
              >
                --
              </button>
              <button
                className="toggleButton"
                onClick={() => callDecreaseArrayLength("once")}
              >
                -
              </button>
              <span>{maxlength}</span>
              <button
                className="toggleButton"
                onClick={() => callIncreaseArrayLength("once")}
              >
                +
              </button>
              <button
                className="toggleButton"
                onClick={() => callIncreaseArrayLength("twice")}
              >
                ++
              </button>
            </div>
          </div>
          <button className="button generate" onClick={resetArray}>
            Generate new array
          </button>

          <button className="button toggleButton" onClick={callBubbleSort}>
            Bubble Sort
          </button>

          <button className="button toggleButton" onClick={callSelectionSort}>
            Selection Sort
          </button>
          <button className="button toggleButton" onClick={callMergeSort}>
            Merge Sort
          </button>
        </div>
      </div>
      <div className="visualizer-area">
        <div className="array-bar-container">
          {array.map((val, idx) => {
            return (
              <div
                key={idx}
                className="array-bar"
                style={{ height: `${val}px`, width: `${barWidth}px` }}
              ></div>
            );
          })}
        </div>
        <div className="title">
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./SortingVisualizerStyles.css";
import { doBubbleSort } from "../SortingFunctions/BubbleSort";
import { doSelectionSort } from "../SortingFunctions/SelectionSort";
import { doInsertionSort } from "../SortingFunctions/InsertionSort";
import {
  getRandomInt,
  increaseArrayLength,
  increaseSpeed,
  decreaseArrayLength,
  decreaseSpeed,
} from "../HelperFunctions/HelperFunctions";
import Sidebar from "../Sidebar/Sidebar";

export default function SortingVisualizer() {
  let [array, setArray] = useState([]);
  const [maxlength, setLength] = useState(75);
  const [maxHeight, setMaxHeight] = useState(400);
  const [speed, setSpeed] = useState(300);
  const [barWidth, setBarWidth] = useState(5);
  const [isSorting, setIsSorting] = useState(false);
  const [title, setTitle] = useState("");

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
      // const randomNum = [100, 70, 40, 10, 80, 33];
      // setArray(randomNum);
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

  const callBubbleSort = () => {
    setIsSorting(true);
    setTitle("Bubble Sort");
    const arrayBars = document.getElementsByClassName("array-bar");
    doBubbleSort({
      array,
      arrayBars,
      speed,
      setIsSorting,
    });
  };

  const callSelectionSort = async () => {
    setIsSorting(true);
    setTitle("Selection Sort");
    const arrayBars = document.getElementsByClassName("array-bar");
    doSelectionSort({
      array,
      arrayBars,
      speed,
      setIsSorting,
    });
  };

  const callInsertionSort = async () => {
    setIsSorting(true);
    setTitle("Insertion Sort");
    const arrayBars = document.getElementsByClassName("array-bar");
    doInsertionSort({
      arrayBars,
      speed,
      setIsSorting,
    });
  };

  const toggleBar = () => {
    const sideBar = document.getElementsByClassName("side-bar");
    const visualizerArea = document.getElementsByClassName("visualizer-area");

    if (visualizerArea[0].style.width !== `${100}vw`) {
      sideBar[0].style.marginLeft = `${-25}vw`;
      visualizerArea[0].style.width = `${100}vw`;
    } else {
      sideBar[0].style.marginLeft = `${0}vw`;
      visualizerArea[0].style.width = `${75}vw`;
    }
  };

  return (
    <div className="main">
      <Sidebar
        callDecreaseSpeed={callDecreaseSpeed}
        callIncreaseSpeed={callIncreaseSpeed}
        callDecreaseArrayLength={callDecreaseArrayLength}
        callIncreaseArrayLength={callIncreaseArrayLength}
        resetArray={resetArray}
        callBubbleSort={callBubbleSort}
        callInsertionSort={callInsertionSort}
        callSelectionSort={callSelectionSort}
        speed={speed}
        maxlength={maxlength}
        isSorting={isSorting}
      />
      <div className="visualizer-area">
        <div className="header">
          <i className="material-icons" onClick={toggleBar}>
            menu
          </i>
        </div>
        <div className="array-bar-container">
          {array.map((val, idx) => {
            return (
              <div
                key={idx}
                className="array-bar"
                style={{
                  height: `${val}px`,
                  width: `${barWidth}px`,
                }}
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

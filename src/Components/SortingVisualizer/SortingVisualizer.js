import React, { useState, useEffect } from "react";
import "./SortingVisualizerStyles.css";
import { mergeSort as animateMergeSort } from "../../Algorithms/MergeSortAlgorithm/MergeSort";
import { insertionSort as animateInsertionSort } from "../../Algorithms/InsertionSort/InsertionSort";
import { doBubbleSort } from "../SortingFunctions/BubbleSort";
import { doSelectionSort } from "../SortingFunctions/SelectionSort";
import {
  getRandomInt,
  increaseArrayLength,
  increaseSpeed,
  decreaseArrayLength,
  decreaseSpeed,
} from "../HelperFunctions/HelperFunctions";
import { GREEN, PURPLE, TEAL } from "../HelperFunctions/Colors";

export default function SortingVisualizer() {
  let [array, setArray] = useState([]);
  const [maxlength, setLength] = useState(20);
  const [maxHeight, setHeightNum] = useState(500);
  const [speed, setSpeed] = useState(300);
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
      // const randomNum = [20, 15, 78, 31, 43, 10];
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

  const callMergeSort = () => {
    setIsSorting(true);
    setTitle("Merge Sort");
    const merge = animateMergeSort(array);
    //setArray(merge);
    array.splice(0, array.length, ...merge);
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
    //const insertion = animateInsertionSort(array);
    const arrayBars = document.getElementsByClassName("array-bar");
    //console.log(insertion);

    for (let i = 0; i < arrayBars.length; i++) {
      console.log("i=", { i });
      let compareVal = parseInt(arrayBars[i].style.height);
      let compareStyle = arrayBars[i].style;
      let prevVal;
      let prevStyle;
      if (i !== 0) {
        prevVal = parseInt(arrayBars[i - 1].style.height);
        prevStyle = arrayBars[i - 1].style;
      } else {
        prevVal = 0;
      }
      compareStyle.backgroundColor = GREEN;
      console.log("before loop=", { i, compareVal, prevVal });
      await new Promise((resolve) => setTimeout(resolve, `${speed}`));

      for (let j = i - 1; j >= 0 && compareVal < prevVal; j--) {
        console.log("i, j=", { i, j });
        console.log("Inside loop=", { j, compareVal, prevVal });
        compareStyle.height = `${prevVal}px`;
        prevStyle.height = `${compareVal}px`;

        console.log("swapped!--------");

        compareStyle.backgroundColor = TEAL;
        compareStyle = prevStyle;
        compareStyle.backgroundColor = GREEN;
        console.log("prev value changed", prevVal);

        if (j !== 0) {
          prevVal = parseInt(arrayBars[j - 1].style.height);
          prevStyle = arrayBars[j - 1].style;
        } else {
          prevVal = parseInt(arrayBars[j].style.height);
          prevStyle = arrayBars[j].style;
        }
        await new Promise((resolve) => setTimeout(resolve, `${speed}`));
      }
      compareStyle.backgroundColor = TEAL;
    }
  };

  /*
    for (let i = 0; i < arrayBars.length; i++) {
      const [compareIdx, prevIdx, currentVal] = insertion[i];

      let compareVal = parseInt(arrayBars[compareIdx].style.height);
      let compareStyle = arrayBars[compareIdx].style;

      let prevVal = parseInt(arrayBars[prevIdx].style.height);
      let prevStyle = arrayBars[prevIdx].style;

      // let currentVal = parseInt(arrayBars[currentIdx].style.height);
      // let currentStyle = arrayBars[currentIdx].style;

      if (currentVal < prevVal) {
        console.log("less", { compareVal, prevVal, currentVal });
        compareStyle.height = `${prevVal}px`;
        prevStyle.height = `${compareVal}px`;

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
   */

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
          <button className="button toggleButton" onClick={callInsertionSort}>
            Insertion Sort
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

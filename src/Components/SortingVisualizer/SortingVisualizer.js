import React, { useState, useEffect } from "react";
import "./SortingVisualizerStyles.css";
import { mergeSort as animateMergeSort } from "../../Algorithms/MergeSortAlgorithm/MergeSort";
import { insertionSort as animateInsertionSort } from "../../Algorithms/InsertionSort/InsertionSort";
import { doBubbleSort } from "../SortingFunctions/BubbleSort";
import { selectionSort as animateSelectionSort } from "../../Algorithms/SelectionSort/SelectionSort";
import {
  getRandomInt,
  increaseArrayLength,
  increaseSpeed,
  decreaseArrayLength,
  decreaseSpeed,
} from "../HelperFunctions/HelperFunctions";

const GREEN = "#68d751";
const PURPLE = "#6179e5";
const TEAL = "#35f3e0";
const RED = "#ffa8a4";

export default function SortingVisualizer() {
  let [array, setArray] = useState([]);
  const [maxlength, setLength] = useState(5);
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
      // const randomNum = [20, 78, 31, 15, 43, 10];
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
    const arrayBars = document.getElementsByClassName("array-bar");
    doBubbleSort({
      setTitle,
      array,
      arrayBars,
      speed,
      setIsSorting,
    });
  };

  const callSelectionSort = async () => {
    setIsSorting(true);
    const selection = animateSelectionSort(array);
    const arrayBars = document.getElementsByClassName("array-bar");
    console.log(selection);
    let minimumVal = parseInt(arrayBars[0].style.height);
    let minimumStyle = arrayBars[0].style;
    for (let i = 0; i < selection.length; i++) {
      const [barOneIdx, barTwoIdx] = selection[i];
      let barOneVal = parseInt(arrayBars[barOneIdx].style.height);
      let barTwoVal = parseInt(arrayBars[barTwoIdx].style.height);
      let barOneStyle = arrayBars[barOneIdx].style;
      let barTwoStyle = arrayBars[barTwoIdx].style;
      console.log("index=", { barOneIdx, barTwoIdx, barOneVal, barTwoVal });

      barOneStyle.backgroundColor = PURPLE;

      barTwoStyle.backgroundColor = GREEN;

      console.log({ barOneVal, barTwoVal, minimumVal, i });
      if (barTwoVal < minimumVal) {
        barTwoStyle.backgroundColor = RED;
        if (minimumVal !== barOneVal) {
          minimumStyle.backgroundColor = TEAL;
        }
        minimumVal = barTwoVal;
        minimumStyle = barTwoStyle;
        console.log("new minimum", minimumVal);

        await new Promise((resolve) => setTimeout(resolve, `${speed}`));
      } else {
        console.log("hello", barTwoVal);
        await new Promise((resolve) => setTimeout(resolve, `${speed}`));
        barTwoStyle.backgroundColor = TEAL;
      }
      if (barTwoIdx === arrayBars.length - 1) {
        if (minimumVal < barOneVal) {
          barOneStyle.height = `${minimumVal}px`;
          minimumStyle.height = `${barOneVal}px`;
        }
        barOneStyle.backgroundColor = TEAL;
        barTwoStyle.backgroundColor = TEAL;
        minimumStyle.backgroundColor = TEAL;
        minimumVal = parseInt(arrayBars[barOneIdx + 1].style.height);
        minimumStyle = arrayBars[barOneIdx + 1].style;
        await new Promise((resolve) => setTimeout(resolve, `${speed}`));
      }
    }
  };

  const callInsertionSort = async () => {
    setIsSorting(true);
    const insertion = animateInsertionSort(array);
    const arrayBars = document.getElementsByClassName("array-bar");

    console.log(insertion);
    for (let i = 0; i < insertion.length; i++) {
      const [barOneIdx, barTwoIdx, currentVal] = insertion[i];
      console.log({ barOneIdx, barTwoIdx, currentVal });
      let barOneVal = parseInt(arrayBars[barOneIdx].style.height);
      let barTwoVal = parseInt(arrayBars[barTwoIdx].style.height);
      let barOneStyle = arrayBars[barOneIdx].style;
      let barTwoStyle = arrayBars[barTwoIdx].style;
      console.log("index=", { barOneIdx, barTwoIdx, barOneVal, barTwoVal });

      // arrayBars[barTwoIdx + 1].style.height = parseInt(
      //   arrayBars[barTwoIdx].style.height
      // );
      // arrayBars[barTwoIdx].style.height = parseInt(
      //   arrayBars[currentVal].style.height
      // );

      // if (barOneVal < barTwoVal) {
      //   barOneStyle.backgroundColor = "#2ac46a";
      //   barTwoStyle.backgroundColor = "#2ac46a";
      //   await new Promise((resolve) => setTimeout(resolve, `${speed}`));
      //   barOneStyle.height = `${barTwoVal}px`;
      //   barTwoStyle.height = `${barOneVal}px`;
      //   await new Promise((resolve) => setTimeout(resolve, `${speed}`));
      //   // console.log("height=", barOneStyle.height, barTwoStyle.height);
      //   // console.log("swapped");
      //   barOneStyle.backgroundColor = "#35f3e0";
      //   barTwoStyle.backgroundColor = "#35f3e0";
      // }
    }
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

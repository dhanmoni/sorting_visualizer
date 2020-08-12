import React, { useState, useEffect } from "react";
import "./SortingVisualizerStyles.css";
import { mergeSort as animateMergeSort } from "../../Algorithms/MergeSortAlgorithm/MergeSort";
import { bubbleSort as animateBubbleSort } from "../../Algorithms/BubbleSortAlgorithm/BubbleSort";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [maxlength, setLength] = useState(75);
  const [maxHeight, setHeightNum] = useState(500);
  const [speed, setSpeed] = useState(400);
  const [barWidth, setBarWidth] = useState(5);
  const [isSorting, setIsSorting] = useState(false);
  const [isBubbleSorting, setIsBubbleSorting] = useState(false);
  const [title, setTitle] = useState(false);

  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    if (isBubbleSorting) {
      async function doBubbleSort() {
        setTitle("Bubble Sort");
        const bubbleAnimations = animateBubbleSort(array);
        //setArray(merge);
        //array.splice(0, array.length, ...bubble);
        //console.log(bubbleAnimations);
        for (let i = 0; i < bubbleAnimations.length; i++) {
          //console.log("1=", bubbleAnimations[i]);
          const arrayBars = document.getElementsByClassName("array-bar");
          const [barOneIdx, barTwoIdx] = bubbleAnimations[i];
          let barOneVal = parseInt(arrayBars[barOneIdx].style.height);
          let barTwoVal = parseInt(arrayBars[barTwoIdx].style.height);
          let barOneStyle = arrayBars[barOneIdx].style;
          let barTwoStyle = arrayBars[barTwoIdx].style;
          // console.log("index=", barOneIdx, barTwoIdx);
          // console.log("value=", barOneVal, barTwoVal);

          if (barOneVal > barTwoVal) {
            //console.log("greater", barOneVal, barTwoVal);
            barOneStyle.backgroundColor = "#2ac46a";
            barTwoStyle.backgroundColor = "#2ac46a";
            await new Promise((resolve) => setTimeout(resolve, `${speed}`));
            barOneStyle.height = `${barTwoVal}px`;
            barTwoStyle.height = `${barOneVal}px`;
            await new Promise((resolve) => setTimeout(resolve, `${speed}`));
            // console.log("height=", barOneStyle.height, barTwoStyle.height);
            // console.log("swapped");
            barOneStyle.backgroundColor = "#35f3e0";
            barTwoStyle.backgroundColor = "#35f3e0";
          } else {
            barOneStyle.backgroundColor = "#2ac46a";
            barTwoStyle.backgroundColor = "#2ac46a";
            await new Promise((resolve) => setTimeout(resolve, `${speed}`));
            // console.log("else");
            // console.log("no swapping");
            barOneStyle.backgroundColor = "#35f3e0";
            barTwoStyle.backgroundColor = "#35f3e0";
          }
          console.log(isBubbleSorting);
          if (isBubbleSorting == false) break;
        }
      }

      doBubbleSort();
    }
  }, [isBubbleSorting]);

  useEffect(() => {
    let buttons = document.getElementsByClassName("toggleButton");
    if (isSorting || isBubbleSorting) {
      Array.from(buttons).forEach((button) => {
        button.style.display = "none";
      });
    } else {
      Array.from(buttons).forEach((button) => {
        button.style.display = "inline";
      });
    }
  }, [isSorting, isBubbleSorting]);

  const resetArray = () => {
    setArray([]);
    setTitle("");
    setIsSorting(false);
    setIsBubbleSorting(false);
    for (let i = 0; i < maxlength; i++) {
      const randomNum = getRandomInt(5, maxHeight);
      setArray((array) => [...array, randomNum]);
    }
    if (maxlength > 50) setBarWidth(5);
    if (maxlength < 50) setBarWidth(15);
    if (maxlength < 20) setBarWidth(20);
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const decreaseSpeed = (data) => {
    if (speed < 1) return false;
    speed < 15
      ? setSpeed((prevCount) => prevCount - 1)
      : data === "twice"
      ? speed > 100
        ? setSpeed((prevCount) => prevCount - 100)
        : setSpeed((prevCount) => prevCount - 10)
      : setSpeed((prevCount) => prevCount - 10);
  };

  const increaseSpeed = (data) => {
    if (speed === 1000) return false;
    data === "twice"
      ? maxlength < 900
        ? setSpeed((prevCount) => prevCount + 100)
        : setSpeed((prevCount) => prevCount + 10)
      : setSpeed((prevCount) => prevCount + 10);
  };

  const decreaseArrayLength = (data) => {
    if (maxlength <= 5) return false;
    data === "twice"
      ? maxlength > 20
        ? setLength((prevLen) => prevLen - 20)
        : setLength((prevLen) => prevLen - 5)
      : setLength((prevLen) => prevLen - 5);
  };

  const increaseArrayLength = (data) => {
    if (maxlength >= 150) return false;
    data === "twice"
      ? maxlength < 130
        ? setLength((prevLen) => prevLen + 20)
        : setLength((prevLen) => prevLen + 5)
      : setLength((prevLen) => prevLen + 5);
  };

  const mergeSort = () => {
    setIsSorting(true);
    setTitle("Merge Sort");
    const merge = animateMergeSort(array);
    //setArray(merge);
    array.splice(0, array.length, ...merge);
  };

  const bubbleSort = async () => {
    setIsBubbleSorting(true);
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
                onClick={() => decreaseSpeed("twice")}
              >
                --
              </button>
              <button
                className="toggleButton"
                onClick={() => decreaseSpeed("once")}
              >
                -
              </button>
              <span>{speed}</span>
              <button
                className="toggleButton"
                onClick={() => increaseSpeed("once")}
              >
                +
              </button>
              <button
                className="toggleButton"
                onClick={() => increaseSpeed("twice")}
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
                onClick={() => decreaseArrayLength("twice")}
              >
                --
              </button>
              <button
                className="toggleButton"
                onClick={() => decreaseArrayLength("once")}
              >
                -
              </button>
              <span>{maxlength}</span>
              <button
                className="toggleButton"
                onClick={() => increaseArrayLength("once")}
              >
                +
              </button>
              <button
                className="toggleButton"
                onClick={() => increaseArrayLength("twice")}
              >
                ++
              </button>
            </div>
          </div>
          <button className="button generate" onClick={resetArray}>
            Generate new array
          </button>
          <button className="button toggleButton" onClick={mergeSort}>
            Merge Sort
          </button>
          <button className="button toggleButton" onClick={bubbleSort}>
            Bubble Sort
          </button>
          <button className="button toggleButton">Quick Sort</button>
          <button className="button" onClick={() => setIsBubbleSorting(false)}>
            Cancel
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

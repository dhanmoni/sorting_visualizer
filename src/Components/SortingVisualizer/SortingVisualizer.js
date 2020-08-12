import React, { useState, useEffect } from "react";
import "./SortingVisualizerStyles.css";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  let [maxlength, setLength] = useState(100);
  let [maxHeight, setHeightNum] = useState(500);
  let [speed, setSpeed] = useState(5);
  let [barWidth, setBarWidth] = useState(5);
  let [isSorting, setIsSorting] = useState(false);
  let [title, setTitle] = useState(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    setArray([]);
    setTitle("");
    setIsSorting(false);
    for (let i = 0; i < maxlength; i++) {
      const randomNum = getRandomInt(5, maxHeight);
      setArray((array) => [...array, randomNum]);
    }
    console.log(array);
    if (maxlength > 50) setBarWidth(5);
    if (maxlength < 50) setBarWidth(15);
    if (maxlength < 20) setBarWidth(20);
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const decreaseSpeed = () => {
    console.log(speed);
    if (speed === 0) return false;
    setSpeed((prevCount) => prevCount - 1);
    console.log(speed);
  };

  const increaseSpeed = () => {
    console.log(speed);
    if (speed === 10) return false;
    setSpeed((prevCount) => prevCount + 1);
    console.log(speed);
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
    // let buttons = document.getElementsByClassName("toggleButton");
    //   Array.from(buttons).forEach((button) => {
    //     button.style.display = "none";
    //   });
  };
  useEffect(() => {
    let buttons = document.getElementsByClassName("toggleButton");
    console.log(buttons);
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

  return (
    <div className="main">
      <div className="side-bar">
        <div className="side-bar-container">
          <h3>Sorting Visualizer</h3>
          <div className="speed">
            <h4>Speed: </h4>
            <div>
              <button className="toggleButton" onClick={decreaseSpeed}>
                -
              </button>
              <span>{speed}</span>
              <button className="toggleButton" onClick={increaseSpeed}>
                +
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
          <button className="button" onClick={mergeSort}>
            Merge Sort
          </button>
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

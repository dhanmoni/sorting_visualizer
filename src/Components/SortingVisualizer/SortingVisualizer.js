import React, { useState, useEffect } from "react";
import "./SortingVisualizerStyles.css";
import { doBubbleSort } from "../../SortingFunctions/BubbleSort";
import { doSelectionSort } from "../../SortingFunctions/SelectionSort";
import { doInsertionSort } from "../../SortingFunctions/InsertionSort";
import {
  getRandomInt,
  increaseArrayLength,
  increaseSpeed,
  decreaseArrayLength,
  decreaseSpeed,
} from "../../HelperFunctions/HelperFunctions";
import Sidebar from "../Sidebar/Sidebar";
import InfoSection from "../InfoSection/InfoSection";
import useWindowDimensions from "../../HelperFunctions/WindowDimension";

const setInitailMaxLength = (width) => {
  return width <= 600 ? 20 : 50;
};
const setInitailMaxHeight = (height) => {
  return height <= 600 ? 320 : height >= 800 ? 500 : 400;
};

export default function SortingVisualizer() {
  const { height, width } = useWindowDimensions();
  let [array, setArray] = useState([]);
  const [maxlength, setLength] = useState(setInitailMaxLength(width));
  const [maxHeight, setMaxHeight] = useState(setInitailMaxHeight(height));
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
      // const randomNum = [9, 18, 24, 10, 39, 22, 12, 49, 29];
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
      width,
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
      if (window.innerWidth <= 600) {
        sideBar[0].style.marginLeft = `${-50}vw`;
        visualizerArea[0].style.width = `${100}vw`;
      } else {
        sideBar[0].style.marginLeft = `${-25}vw`;
        visualizerArea[0].style.width = `${100}vw`;
      }
    } else {
      if (window.innerWidth <= 600) {
        sideBar[0].style.marginLeft = `${0}vw`;
        visualizerArea[0].style.width = `${50}vw`;
      } else {
        sideBar[0].style.marginLeft = `${0}vw`;
        visualizerArea[0].style.width = `${75}vw`;
      }
    }
  };

  const toggleInfo = () => {
    const infoSection = document.getElementsByClassName("info-section");
    if (infoSection[0].style.marginLeft === `${0}vw`) {
      infoSection[0].style.marginLeft = `${-85}vw`;
    } else {
      infoSection[0].style.marginLeft = `${0}vw`;
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
        // callQuickSort={callQuickSort}
        speed={speed}
        maxlength={maxlength}
        isSorting={isSorting}
      />
      <InfoSection />
      <div className="visualizer-area">
        <div className="header">
          <i className="material-icons menu-icons" onClick={toggleBar}>
            menu
          </i>
          <i className="material-icons menu-icons" onClick={toggleInfo}>
            code
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

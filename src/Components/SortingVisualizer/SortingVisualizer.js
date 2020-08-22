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
import { TEAL, GREEN, PURPLE, RED } from "../HelperFunctions/Colors";

export default function SortingVisualizer() {
  let [array, setArray] = useState([]);
  const [maxlength, setLength] = useState(5);
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
      const randomNum = [100, 70, 40, 10, 80, 33];
      setArray(randomNum);
      //const randomNum = getRandomInt(5, maxHeight);
      //setArray((array) => [...array, randomNum]);
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

  // const callMergeSort = async () => {
  //   setIsSorting(true);
  //   setTitle("Merge Sort");
  //   const arrayBars = document.getElementsByClassName("array-bar");

  //   const merged = animateMergeSort(array);
  //   console.log(merged);
  //   for (let i = 0; i < merged.length; i++) {
  //     console.log({ i });
  //     // const arrayBars = document.getElementsByClassName("array-bar");
  //     const isColorChange = i % 3 !== 2;
  //     if (isColorChange) {
  //       const [barOneIdx, barTwoIdx] = merged[i];
  //       const barOneStyle = arrayBars[barOneIdx].style;
  //       const barTwoStyle = arrayBars[barTwoIdx].style;
  //       const color = i % 3 === 0 ? GREEN : PURPLE;
  //       setTimeout(() => {
  //         barOneStyle.backgroundColor = color;
  //         barTwoStyle.backgroundColor = color;
  //       }, speed);
  //     } else {
  //       //await new Promise((resolve) => setTimeout(resolve, 1000));
  //       setTimeout(() => {
  //         const [barOneIdx, newHeight] = merged[i];
  //         const barOneStyle = arrayBars[barOneIdx].style;
  //         barOneStyle.height = `${newHeight}px`;
  //       }, speed);
  //     }
  //   }

  //   //setArray(merged);
  // };

  const callQuickSort = async () => {
    setIsSorting(true);
    setTitle("Quick Sort");
    async function pivot(arr, start = 0, end = arr.length - 1) {
      let pivot = arr[start];
      let swapIdx = start;

      let animations = [];
      const swap = async (arr, idx1, idx2) => {
        console.log("swapping..", { idx1, idx2 });
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
      };

      for (let i = start + 1; i <= end; i++) {
        console.log({ pivot, start, swapIdx, i });
        animations.push([pivot, start, swapIdx, i]);
        if (pivot > arr[i]) {
          swapIdx++;
          await swap(arr, swapIdx, i);
        }
      }
      await swap(arr, start, swapIdx);
      //animations.push([pivot, swapIdx]);
      return { swapIdx, animations };
    }

    async function quickSort(
      arr,
      animations,
      left = 0,
      right = arr.length - 1
    ) {
      let pivotData;
      if (left < right) {
        pivotData = await pivot(arr, left, right);
        let pivotIndex = pivotData.swapIdx;
        animations.push(pivotData.animations);
        await Promise.all([
          quickSort(arr, animations, left, pivotIndex - 1),
          quickSort(arr, animations, pivotIndex + 1, right),
        ]);
      }
      return animations;
    }

    //const quick = animateQuickSort(array, []).flat();

    const quick = quickSort(array, []);
    let animationsArray;
    await quick.then((arrays) => {
      animationsArray = arrays;
      console.log(animationsArray);
    });

    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animationsArray.length; i++) {
      console.log("i=", animationsArray[i]);
      for (let j = 0; j < animationsArray[i].length; j++) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        console.log("j=", animationsArray[i][j]);
        const [pivotVal, startIdx, pivotIdx, compareIdx] = animationsArray[i][
          j
        ];
        let pivotIdxVal = parseInt(arrayBars[pivotIdx + 1].style.height);
        let compareVal;
        let pivotIdxStyle = arrayBars[pivotIdx + 1].style;
        let compareStyle;
        if (j === animationsArray[i].length - 1) {
          compareStyle = arrayBars[compareIdx].style;
          compareVal = parseInt(arrayBars[compareIdx].style.height);
        } else {
          compareStyle = arrayBars[compareIdx + 1].style;
          compareVal = parseInt(arrayBars[compareIdx + 1].style.height);
        }
        let pivotStyle = arrayBars[startIdx].style;

        console.log({ pivotVal, startIdx, pivotIdx, compareIdx });
        //console.log({ pivotIdxStyle, compareStyle, pivotStyle });
        // pivotIdxStyle.backgroundColor = RED;
        // pivotStyle.backgroundColor = PURPLE;
        // compareStyle.backgroundColor = GREEN;
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (pivotIdxVal > pivotVal && pivotIdxVal > compareVal) {
          console.log("pivotIdxStyle=1111", pivotIdxStyle.height);
          console.log("compareStyle=1111", compareStyle.height);
          let temp1 = pivotIdxStyle.height;
          pivotIdxStyle.height = compareStyle.height;
          compareStyle.height = temp1;
          console.log("temp1=1111", temp1);
          console.log("pivotIdxStyle=2222", pivotIdxStyle.height);
          console.log("compareStyle=2222", compareStyle.height);
        }

        if (j === animationsArray[i].length - 1) {
          //[100, 70, 40, 10, 80, 33]
          //[100, 70, 40, 10, 80, 33]
          //[100, 70, 40, 10, 80, 33]
          //[33, 70, 40, 10, 80, 100]
          //

          //[33, 70, 40, 10, 80, 100];
          //[33, 40, 70, 10, 80, 100];
          //[]
          console.log("last iteration!!!", pivotVal, pivotIdxVal);
          // if (pivotVal > pivotIdxVal) {
          console.log({ j });
          console.log("compareStyle=33333", compareStyle.height);
          console.log("pivotStyle=33333", pivotStyle.height);
          let temp2 = compareStyle.height;
          console.log("temp2=3333", temp2);

          compareStyle.height = pivotStyle.height;
          pivotStyle.height = temp2;
          console.log("compareStyle=4444", compareStyle.height);
          console.log("pivotStyle=4444", pivotStyle.height);
          // } else {
          //   console.log("not swapping!!!");
          // }

          // compareStyle.backgroundColor = TEAL;
          // pivotStyle.backgroundColor = TEAL;
          // compareStyle.backgroundColor = TEAL;
        }
      }
    }
    // for (let i = 0; i < animationsArray.length; i++) {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   console.log(animationsArray[i]);
    //   const [pivotVal, startIdx, pivotIdx, barTwoIdx] = animationsArray[i];
    //   let pivotIdxVal = parseInt(arrayBars[pivotIdx].style.height);
    //   let barTwoVal = parseInt(arrayBars[barTwoIdx].style.height);
    //   let pivotIdxStyle = arrayBars[pivotIdx].style;
    //   let barTwoStyle = arrayBars[barTwoIdx].style;
    //   let pivotStyle = arrayBars[startIdx].style;
    //   pivotStyle.backgroundColor = PURPLE;

    //   if (barTwoVal < pivotVal) {
    //     barTwoStyle.backgroundColor = GREEN;
    //     pivotIdxStyle.backgroundColor = GREEN;
    //     let temp = barTwoStyle.height;
    //     barTwoStyle.height = pivotIdxStyle.height;
    //     pivotIdxStyle.height = temp;
    //     await new Promise((resolve) => setTimeout(resolve, 500));
    //     pivotStyle.backgroundColor = TEAL;
    //     barTwoStyle.backgroundColor = TEAL;
    //     pivotIdxStyle.backgroundColor = TEAL;
    //   }
    // }
    //setArray(quick);
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
        //callMergeSort={callMergeSort}
        callQuickSort={callQuickSort}
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

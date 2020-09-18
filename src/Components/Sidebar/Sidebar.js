import React from "react";

export default function Sidebar(props) {
  const {
    callDecreaseSpeed,
    callIncreaseSpeed,
    callDecreaseArrayLength,
    callIncreaseArrayLength,
    resetArray,
    callBubbleSort,
    callInsertionSort,
    callSelectionSort,
    //callQuickSort,
    speed,
    maxlength,
    isSorting,
  } = props;
  return (
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
            <span id="speedNum">{speed} ms</span>
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
        <button className="button generate toggleButton" onClick={resetArray}>
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
        {/* <button className="button toggleButton" onClick={callQuickSort}>
          Quick Sort
        </button> */}
        {isSorting && (
          <button
            className="button"
            onClick={() => {
              window.location.reload(false);
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

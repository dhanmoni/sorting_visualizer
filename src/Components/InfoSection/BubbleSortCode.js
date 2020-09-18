import React from "react";
import "./CodeStyles.css";

function BubbleSortCode() {
  return (
    <div>
      <h4 className="sort-name">Bubble Sort Code</h4>
      <hr />
      <div className="code-container-section">
        <pre>
          <code>
            {`
          //BAD WAY:

          function bubbleSort(arr) {
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < arr.length; j++) {
                if (arr[j] > arr[j + 1]) {
                  let temp = arr[j];
                  arr[j] = arr[j + 1];
                  arr[j + 1] = temp;
                }
              }
            }
            return arr;
          }
          
          //GOOD WAY:

          function bubbleSort2(arr) {
            for (let i = arr.length; i > 0; i--) {
              for (let j = 0; j < i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                  let temp = arr[j];
                  arr[j] = arr[j + 1];
                  arr[j + 1] = temp;
                }
              }
            }
            return arr;
          }
          
          //OPTIMIZED WITH NO-SWAPS:

          function bubbleSort3(arr) {
            let noSwaps;
            for (let i = arr.length; i > 0; i--) {
              noSwaps = true;
              for (let j = 0; j < i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                  let temp = arr[j];
                  arr[j] = arr[j + 1];
                  arr[j + 1] = temp;
                }
                noSwaps = false;
              }
              if (noSwaps) break;
            }
            return arr;
          }

          console.log(bubbleSort([20, 78, 10, 6, 5]));
          //[5, 6, 10, 20, 78]
          console.log(bubbleSort2([20, 78, 10, 6, 5]));
          //[5, 6, 10, 20, 78]
          console.log(bubbleSort3([20, 78, 10, 6, 5]));
          //[5, 6, 10, 20, 78]

          
          `}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default BubbleSortCode;

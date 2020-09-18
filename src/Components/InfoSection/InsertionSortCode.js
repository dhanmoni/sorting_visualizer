import React from "react";
import "./CodeStyles.css";

function InsertionSortCode() {
  return (
    <div>
      <h4 className="sort-name">Insertion Sort Code</h4>
      <hr />
      <div className="code-container-section">
        <pre>
          <code>
            {`
          //USING LET:

          function insertionSort(arr) {
            for (let i = 1; i < arr.length; i++) {
              let currentVal = arr[i];
              for (let j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
                arr[j + 1] = arr[j];
                arr[j] = currentVal;
              }
            }
            return arr;
          }
          
          console.log(insertionSort([2, 1, 4, 9, 78, 3]))
          //[1, 2, 3, 4, 9, 78]
          
          // USING VAR:

          function insertionSort2(arr) {
            var currentVal;
            for (var i = 1; i < arr.length; i++) {
              currentVal = arr[i];
              for (var j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
                arr[j + 1] = arr[j];
              }
              arr[j + 1] = currentVal;
            }
            return arr;
          }
          
          console.log(insertionSort2([2, 1, 4, 9, 78, 3]))
          //[1, 2, 3, 4, 9, 78]

          `}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default InsertionSortCode;

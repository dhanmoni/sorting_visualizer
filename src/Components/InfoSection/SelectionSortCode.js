import React from "react";
import "./CodeStyles.css";

function SelectionSortCode() {
  return (
    <div>
      <h4 className="sort-name">Selection Sort Code</h4>
      <hr />
      <div className="code-container-section">
        <pre>
          <code>
            {`
          function selectionSort(arr) {
            for (let i = 0; i < arr.length; i++) {
              let minimum = i;
              for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minimum]) {
                  minimum = j;
                }
              }
              if (i !== minimum) {
                let temp = arr[i];
                arr[i] = arr[minimum];
                arr[minimum] = temp;
              }
            }
            return arr;
          }
          
          console.log(selectionSort([7, 4, 90, 22, 3, 2, 66]));
          //[2, 3, 4, 7, 22, 66, 90]

          `}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default SelectionSortCode;

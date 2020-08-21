import { selectionSort as animateSelectionSort } from "../../Algorithms/SelectionSort/SelectionSort";
import { GREEN, TEAL, PURPLE, RED } from "../HelperFunctions/Colors";

export const doSelectionSort = async (props) => {
  const { array, arrayBars, speed, setIsSorting } = props;
  const selection = animateSelectionSort(array);
  let minimumVal = parseInt(arrayBars[0].style.height);
  let minimumStyle = arrayBars[0].style;
  for (let i = 0; i < selection.length; i++) {
    const [barOneIdx, barTwoIdx] = selection[i];
    let barOneVal = parseInt(arrayBars[barOneIdx].style.height);
    let barTwoVal = parseInt(arrayBars[barTwoIdx].style.height);
    let barOneStyle = arrayBars[barOneIdx].style;
    let barTwoStyle = arrayBars[barTwoIdx].style;

    barOneStyle.backgroundColor = PURPLE;
    barTwoStyle.backgroundColor = GREEN;

    if (barTwoVal < minimumVal) {
      barTwoStyle.backgroundColor = RED;
      if (minimumVal !== barOneVal) {
        minimumStyle.backgroundColor = TEAL;
      }
      minimumVal = barTwoVal;
      minimumStyle = barTwoStyle;

      await new Promise((resolve) => setTimeout(resolve, `${speed}`));
    } else {
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
    if (i === selection.length - 1) {
      setIsSorting(false);
    }
  }
};

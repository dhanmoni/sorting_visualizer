import { bubbleSort as animateBubbleSort } from "../../Algorithms/BubbleSortAlgorithm/BubbleSort";
import { GREEN, TEAL } from "../HelperFunctions/Colors";

export const doBubbleSort = async (props) => {
  const { array, arrayBars, speed, setIsSorting } = props;

  const bubbleAnimations = animateBubbleSort(array);

  for (let i = 0; i < bubbleAnimations.length; i++) {
    const [barOneIdx, barTwoIdx] = bubbleAnimations[i];
    let barOneVal = parseInt(arrayBars[barOneIdx].style.height);
    let barTwoVal = parseInt(arrayBars[barTwoIdx].style.height);
    let barOneStyle = arrayBars[barOneIdx].style;
    let barTwoStyle = arrayBars[barTwoIdx].style;
    // console.log("index=", barOneIdx, barTwoIdx, speed);

    if (barOneVal > barTwoVal) {
      //console.log("greater", barOneVal, barTwoVal);
      barOneStyle.backgroundColor = GREEN;
      barTwoStyle.backgroundColor = GREEN;
      await new Promise((resolve) => setTimeout(resolve, `${speed}`));
      barOneStyle.height = `${barTwoVal}px`;
      barTwoStyle.height = `${barOneVal}px`;
      await new Promise((resolve) => setTimeout(resolve, `${speed}`));
      // console.log("height=", barOneStyle.height, barTwoStyle.height);
      // console.log("swapped");
      barOneStyle.backgroundColor = TEAL;
      barTwoStyle.backgroundColor = TEAL;
    } else {
      barOneStyle.backgroundColor = GREEN;
      barTwoStyle.backgroundColor = GREEN;
      await new Promise((resolve) => setTimeout(resolve, `${speed}`));
      // console.log("else");
      // console.log("no swapping");
      barOneStyle.backgroundColor = TEAL;
      barTwoStyle.backgroundColor = TEAL;
    }
    if (i === bubbleAnimations.length - 1) {
      setIsSorting(false);
    }
  }
};

import { bubbleSort as animateBubbleSort } from "../../Algorithms/BubbleSortAlgorithm/BubbleSort";

export const doBubbleSort = async (props) => {
  const { setTitle, array, arrayBars, speed, setIsSorting } = props;
  setTitle("Bubble Sort");

  const bubbleAnimations = animateBubbleSort(array);

  for (let i = 0; i < bubbleAnimations.length; i++) {
    if (i === bubbleAnimations.length - 1) {
      setIsSorting(false);
    }

    const [barOneIdx, barTwoIdx] = bubbleAnimations[i];
    let barOneVal = parseInt(arrayBars[barOneIdx].style.height);
    let barTwoVal = parseInt(arrayBars[barTwoIdx].style.height);
    let barOneStyle = arrayBars[barOneIdx].style;
    let barTwoStyle = arrayBars[barTwoIdx].style;
    // console.log("index=", barOneIdx, barTwoIdx, speed);

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
  }
};

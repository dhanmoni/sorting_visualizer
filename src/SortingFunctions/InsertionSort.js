import { GREEN, TEAL } from "../HelperFunctions/Colors";

export const doInsertionSort = async (props) => {
  const { arrayBars, speed, setIsSorting } = props;

  for (let i = 0; i < arrayBars.length; i++) {
    let compareVal = parseInt(arrayBars[i].style.height);
    let compareStyle = arrayBars[i].style;
    let prevVal;
    let prevStyle;
    if (i !== 0) {
      prevVal = parseInt(arrayBars[i - 1].style.height);
      prevStyle = arrayBars[i - 1].style;
    } else {
      prevVal = 0;
    }
    compareStyle.backgroundColor = GREEN;

    await new Promise((resolve) => setTimeout(resolve, `${speed}`));

    for (let j = i - 1; j >= 0 && compareVal < prevVal; j--) {
      compareStyle.height = `${prevVal}px`;
      prevStyle.height = `${compareVal}px`;

      compareStyle.backgroundColor = TEAL;
      compareStyle = prevStyle;
      compareStyle.backgroundColor = GREEN;

      if (j !== 0) {
        prevVal = parseInt(arrayBars[j - 1].style.height);
        prevStyle = arrayBars[j - 1].style;
      } else {
        prevVal = parseInt(arrayBars[j].style.height);
        prevStyle = arrayBars[j].style;
      }

      await new Promise((resolve) => setTimeout(resolve, `${speed}`));
    }
    compareStyle.backgroundColor = TEAL;

    if (i === arrayBars.length - 1) {
      setIsSorting(false);
    }
  }
};

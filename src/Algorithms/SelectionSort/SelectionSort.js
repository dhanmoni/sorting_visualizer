export function selectionSort(arr) {
  const animations = [];
  let minimum = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      // console.log(i, j);
      // if (arr[j] < arr[minimum]) {
      //   minimum = j;
      // }
      animations.push([i, j]);
    }
    // if (i !== minimum) {
    //   let temp = arr[i];
    //   arr[i] = arr[minimum];
    //   arr[minimum] = temp;
    // }
  }

  return animations;
}

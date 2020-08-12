export function bubbleSort(arr) {
  let animations = [];
  let noSwaps;
  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      animations.push([j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        animations.push([j, j + 1]);
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return animations;
}

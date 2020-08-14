export function insertionSort(arr) {
  let animations = [];
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i];
    for (let j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      animations.push([i, j, currentVal]);
      // arr[j + 1] = arr[j];
      // arr[j] = currentVal;
    }
  }
  return animations;
}

// 0: (2) [2, 1]
// 1: (2) [3, 2]
// 2: (2) [3, 1]
// 3: (2) [3, 0]
// 4: (2) [4, 3]
// 5: (2) [5, 4]
// 6: (2) [5, 3]
// 7: (2) [5, 2]
// 8: (2) [5, 1]
// 9: (2) [5, 0]

// 0: (2) [2, 1]
// 1: (2) [3, 2]
// 2: (2) [3, 1]
// 3: (2) [3, 0]
// 4: (2) [5, 4]
// 5: (2) [5, 3]
// 6: (2) [5, 2]
// 7: (2) [5, 1]
// 8: (2) [5, 0]

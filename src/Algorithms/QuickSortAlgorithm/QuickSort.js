// function pivot(arr, start = 0, end = arr.length - 1) {
//   // console.log(arr)
//   let pivot = arr[start];
//   let swapIdx = start;

//   let animations = [];
//   const swap = (arr, idx1, idx2) => {
//     [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
//     // [idx1, idx2] = [idx1, idx1];
//   };

//   for (let i = start + 1; i <= end; i++) {
//     animations.push([pivot, swapIdx, i]);
//     if (pivot > arr[i]) {
//       swapIdx++;
//       swap(arr, swapIdx, i);
//     }
//   }
//   swap(arr, start, swapIdx);
//   //animations.push([pivot, swapIdx]);
//   return { swapIdx, animations };
// }

// export function quickSort(arr, animations, left = 0, right = arr.length - 1) {
//   let pivotData;
//   if (left < right) {
//     pivotData = pivot(arr, left, right);
//     let pivotIndex = pivotData.swapIdx;
//     animations.push(pivotData.animations);
//     //left
//     quickSort(arr, animations, left, pivotIndex - 1);
//     //right
//     quickSort(arr, animations, pivotIndex + 1, right);
//   }
//   return animations;
// }

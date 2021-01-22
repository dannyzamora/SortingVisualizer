// BubbleSort-------------------------------
export const bubbleSort = (array) => {
  const copy = [...array];
  const animations = [];
  let len = copy.length; // [1,2]
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      animations.push([[j, j + 1], false]);

      if (copy[j] > copy[j + 1]) {
        let tmp = copy[j];
        copy[j] = copy[j + 1];
        animations.push([[j, copy[j]], true]);
        copy[j + 1] = tmp;
        animations.push([[j + 1, tmp], true]);
      }
    }
  }
  return animations;
};
//-------------------------------------------
//QuickSort(randomized)

export const quickSort = (array) => {
  const copy = [...array];
  const animations = [];
  sortQuick(copy, 0, copy.length - 1, animations);
  return animations;
};

const sortQuick = (arr, p, r, animations) => {
  if (p < r) {
    const q = randomizedPartition(arr, p, r, animations);
    sortQuick(arr, p, q - 1, animations);
    sortQuick(arr, q + 1, r, animations);
  }
};

const partition = (arr, p, r, animations) => {
  const x = arr[r];
  animations.push([[r], false]);
  let i = p - 1;
  for (let j = p; j <= r - 1; j++) {
    if (arr[j] <= x) {
      i++;
      swap(arr, i, j, animations);
    }
  }
  swap(arr, i + 1, r, animations);
  return i + 1;
};
const randomizedPartition = (arr, p, r, animations) => {
  const i = getRndInteger(p, r);
  swap(arr, r, i, animations);
  return partition(arr, p, r, animations);
};
const swap = (arr, i, j, animations) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  animations.push([[i, arr[i]], true]);
  animations.push([[j, arr[j]], true]);
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//----------------------------------------------------
//--------insertions Sort
export const insertionSort = (array) => {
  const copy = [...array];
  const animations = [];
  for (let j = 1; j < copy.length; j++) {
    const k = copy[j];
    let i = j - 1;
    animations.push([[i, j], false]);

    while (i >= 0 && copy[i] > k) {
      copy[i + 1] = copy[i];
      animations.push([[i + 1, copy[i + 1]], true]);
      animations.push([[i, j], false]);

      i--;
    }
    copy[i + 1] = k;
    animations.push([[i + 1, copy[i + 1]], true]);
  }
  return animations;
};
//------------------------------------------------------
//mergesort

export const mergeSort = (array) => {
  const copy = [...array];
  const animations = [];
  sortMerge(copy, 0, copy.length - 1, animations);
  return animations;
};

const sortMerge = (arr, p, r, animations) => {
  if (p < r) {
    const q = Math.floor(p + (r - p) / 2);
    sortMerge(arr, p, q, animations);
    sortMerge(arr, q + 1, r, animations);
    merge(arr, p, q, r, animations);
  }
};
const merge = (arr, p, q, r, animations) => {
  const n1 = q - p + 1;
  const n2 = r - q;
  const L = [];
  const R = [];
  for (let i = 0; i < n1; i++) {
    L.push(arr[p + i]);
  }
  for (let j = 0; j < n2; j++) {
    R.push(arr[q + j + 1]);
  }
  L.push(Infinity);
  R.push(Infinity);
  let i = 0;
  let j = 0;

  for (let k = p; k <= r; k++) {
    animations.push([[k], false]);

    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    animations.push([[k, arr[k]], true]);
  }
};

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import * as sorting from "./algorithms/algorithms";

const SortingVisual = (props) => {
  const [array, setArray] = useState([]);
  //const [width, setWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    initialArray();

    //https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/
    // const handleWindowResize = () => setWidth(window.innerWidth);
    // window.addEventListener("resize", handleWindowResize);
    // return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const initialArray = () => {
    const array = [];
    for (let i = 0; i < window.innerWidth / 10; i++) {
      array.push(randomInt(1, 55));
    }
    setArray(array);
  };

  const mergeSort = () => {};
  const bubbleSort = () => {
    const jsSort = array.sort((a, b) => a - b);
    const sortedArr = sorting.bubbleSort(array);
    console.log(jsSort);
    console.log(sortedArr);

    console.log(arraysAreEqual(jsSort, sortedArr));
  };

  const quickSort = () => {};

  const heapSort = () => {};

  const testAlg = () => {
    for (let i = 0; i < 100; i++) {
      const arr = [];
      const len = randomInt(1, 1000);
      for (let i = 0; i < len; i++) {
        arr.push(randomInt(-1000, 1000));
      }
      const javaScript = arr.sort((a, b) => a - b);
      const bubSort = sorting.bubbleSort(arr);
      console.log(arraysAreEqual(javaScript, bubSort));
    }
  };

  return (
    <div className="array">
      {array.map((val, i) => (
        <div
          className="array__bar"
          key={i}
          style={{ height: `${val}vh` }}
        ></div>
      ))}

      <button onClick={initialArray}>New Array</button>
      <button onClick={mergeSort}>Merge Sort</button>
      <button onClick={bubbleSort}>Bubble Sort</button>
      <button onClick={quickSort}>Quick Sort</button>
      <button onClick={heapSort}>Heap Array</button>
      <button onClick={testAlg}>Test</button>
    </div>
  );
};

SortingVisual.propTypes = {};

// https://www.w3schools.com/js/js_random.asp
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

export default SortingVisual;

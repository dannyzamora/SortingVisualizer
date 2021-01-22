import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import * as sorting from "./algorithms/algorithms";

const SortingVisual = (props) => {
  const [array, setArray] = useState([]);
  const containerRef = useRef(null);
  //const [width, setWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    initialArray();
  }, []);

  const initialArray = () => {
    clearInterval();
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(randomInt(1, 500));
    }

    setArray(array);
  };

  const mergeSort = () => {
    const animations = sorting.mergeSort(array);
    animations.forEach(([comparison, swapped], i) => {
      setTimeout(() => {
        if (!swapped) {
          animateArrayAccess(comparison[0]);
        } else {
          setArray((prev) => {
            const [k, newValue] = comparison;
            const newArray = [...prev];
            newArray[k] = newValue;
            return newArray;
          });
        }
      }, i * 5);
    });
  };

  const bubbleSort = () => {
    const animations = sorting.bubbleSort(array);
    animations.forEach(([comparison, swapped], i) => {
      setTimeout(() => {
        if (!swapped) {
          if (comparison.length === 2) {
            const [i, j] = comparison;
            animateArrayAccess(i);
            animateArrayAccess(j);
          }
        } else {
          setArray((prev) => {
            const [k, newValue] = comparison;
            const newArray = [...prev];
            newArray[k] = newValue;
            return newArray;
          });
        }
      }, i * 5);
    });
  };
  function animateArrayAccess(index) {
    const arrayBars = containerRef.current.children;
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = "red";
    }, 1);
    setTimeout(() => {
      arrayBarStyle.backgroundColor = "";
    }, 5 * 2);
  }
  const quickSort = () => {
    const animations = sorting.quickSort(array);
    console.log(animations);
    animations.forEach(([comparison, swapped], i) => {
      setTimeout(() => {
        if (!swapped) {
          if (comparison.length === 1) {
            animateArrayAccess(comparison[0]);
          }
        } else {
          setArray((prev) => {
            const [k, newValue] = comparison;
            const newArray = [...prev];
            newArray[k] = newValue;
            return newArray;
          });
        }
      }, i * 5);
    });
  };

  const insertSort = () => {
    const animations = sorting.insertionSort(array);
    console.log(animations);
    animations.forEach(([comparison, swapped], i) => {
      setTimeout(() => {
        if (!swapped) {
          animateArrayAccess(comparison[0]);
          animateArrayAccess(comparison[1]);
        } else {
          setArray((prev) => {
            const [k, newValue] = comparison;
            const newArray = [...prev];
            newArray[k] = newValue;
            return newArray;
          });
        }
      }, i * 5);
    });
  };

  const testAlg = () => {
    for (let i = 0; i < 100; i++) {
      const arr = [];
      const len = randomInt(1, 1000);
      for (let i = 0; i < len; i++) {
        arr.push(randomInt(-1000, 1000));
      }
      const bubSort = sorting.mergeSort([...arr]);
      const javaScript = arr.sort((a, b) => a - b);
      console.log(arraysAreEqual(javaScript, bubSort));
    }
  };

  return (
    <div className="container">
      <div className="array" ref={containerRef}>
        {array.map((val, i) => (
          <div className="array__bar" key={i} style={{ height: `${val}px` }} />
        ))}
      </div>
      <button onClick={initialArray}>New Array</button>
      <button onClick={mergeSort}>Merge Sort</button>
      <button onClick={bubbleSort}>Bubble Sort</button>
      <button onClick={quickSort}>Quick Sort</button>
      <button onClick={insertSort}>Insert Sort</button>
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

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
    for (let i = 0; i < 50; i++) {
      array.push(randomInt(1, 500));
    }

    setArray(array);
  };

  const mergeSort = () => {};

  const bubbleSort = () => {
    const animations = sorting.bubbleSort(array);
    console.log(array);
    console.log(animations);
    animations.forEach(([comparison, swapped], i) => {
      if (!swapped) {
        setTimeout(() => {
          if (comparison.length === 2) {
            const [i, j] = comparison;
            animateArrayAccess(i);
            animateArrayAccess(j);
          } else {
            const [i] = comparison;
            console.log(i);
            animateArrayAccess(i);
          }
        }, i * 5);
      } else {
        setTimeout(() => {
          setArray((prev) => {
            const [k, newValue] = comparison;
            const newArray = [...prev];
            newArray[k] = newValue;
            return newArray;
          });
        }, i * 5);
      }
    });

    function animateArrayAccess(index) {
      const arrayBars = containerRef.current.children;
      const arrayBarStyle = arrayBars[index].style;
      setTimeout(() => {
        arrayBarStyle.backgroundColor = "orange";
      }, 1);
      setTimeout(() => {
        arrayBarStyle.backgroundColor = "";
      }, 5);
    }
    // setTimeout(()=>{
    //   animateSortedArray();
    // },animations.length*500)
  };

  // function animateSortedArray() {
  //   const arrayBars = containerRef.current.children;
  //   for (let i = 0; i < arrayBars.length; i++) {
  //     const arrayBarStyle = arrayBars[i].style;
  //     setTimeout(
  //       () => (arrayBarStyle.backgroundColor = "purple"),
  //       i * 500,
  //     );
  //   }
  //   setTimeout(() => {

  //   }, arrayBars.length * 500);
  // }

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

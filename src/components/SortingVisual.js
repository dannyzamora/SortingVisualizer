import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import * as sortingAlgs from "../algorithms/algorithms";

const SortingVisual = (props) => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const containerRef = useRef(null);
  const [width, setWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    initialArray();
  }, []);

  useEffect(() => {
    // Handler to call on window resize

    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const initialArray = () => {
    clearInterval();
    const array = [];
    for (let i = 0; i < width / 20; i++) {
      array.push(randomInt(1, 500));
    }

    setArray(array);
  };

  const mergeSort = () => {
    const animations = sortingAlgs.mergeSort(array);
    animateSortingArray(animations);
  };

  const bubbleSort = () => {
    const animations = sortingAlgs.bubbleSort(array);
    animateSortingArray(animations);
  };

  const quickSort = () => {
    const animations = sortingAlgs.quickSort(array);
    animateSortingArray(animations);
  };

  const insertSort = () => {
    const animations = sortingAlgs.insertionSort(array);
    animateSortingArray(animations);
  };
  const animateSortingArray = (animations) => {
    console.log(sorting);
    if (!sorting) {
      setSorting(true);
      animations.forEach(([comparison, swapped], i) => {
        setTimeout(() => {
          if (!swapped) {
            if (comparison.length === 2) {
              animateArrayAccess(comparison[0]);
              animateArrayAccess(comparison[1]);
            } else {
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
        setTimeout(() => setSorting(false), 5 * animations.length);
      });
    }
  };
  const animateArrayAccess = (index) => {
    const arrayBars = containerRef.current.children;
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = "red";
    }, 1);
    setTimeout(() => {
      arrayBarStyle.backgroundColor = "";
    }, 5 * 2);
  };

  //   const testAlg = () => {
  //     for (let i = 0; i < 100; i++) {
  //       const arr = [];
  //       const len = randomInt(1, 1000);
  //       for (let i = 0; i < len; i++) {
  //         arr.push(randomInt(-1000, 1000));
  //       }
  //       const bubSort = sortingAlgs.mergeSort([...arr]);
  //       const javaScript = arr.sort((a, b) => a - b);
  //       console.log(arraysAreEqual(javaScript, bubSort));
  //     }
  //   };

  return (
    <div className="container">
      <div className="array" ref={containerRef}>
        {array.map((val, i) => (
          <div className="array__bar" key={i} style={{ height: `${val}px` }} />
        ))}
      </div>
      <button disabled={sorting} onClick={initialArray}>
        New Array
      </button>
      <button disabled={sorting} onClick={mergeSort}>
        Merge Sort
      </button>
      <button disabled={sorting} onClick={bubbleSort}>
        Bubble Sort
      </button>
      <button disabled={sorting} onClick={quickSort}>
        Quick Sort
      </button>
      <button disabled={sorting} onClick={insertSort}>
        Insert Sort
      </button>
      {/* <button disabled={sorting} onClick={testAlg}>
        Test
      </button> */}
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

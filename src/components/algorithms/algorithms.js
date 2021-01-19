export const bubbleSort = (array) => {
  const copy = [...array]
  const animations = [];
  let len = copy.length; // [1,2] 
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len-i-1; j++) {

      animations.push([[j,j+1],false]); 

      if (copy[j] > copy[j + 1]) {
        let tmp = copy[j];
        copy[j] = copy[j + 1];      
        animations.push([[j,copy[j]],true]); 
        copy[j + 1] = tmp;
        animations.push([[j+1,tmp],true]); 
      }

    


    }




  }
  return animations;
};

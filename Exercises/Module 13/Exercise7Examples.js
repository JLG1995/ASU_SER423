// Write the running time of this function
// Run Time: O(n)
// Reasoning: Uses a while loop, which runs once per element in the array by 'n' iterations.
function example(arr) {
    let len = arr.length;
    let max = -Infinity;
    while (len--) { // The while loop described in the reasoning.
      if (arr[len] > max) {
        max = arr[len];
      }
    }
    return max;
}

// Write the running time of this function
// Run Time: O(n^2)
// Reasoning: Uses a nested for-loop. The inner loop executes up to 'n - i - 1' times every iteration, 
// while the outer loop executes 'n' times. The sum of the first n integers, or n(n-1)/2, or O(n²), 
// roughly increases the total number of comparisons (and possible swaps). 
// Each operation within the loop is constant time. 
function exampleTwo(arr){
    // The nested for-loop below that is described in the reasoning.
    for(var i = 0; i < arr.length; i++){
      for(var j = 0; j < ( arr.length - i -1 ); j++){
        if(arr[j] > arr[j+1]){
          var temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j+1] = temp
        }
      }
    }
}
export default function selectRandomWinner(array) {
  // Use map to transform each element into an object with original value and a random number
  const mappedArray = array.map((item) => ({
    value: item,
    random: Math.random(),
  }))

  // Sort the array based on the random numbers
  const sortedArray = mappedArray.sort((a, b) => a.random - b.random)

  // Retrieve the first element from the sorted array (which has the smallest random number)
  const randomWinner = sortedArray[0].value

  return randomWinner
}

// Example usage:
const myArray = [1, 2, 3, 4, 5]
const winner = selectRandomWinner(myArray)
console.log('The random winner is:', winner)

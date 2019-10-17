// This is a NodeJS console app which uses user input to generate and compare numeric values

/**
 * Validates user input
 * @param {string} input
 */
const validateInput = input => {
  return /^\d+[^\S\t\r\n]\d+\s*$/.test(input);
};

/**
 * First value generator
 * @param {number} initialValue
 */
const numberGeneratorA = initialValue => {
  return (initialValue * 16807) % 2147483647;
};

/**
 * Second value generator
 * @param {number} initialValue
 */
const numberGeneratorB = initialValue => {
  return (initialValue * 48271) % 2147483647;
};

/**
 * Compares values returned by the generators
 * @param {number} initialValueA
 * @param {number} initialValueB
 * @param {number} depth
 */
const countMatchingValues = (initialValueA, initialValueB, depth = 1000000) => {
  let a = initialValueA;
  let b = initialValueB;
  let numberOfMatches = 0;
  for (let i = depth; i > 0; i--) {
    a = numberGeneratorA(a);
    b = numberGeneratorB(b);
    // shift-left 24 bits to get remaining 8
    if (a << 24 === b << 24) {
      numberOfMatches++;
    }
  }
  return numberOfMatches;
};

// Set input encoding
process.stdin.setEncoding("utf-8");

// Inform a user
console.log("Enter two numbers separated by a space.");

// Add user input handler
process.stdin.on("data", input => {
  if (validateInput(input)) {
    const [a, b] = input.split(" ");
    const result = countMatchingValues(Number(a), Number(b));
    console.log("Result:", result);
  } else {
    console.log("Invalid input. Please try again.");
  }
});

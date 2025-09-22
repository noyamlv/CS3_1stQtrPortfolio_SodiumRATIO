function makeAsteriskTriangle(height) {
    for (let i = 1; i <= height; i++) {
      // A string of spaces to create the indent
      let spaces = ' '.repeat(height - i);
      // A string of asterisks
      let asterisks = '*'.repeat(i);
      // Print the complete line
      console.log(spaces + asterisks);
    }
  }
  
  // Example usage:
  makeAsteriskTriangle(5);
class CalculatorError extends Error {
  constructor(message) {
    super(message);
    this.name = "CalculatorError";
  }
}

let form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  let output = document.querySelector('output');
  let firstNumInput = document.querySelector('#first-num').value;
  let secondNumInput = document.querySelector('#second-num').value;
  let operator = document.querySelector('#operator').value;

  try {
    if (!firstNumInput || !secondNumInput || isNaN(firstNumInput) || isNaN(secondNumInput)) {
      throw new CalculatorError("Invalid input: Please enter valid numbers");
    }

    let firstNum = parseFloat(firstNumInput);
    let secondNum = parseFloat(secondNumInput);

    if (operator === '/' && secondNum === 0) {
      throw new CalculatorError("Math Error: Division by zero is not allowed");
    }

    let result = eval(`${firstNum} ${operator} ${secondNum}`);
    output.innerHTML = result;

  } catch (err) {
    if (err instanceof CalculatorError) {
      console.error(`Calculator Error: ${err.message}`);
      output.innerHTML = "Error: Check Console";
    } else {
      console.error(`Unexpected Error: ${err}`);
      output.innerHTML = "An unexpected error occurred";
    }
  } finally {
    console.log("Calculation attempt finished");
  }
});

let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

const consoleDemos = {
  "Console Log": () => console.log("Console log message"),
  "Console Error": () => console.error("Console Error message"),
  "Console Count": () => console.count("Count Button Clicked"),
  "Console Warn": () => console.warn("Warning message from Console Warn"),
  "Console Assert": () => {
    const expectedValue = 5;
    const actualValue = 3;
    const errorMsg = `Error: Expected ${expectedValue}, but got ${actualValue}`;
    console.assert(actualValue === expectedValue, { actualValue, errorMsg });
  },
  "Console Clear": () => console.clear(),
  "Console Dir": () => console.dir(document.querySelector('form')),
  "Console dirxml": () => console.dirxml(document.querySelector('form')),
  "Console Group Start": () => {
    console.group("My Console Group");
    console.log("Inside the group: Item 1");
    console.log("Inside the group: Item 2");
  },
  "Console Group End": () => console.groupEnd("My Console Group"),
  "Console Table": () => {
    const students = [
      { name: "Devin Vassell", major: "Business", year: "Junior" },
      { name: "Victor Wembanyama", major: "Astronomy", year: "Senior" },
      { name: "Stephon Castle", major: "Aerospace", year: "Sophomore" }
    ];
    console.table(students);
  },
  "Start Timer": () => console.time("Timer Demo"),
  "End Timer": () => console.timeEnd("Timer Demo"),
  "Console Trace": () => {
    const deepFunction = () => console.trace("Trace message from deepFunction");
    const shallowFunction = () => deepFunction();
    shallowFunction();
  }
};

errorBtns.forEach(btn => {
  const btnText = btn.textContent;
  if (consoleDemos[btnText]) {
    btn.addEventListener('click', consoleDemos[btnText]);
  }
});

window.onerror = function (message, source, lineno, colno, error) {
  console.log(`Global Error: Message: ${message} at line ${lineno}`);
  // return true; 
};

const triggerGlobalErrorBtn = Array.from(document.querySelectorAll('#error-btns > button'))
    .find(btn => btn.textContent === "Trigger a Global Error");

triggerGlobalErrorBtn.addEventListener('click', () => {
  nonExistentFunction(); 
});
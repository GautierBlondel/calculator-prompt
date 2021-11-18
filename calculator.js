import { createInterface } from "readline";

const inputCheckRegex = new RegExp(/\d|\s|[-+*/.\(\)/]/);

const userInputIntoTabsArray = (userInput) => {
  const numbersArr = userInput
    .split(/[-\+\*\/\(\)]+/)
    .filter((e) => e !== "")
    .map((elem) =>
      elem.includes(".") ? parseFloat(elem, 10) : parseInt(elem, 10)
    );
  console.log("userInput", userInput);

  console.log("numbersArr", numbersArr);

  const operatorsArr = userInput.split(/\d+/);
  operatorsArr.pop();

  return {
    numbers: numbersArr,
    operators: operatorsArr
  };
};

const userInputChecking = (userInput) => {
  const inputChecking = userInput
    .split("")
    .every((e) => inputCheckRegex.test(e));
  if (!inputChecking) {
    return false;
  } else return true;
};

const loopTroughOperatorsArray = (numbersArr, operatorsArr, result) => {
  for (let i = 0; i < operatorsArr.length; i++) {
    switch (operatorsArr[i]) {
      case "":
        result = result === 0 ? numbersArr[i] : result;
        break;
      case "+":
        result = result + numbersArr[i];
        break;
      case "-":
        result = result - numbersArr[i];
        break;
      case "*":
        result = result * numbersArr[i];
        break;
      case "/":
        result = result / numbersArr[i];
        break;
      default:
        console.log("You must specify an operator");
    }
  }
  return result;
};

let result = 0;

const calculator = (result) => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(
    `Enter you operation, result is ${result} so far `,
    (userInput) => {
      const isAnswerTrue = userInputChecking(userInput);
      if (!isAnswerTrue) {
        console.clear();
        console.log("A forbidden character has been found");
        rl.close();
        calculator(result);
      } else {
        const numbers = userInputIntoTabsArray(userInput).numbers;
        const operators = userInputIntoTabsArray(userInput).operators;

        const resultTest = loopTroughOperatorsArray(numbers, operators, result);
        rl.close();
        calculator(resultTest);
      }
    }
  );
};

calculator(result);

import { createInterface } from "readline";

const inputCheckRegex = new RegExp(/\d|\s|[-+*/.\(\)/]/);

const userInputIntoTabsArray = (userInput) => {
  const numbersArr = userInput
    .split(/[-\+\*\/\(\)]+/)
    .filter((e) => e !== "")
    .map((elem) => parseFloat(elem, 10));

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

const loopTroughOperatorsArray = (
  numbersArr,
  operatorsArr,
  result,
  hasTypo
) => {
  for (let i = 0; i < operatorsArr.length; i++) {
    switch (operatorsArr[i]) {
      case "":
        if (result !== 0 && !hasTypo) {
          console.log("you must specify an operator to modify your result");
          result = result;
        } else if (result === 0) {
          result = numbersArr[i];
        } else {
          result = result + numbersArr[i];
        }
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
        const typOperation = operators.some((e) => /[-\+\*\/\(\)]+/.test(e));
        const resultTest = loopTroughOperatorsArray(
          numbers,
          operators,
          result,
          typOperation
        );
        console.log("typOperation", typOperation);

        rl.close();
        calculator(resultTest);
      }
    }
  );
};

calculator(result);

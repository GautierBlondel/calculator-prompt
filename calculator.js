import { createInterface } from "readline";

const inputCheckRegex = new RegExp(/\d|\s|[-+*/.\(\)/]/);

const userInputIntoTabsArray = (userInput) => {
  return userInput.split("").filter((e) => e !== " ");
};

const userInputChecking = (userInput) => {
  const answerCheckingArray = userInputIntoTabsArray(userInput);
  const inputChecking = answerCheckingArray.every((e) =>
    inputCheckRegex.test(e)
  );
  if (!inputChecking) {
    return false;
  } else return true;
};

const loopTroughOperatorsArray = (numbersArr, operatorsArr) => {
  for (let i = 0; i < operatorsArr.length; i++) {
    switch (operatorsArr[i]) {
      case "":
        result = numbersArr[i];
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
        console.log("default");
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
      } else {
        const answer = userInputIntoTabsArray(userInput).join("");
        console.log("answer", answer);
        const numbersArr = answer
          .split(/[-\+\*\/\.\(\)]+/)
          .map((elem) => parseInt(elem));
        const operatorsArr = answer.split(/\d+/);
        operatorsArr.pop();
        console.log("numbersArr", numbersArr);
        console.log("operatorsArr", operatorsArr);

        const resultTest = loopTroughOperatorsArray(numbersArr, operatorsArr);
        console.log("Your result is: ", resultTest);
        rl.close();
        calculator(resultTest);
      }
    }
  );
};

calculator(result);

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const welcomeMessage = chalkAnimation.rainbow(`Welcome To Muhammad Khubaib Calculator\n`);
    await sleep();
    welcomeMessage.stop();
}
await welcome();
let restartCalc = true;
do {
    const answer = await inquirer.prompt([
        {
            name: "operator",
            type: "list",
            message: "Please select your desire Operation: ",
            choices: [
                "Addition",
                "Subtraction",
                "Multiplication",
                "Division",
                "x Raise to the Power y",
            ],
        },
        {
            name: "firstNumber",
            type: "number",
            message: "Please Enter first Number: ",
        },
        {
            name: "secondNumber",
            type: "number",
            message: "Please Enter Second Number: ",
        },
    ]);
    if (!isNaN(answer.firstNumber) && !isNaN(answer.secondNumber)) {
        let result = calculation(answer.operator, answer.firstNumber, answer.secondNumber);
        if (answer.operator === "x Raise to the Power y") {
            console.log(chalk.blue(`${answer.firstNumber} raise to the power ${answer.secondNumber} is: ${result}`));
        }
        else {
            console.log(chalk.blue(`${answer.operator} is: ${result}`));
        }
    }
    else {
        console.log(chalk.red(`Wrong Entry, You must enter Numbers Only!`));
    }
    const restart = await inquirer.prompt([
        {
            name: "reset",
            type: "input",
            message: "Do you want to continue operation: Y/N",
        },
    ]);
    restartCalc =
        restart.reset === "Y" ||
            restart.reset === "y" ||
            restart.reset === "Yes" ||
            restart.reset === "yes"
            ? true
            : false;
} while (restartCalc);
function calculation(opt, numFirst, numSecond) {
    switch (opt) {
        case "Addition":
            return numFirst + numSecond;
        case "Subtraction":
            return numFirst - numSecond;
        case "Multiplication":
            return numFirst * numSecond;
        case "Division":
            return numFirst / numSecond;
        case "x Raise to the Power y":
            return numFirst ** numSecond;
    }
    return 0;
}

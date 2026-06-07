import { test } from "@playwright/test";
import chalk from "chalk";

export async function log(level, message) {

    const plainLine = `[${level.toUpperCase()}]: ${message}`;
    console.log(plainLine);

    //Pick color based on log level
    let coloredLine;
    switch(level){
        case "info":
            coloredLine = chalk.blue(plainLine)
            break;
        case "warn":
            coloredLine = chalk.yellow(plainLine)
            break;
        case "error":
            coloredLine = chalk.red(plainLine)
            break;
        default:
            coloredLine = chalk.white(plainLine)
    }

    //Print colored text in terminal
    (console[level] || console.log)(coloredLine)

    //Send plain text to Allure
    await test.step(plainLine, async() => {})
}

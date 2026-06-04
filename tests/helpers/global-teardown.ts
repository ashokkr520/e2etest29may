import { type FullConfig } from "@playwright/test";
import {exec} from "child_process"


export default async function globalTearDown(config: FullConfig) {

   //Executed after all workers complete. Good place for cleanup tasks
    console.log(`[INFO]: Starting the global teardown process...`);
    

    //Generate Allure reports for local runs
    if (process.env.RUNNER?.toUpperCase() === "LOCAL") {

      console.log(">> Local run detected - starting Allure server...")
      exec("allure serve", (error, stdout, stderr) => {
        if(error){
          console.error("Error: Starting Allure server:", error.message);
        }
      })

    }

  console.log(`[INFO]: Completed the global setup...`);

  }

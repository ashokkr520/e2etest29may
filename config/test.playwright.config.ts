import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config.ts";
import { EnvConfig } from "../tests/helpers/config-fixtures.ts";
import path from "path";

console.log(`---RUNNING TESTS IN TEST ENV---`);

export default defineConfig<EnvConfig>({
  ...baseConfig, //Loads all existing config values.
     testDir: path.resolve(process.cwd(), "./tests"), //Override the testDir for this config.

  use: {
    ...baseConfig.use, //Loading the existing use object
    envName: "test",
    appURL: "https://katalon-demo-cura.herokuapp.com/",
    dbConfig: {
      server: "",
      dbname: "",
      connectionStr: "",
    },
  },
});

import type { Config } from "jest";

const config: Config = {
  verbose: true,
  moduleFileExtensions: ["js", "ts"],
  testEnvironment: "node",
  testRegex: ".spec.ts$",
  transform: {
    "\\.[jt]sx?$": "ts-jest",
  },
};

export default config;

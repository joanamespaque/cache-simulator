import { argv } from "node:process";

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

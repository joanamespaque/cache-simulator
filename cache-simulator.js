import { argv } from "node:process";
import { Buffer } from "node:buffer";
import * as fs from "node:fs";

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

try {
  const data = fs.readFileSync("./addresses/bin_10000.bin");
  for (let i = 0; i <= data.length - 4; i += 4) {
    console.log(data.readInt32BE(i));
  }
} catch (error) {
  console.error(error);
}

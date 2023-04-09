import { argv } from "node:process";
import * as fs from "node:fs";

// argv indexes:
// index 0: node path
// index 1: path do arquivo executado
// o restante:
// <nsets> <bsize> <assoc> <substituição> <flag_saida> arquivo_de_entrada

const info = {
  nsets: argv[2],
  bsize: argv[3],
  assoc: argv[4],
  replace: argv[5],
  out_flag: argv[6],
  file_path: `./addresses/${argv[7]}`,
};

const addresses = [];

try {
  const data = fs.readFileSync(info["file_path"]);
  for (let i = 0; i <= data.length - 4; i += 4) {
    addresses.push(data.readInt32BE(i));
  }
  console.log(addresses);
} catch (error) {
  console.error(error);
}

console.log();

import { argv } from "node:process";
import * as fs from "node:fs";

// argv indexes:
// index 0: node path
// index 1: path do arquivo executado
// o restante:
// <nsets> <bsize> <assoc> <substituição> <flag_saida> arquivo_de_entrada

try {
  // objeto com as informações passadas pela linha de comando
  // tratamento de erros
  const replacement_types = ["R", "LRU", "FIFO"];

  if (argv.length !== 8) {
    throw new Error("Faltando argumentos na linha de comando!");
  } else if (!replacement_types.includes(argv[5])) {
    throw new Error(
      "Verifique a política de substituição passada como argumento."
    );
  } else if (argv[6] !== "1" && argv[6] !== "0") {
    throw new Error("Verifique o modo de saída passado como argumento.");
  }
  const info = {
    nsets: argv[2],
    bsize: argv[3],
    assoc: argv[4],
    replace: argv[5],
    out_flag: argv[6],
    file_path: `./addresses/${argv[7]}`,
  };

  const addresses = [];

  const data = fs.readFileSync(info["file_path"]);
  for (let i = 0; i <= data.length - 4; i += 4) {
    addresses.push(data.readInt32BE(i));
  }

  // TODO: #4 #3 calcular tamanho da cache
  // TODO: #5 criar cache como uma matriz, dependendo da associatividade
  // TODO: #6 calcular taxa de misses compulsórios, de capacidade e conflito
  // TODO: #7 calcular taxa de hits
} catch ({ message, code }) {
  console.error("Erro encontrado:", message);
  // verificar se a linha de comando tem o total correto de argumentos:
  if (code === "ENOENT") {
    console.error("Verifique o arquivo binário passado como argumento.");
  }
}

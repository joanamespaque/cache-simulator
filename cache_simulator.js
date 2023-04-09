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

  // TODO #1
  // A saída do simulador será um relatório de estatísticas com:
  // número total de acessos
  // número total hits e misses (os misses deverão ser classificados em compulsórios, capacidade e conflito)
  // • flag_saida = 0
  //      pode conter textos com labels para facilitar a visualização. Ex: Taxa de hits = 90%.
  // • flag_saida = 1
  //      Ex: 100000, 0.95, 0.06, 0.01, 0.02, 0.03
} catch ({ message, code }) {
  console.error("Erro encontrado:", message);
  // verificar se a linha de comando tem o total correto de argumentos:
  if (code === "ENOENT") {
    console.error("Verifique o arquivo binário passado como argumento.");
  }
}

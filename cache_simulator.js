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
  const replacement_types = ["R", "L", "F"];

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

  const data = fs.readFileSync(info.file_path);
  for (let i = 0; i <= data.length - 4; i += 4) {
    addresses.push(data.readInt32BE(i));
  }

  const n_access = addresses.length;

  const cache = [];
  // adiciona conjuntos a cache
  for (let n_set = 0; n_set < info.nsets; n_set++) {
    const set = [];
    for (let i = 0; i < info.assoc; i++) {
      // adiciona os blocos de acordo com a associatividade
      set.push({ val: 0, tag: null });
    }
    cache.push(set);
  }

  const n_bits_offset = Math.log2(info.bsize);
  const n_bits_indice = Math.log2(info.nsets);

  let n_compulsory_miss = 0;
  let n_capacity_miss = 0;
  let n_conflict_miss = 0;
  let n_hits = 0;

  addresses.forEach((item) => {
    const tag = item >> parseInt(n_bits_offset + n_bits_indice);
    const indice = (item >> parseInt(n_bits_offset)) &
      parseInt(Math.pow(2, n_bits_indice) - 1);
    const index = indice % info.nsets;
    // para mapeamento direto:
    if (info.assoc == 1) {
      // na posição 0 bit de validade, posição 1 tag para comparação
      const current = cache[index][0];
      if (current.val === 0) {
        n_compulsory_miss++;
        cache[index][0] = { val: 1, tag };
      } else {
        if (current.tag === tag) {
          n_hits++;
        } else {
          n_conflict_miss++;
          cache[index][0] = { val: 1, tag };
        }
      }
    } else {
      // para totalmente associativo
      const cache_set = info.nsets == 1 ? 0 : index;

      let full = false;
      cache[cache_set].every((item, i) => {
        if (item.val == 0) {
          n_compulsory_miss++;
          cache[cache_set][i] = { val: 1, tag };
          full = true;
          return false;
        } else if (item.tag === tag) {
          n_hits++;
          full = true;
          return false;
        }
        return true;
      });

      if (!full) {
        // capacidade ou conflito?
        if (info.nsets != 1) {
          // calcularei misses de conflito
          let count_empty = 0;
          cache.every((set) => {
            set.forEach((block) => {
              block.val === 0 && count_empty++;
            });
            return !(count_empty !== 0);
          });

          if (count_empty !== 0) {
            n_conflict_miss++;
          } else {
            n_capacity_miss++;
          }
        } else {
          // cache totalmente associativa, n_conflict_misses === 0
          n_capacity_miss++;
        }

        const random_index = parseInt(Math.random() * parseInt(info.assoc));
        cache[cache_set][random_index].tag = tag;
      }
    }
  });

  const misses = n_capacity_miss + n_compulsory_miss + n_conflict_miss;
  const hit_rate = (n_hits / n_access).toFixed(4);
  const miss_rate = (misses / n_access).toFixed(4);
  const n_compulsory_miss_rate = (n_compulsory_miss / misses).toFixed(2);
  const n_capacity_miss_rate = (n_capacity_miss / misses).toFixed(2);
  const n_conflict_miss_rate = (n_conflict_miss / misses).toFixed(2);

  const print_message = {
    0: `acessos: ${n_access}\n`
      + `hit rate: ${hit_rate}\n`
      + `miss rate: ${miss_rate}\n`
      + `compulsory miss: ${n_compulsory_miss_rate}\n`
      + `capacity miss: ${n_capacity_miss_rate}\n`
      + `conflict miss: ${n_conflict_miss_rate}`,
    1: `${n_access} `
      + `${hit_rate} `
      + `${miss_rate} `
      + `${n_compulsory_miss_rate} `
      + `${n_capacity_miss_rate} `
      + `${n_conflict_miss_rate}`
  };

  console.log(print_message[info.out_flag]);

} catch ({ message, code }) {
  console.error("Erro encontrado: ", message);
  // verificar se a linha de comando tem o total correto de argumentos:
  if (code === "ENOENT") {
    console.error("Verifique o arquivo binário passado como argumento.");
  }
}

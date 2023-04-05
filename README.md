## Trabalho 2 - Arquitetura e Organização de Computadores II

### :rocket: Guia de execução

Para executar esse projeto, é necessário que você tenha o node instalado na sua máquina.

Primeiro verifique se o node já está instalado

```
$ node --version
```

Se não estiver instalado, instale usando o gerenciador de pacote de distribuição

Antes de tudo, atualize o seu índice de pacotes locais

```
$ sudo apt update
```

Depois instale o Node.js

```
$ sudo apt install nodejs
```

Para verificar se a instalação foi realizada corretamente, execute novamente

```
$ node --version
```

Agora precisamos instalar as dependências do projeto, utilize

```
$ npm install
```

### :computer: Projeto - Simulador de Cache

A configuração de cache deverá ser repassada por linha de comando e formatada com os seguintes
parâmetros (o arquivo de entrada poderá ter extensão):

```
$ node cache-simulator.js <nsets> <bsize> <assoc> <substituição> <flag_saida> arquivo_de_entrada
```

Onde cada um destes campos possui o seguinte significado:

- cache-simulator.js - nome e extensão do arquivo de execução principal do simulador
- nsets - número de conjuntos na cache;
- bsize - tamanho do bloco em bytes;
- assoc - grau de associatividade;
- substituição - política de substituição, que pode ser Random (R), FIFO (F) ou L (LRU);
- flag_saida - flag que ativa o modo padrão de saída de dados;
- arquivo_de_entrada - arquivo com os endereços para acesso à cache.

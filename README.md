## Trabalho 2 - Arquitetura e Organização de Computadores II


### :rocket: Guia de execução

Para executar esse projeto, é necessário que você tenha python3 instalado na sua máquina.

Primeiro verifique se o Python já está instalado

```
$ python --version
```

Se o Python não estiver instalado, instale usando o gerenciador de pacote de distribuição

```
$ sudo apt-get install python3
```

Para verificar se a instalação foi realizada corretamente, execute

```
$ python3 --version
```

### :computer: Projeto - Simulador de Cache
A configuração de cache deverá ser repassada por linha de comando e formatada com os seguintes
parâmetros (o arquivo de entrada poderá ter extensão):

```
$ cache_simulator <nsets> <bsize> <assoc> <substituição> <flag_saida> arquivo_de_entrada
```

Onde cada um destes campos possui o seguinte significado:
- cache_simulator - nome do arquivo de execução principal do simulador (todos devem usar este
nome, independente da linguagem escolhida;
- nsets - número de conjuntos na cache;
- bsize - tamanho do bloco em bytes;
- assoc - grau de associatividade;
- substituição - política de substituição, que pode ser Random (R), FIFO (F) ou L (LRU);
- flag_saida - flag que ativa o modo padrão de saída de dados;
- arquivo_de_entrada - arquivo com os endereços para acesso à cache.
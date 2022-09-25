### Tradutor Automatizado

## Aplicação simples para automatizar o processo de tradução para os demais idiomas

Para utilizar, é preciso baixar as dependências e então executar "npm start" para rodar o
servidor em "server.js".

Ele basicamente recebe parâmetros, acessa a rota do google tradutor, e usa a biblioteca
"puppeteer" para fazer o webscrapping, buscando pela classe do elemento HTML o conteúdo
com a palavra ou frase traduzida.

Com o servidor funcionando, executar "npm run translate" para executar o "translate.js",
que basicamente recebe um objeto contendo as frases e palavras a serem traduzidas, em
inglês, para os outros idiomas.

Ele executa um ciclo "for of" em que para cada item do objeto envia uma requisição para o
servidor, e ao final armazena em um arquivo ".json" para cada idioma.

Para fazer a tradução em bloco, é preciso substituir o conteúdo do "object" do arquivo
"user.js" pelo objeto a ser traduzido.

Quando há uma palavra em que o google tradutor encontra dois significados, ele acabava não
encontrando a tradução e esperando o timeout de 30s. Refatorei para aguardar somente 10s e
após isso procurar pelo segundo significado a partir do nome de outra classe, assim não
retorna mais "undefined".

Ele retorna de forma errada se dentro da string tiver o caracter "%", e nesse caso também
é preciso fazer a correção manualmente.

Refatorei o código para executar as promises de forma assíncrona, utilizando
"Promise.all".

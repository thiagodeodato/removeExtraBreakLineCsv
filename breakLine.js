const fs = require('fs');
const readline = require('readline');
//var pathHeaderFile = 'header.csv';
var pathReadFile = 'testIn.csv';
var pathWriteFile = 'testOut.csv';

function removeBreakLine (pathReadFile, pathWriteFile) {
  const rl = readline.createInterface({
    input: fs.createReadStream(pathReadFile, {encoding: 'latin1'}),
    crlfDelay: Infinity
  });

  var semiColonQuantity = 0;
  var qntLinhaAtual = 0;
  var linhaAtual = 1;
  var conteudoLinha;
  var timeBeforeExecute = new Date(Date.now());
  //console.time("breakLine");
  rl.on('line', (line) => {
    if (linhaAtual <= 1) {
      // Counting ';' in read file header
      //console.log('qnt de ; da linha ->',(line.match(/;/g) || []).length);
      semiColonQuantity = (line.match(/;/g) || []).length;
      linhaAtual++;
    } else{
      qntLinhaAtual += (line.match(/;/g) || []).length;
      (line.match(/;/g) || []).length
    
      if (qntLinhaAtual < semiColonQuantity){
        conteudoLinha = line.replace(/(\r\n|\n|\r)/gm, ' ');
      } else {
        conteudoLinha = line + "\n";
        qntLinhaAtual = 0;
      }
      try {
        fs.appendFileSync(pathWriteFile, conteudoLinha, 'latin1');
      } catch (err) {
        console.error(err);
      }
      linhaAtual++;
    }
  });
  //console.timeEnd("breakLine");
}


removeBreakLine (pathReadFile, pathWriteFile);
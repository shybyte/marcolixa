var fs = require('fs');

var todoFileContent = fs.readFileSync('../.mix/TODO.txt', {encoding: 'utf8'});

var reg = /\[(\d+):(\d+)\]/g;
var time = 0
var currentMatch;
while ((currentMatch = reg.exec(todoFileContent)) !== null) {
  var hours = parseInt(currentMatch[1]);
  var mins = parseInt(currentMatch[2]);
  time += hours * 60 + mins;
}

console.log('Time', (Math.floor(time / 60)) + ':' + (time % 60));



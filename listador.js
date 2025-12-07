const fs = require('fs');
const path = require('path');

const txtPath = path.join(__dirname,'photos.txt');
const gallery = [];

if (fs.existsSync(txtPath)) {
  const lines = fs.readFileSync(txtPath,'utf8').split(/\r?\n/).filter(x=>x.trim());
  for (const line of lines) gallery.push(line.trim());
}

function render(){
  const g = document.getElementById('gallery');
  g.innerHTML = gallery.map(url=>`<img src="${url}" style="width:200px;margin:5px;">`).join('');
}

if (typeof window !== 'undefined') render();

const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'fotos');
const outputFile = path.join(__dirname, 'fotos.json');

let fotos = [];

if (fs.existsSync(directoryPath)) {
    const files = fs.readdirSync(directoryPath);
    fotos = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
}

fs.writeFileSync(outputFile, JSON.stringify(fotos, null, 2));

console.log('fotos.json generado correctamente');

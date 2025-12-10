const express = require("express");
const path = require("path");

const app = express();

// Servir todos los archivos estáticos (index.html, fotos.json, scripts, etc.)
app.use(express.static(path.join(__dirname)));

// Puerto asignado por Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor funcionando en puerto " + PORT);
});

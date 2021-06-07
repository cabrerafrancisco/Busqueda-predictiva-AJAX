const express = require('express');
const path = require("path");
const app = express();
const PORT = 3001;
const jsonPaises = require("./paises.json");
const index = path.join(__dirname , "clien/index.html")

// Carpeta de recursos estáticos
app.use(express.static(path.join(__dirname, "client")));

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}...`);
  });
  
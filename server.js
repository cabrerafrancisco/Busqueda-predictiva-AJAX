const express = require('express');
const path = require("path");
const app = express();
const PORT = 3001;
const jsonPaises = require("./paises.json");
const jsonAllPaises = require("./Allpaises.json")
const index = path.join(__dirname , "clien/index.html")

// Carpeta de recursos estáticos
app.use(express.static(path.join(__dirname, "client")));

app.get('/' , (req , res) => {
    res.sendFile(index)
})

app.get('/buscar' , (req , res) => {
    
    let agregar = jsonAllPaises;
    /* 
    ----- dejo el metodo para usar el otro json -----
    let result = jsonPaises.paises;
    if(req.query.paises){
        result = result.filter((element) => element.toLowerCase().includes(req.query.paises.toLowerCase()));
    }
    */
    if(req.query.paises){
        agregar = agregar.filter((element) => element.translations.es.toLowerCase().includes(req.query.paises.toLowerCase()));
    }

    res.json(agregar);
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}...`);
  });
  
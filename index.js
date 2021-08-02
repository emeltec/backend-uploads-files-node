const express = require('express');
const routes = require('./server/routes');
const cors = require('cors');

const PORT = process.env.PORT || 3000;


// SERVIDOR
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Rutas del APP
app.use('/', routes())

// Carpeta publica
app.use(express.static('./server/uploads'));


app.listen(PORT, () => {
  console.log('Listen on port: ', PORT);
})
require('dotenv').config();
const express = require('express');

//seguridad del backend q permite especificar origenes permitidos
const cors = require('cors');

const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// funciones intermedias
app.use(cors()); //backend - fronted
app.use(express.json()); //api
app.use(express.urlencoded({extended: true})); //form

// archivos staticos del servidor (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// rutas de la api
app.use('/api/productos',require('./@routes/producto'));
app.use('/api/marcas',require('./@routes/marcas'));

app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
})
app.use((err, req, res, next) =>{
    console.error(err);
    res.status(500).json({success: false, message: err.message});
})
app.listen(port, () => {
    console.log(`Servidor web en http://localhost:${port}`);
    console.log(`Api productos en http://localhost:${port}/api/productos`);
    console.log(`Api marcas en http://localhost:${port}/api/marcas`);
})

module.exports = app;
const express = require('express');
const router = express.Router();
const {pool} = require('../@config/db');

router.get('/', async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM marcas ORDER BY id DESC');
        res.json(rows);
    } catch(err){
        console.error(err);
        res.status(404).json({error: err.message});
    }
})
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const [rows] = await pool.query("select * FROM marcas WHERE id = ?", [id]);

        if (rows.length <1) {
            return res.status(404).json({success: false});
        }

        res.json(rows);
    } catch(err){
        console.error(err);
        res.status(404).json({error: err.message});
    }
})

router.post('/', async (req, res) => {
    const {nombremarca} = req.body;

    if (!nombremarca) {
        return res.status(400).json({success: false});
    }
    const [query] = await pool.query(`insert into marcas (nombremarca) value (?)`,[nombremarca]);

    return res.status(201).json({success: true, data: query.insertId});
})


router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {nombremarca} = req.body;

    if (!nombremarca) {
        return res.status(400).json({success: false});
    }
    const [result] = await pool.query("update marcas set nombremarca = ? where id = ?",[nombremarca,id]);
    if (result.affectedRows) {
        return res.status(201).json({success: true, data: "Se actualizó el dato"});
    } else {
        return res.status(404).json({success: false, data: "No se encontró el dato"});
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    const [productos] = await pool.query("select count(*) as total FROM productos WHERE idmarca = ?", [id]);

    if (productos.total > 1) {
        return res.status(409).json({success: false, msg: "Esta marca tiene productos en uso"});
    }

    if (!id) {
        return res.status(400).json({success: false});
    }
    const [result] = await pool.query("delete from marcas where id = ?", [id]);
    if (result.affectedRows) {
        return res.status(201).json({success: true, data: "Se actualizó el dato"});
    } else {
        return res.status(404).json({success: false, data: "No se encontró el dato"});
    }
})
module.exports = router;
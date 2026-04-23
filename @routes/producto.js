const express = require('express');
const router = express.Router();
const {pool} = require('../@config/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(404).json({error: err.message});
    }
})
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await pool.query("select * FROM productos WHERE id = ?", [id]);

        if (rows.length < 1) {
            return res.status(404).json({success: false});
        }

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(404).json({error: err.message});
    }
})

router.post('/', async (req, res) => {
    const {idmarca, nombre, precio, garantia, descripcion, fechacompra} = req.body;

    if (!idmarca || !nombre || !precio || !garantia || !fechacompra) {
        return res.status(400).json({success: false});
    }
    const [query] = await pool.query(`insert into productos (idmarca, nombre, precio, garantia, descripcion, fechacompra) value (?, ?, ?, ?, ?, ?)`, [idmarca, nombre, precio, garantia, descripcion, fechacompra]);

    return res.status(201).json({success: true, data: query.insertId});
})


router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {idmarca, nombre, precio, garantia, descripcion, fechacompra} = req.body;

    if (!idmarca || !nombre || !precio || !garantia || !fechacompra) {
        return res.status(400).json({success: false});
    }

    const [result] = await pool.query(
        `UPDATE productos
         SET idmarca = ?,
             nombre = ?,
             precio = ?,
             garantia = ?,
             descripcion = ?,
             fechacompra = ?
         WHERE id = ?`,
        [idmarca, nombre, precio, garantia, descripcion, fechacompra, id]
    );
    if (result.affectedRows) {
        return res.status(201).json({success: true, data: "Se actualizó el dato"});
    } else {
        return res.status(404).json({success: false, data: "No se encontró el dato"});
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({success: false});
    }

    const [result] = await pool.query("delete from productos where id = ?", [id]);
    if (result.affectedRows) {
        return res.status(201).json({success: true, data: "Se actualizó el dato"});
    } else {
        return res.status(404).json({success: false, data: "No se encontró el dato"});
    }
})
module.exports = router;
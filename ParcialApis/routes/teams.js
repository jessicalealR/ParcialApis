const express = require('express');
const router = express.Router();
const Team = require('../models/team');

// Ruta para obtener todos los equipos
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find().populate('players');
        res.json(teams);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ruta para obtener un equipo por su ID
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('players');
        if (!team) {
            return res.status(404).json({ mensaje: 'Equipo no encontrado' });
        }
        res.json(team);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;

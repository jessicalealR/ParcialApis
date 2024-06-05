const express = require('express');
const router = express.Router();
const Player = require('../models/Lealplayer');

// Crear un nuevo jugador
router.post('/', async (req, res) => {
    try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).json(player);
    } catch (err) {
        console.error('Error al crear un nuevo jugador:', err);
        res.status(500).send(err);
    }
});

// Recuperar todos los jugadores
router.get('/', async (req, res) => {
    try {
        const players = await Player.find().populate('team');
        res.json(players);
    } catch (err) {
        console.error('Error al recuperar todos los jugadores:', err);
        res.status(500).send(err);
    }
});

// Recuperar un jugador por su ID
router.get('/:id', async (req, res) => {
    try {
        console.log('Buscando jugador con ID:', req.params.id);
        const player = await Player.findById(req.params.id).populate('team');
        console.log('Resultado de la búsqueda:', player);
        if (!player) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        res.json(player);
    } catch (err) {
        console.error('Error al recuperar un jugador por su ID:', err);
        res.status(500).send(err);
    }
});

// Actualizar un jugador existente
router.put('/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log('Jugador actualizado:', player);
        if (!player) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        res.json(player);
    } catch (err) {
        console.error('Error al actualizar un jugador:', err);
        res.status(500).send(err);
    }
});

// Eliminar un jugador por su ID
router.delete('/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        console.log('Jugador eliminado:', player);
        if (!player) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        console.error('Error al eliminar un jugador:', err);
        res.status(500).send(err);
    }
});

module.exports = router;

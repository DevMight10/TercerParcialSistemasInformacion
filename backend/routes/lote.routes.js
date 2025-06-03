const express = require('express');
const router = express.Router();
const { obtenerLotesDisponibles, registrarVentaContado, crearLote, obtenerLotesVendidos } = require('../controller/lote.controller');

router.get('/disponibles', obtenerLotesDisponibles);
router.post('/venta', registrarVentaContado);
router.post('/crear', crearLote);
router.get('/vendidos', obtenerLotesVendidos)

module.exports = router;

const mongoose = require('mongoose');

const loteSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  proyecto: { type: String, required: true },
  estado: { type: String, enum: ['disponible', 'vendido'], default: 'disponible' },
  precioContado: { type: Number, required: true },
  precioCredito: { type: Number, required: true },
  comprador: {
    nombre: { type: String },
    ci: { type: String }
  },
  vendedor: {
    nombre: { type: String },
    codigo: { type: String }
  },
  tipoVenta: { type: String, enum: ['contado', 'credito'], default: null },
  fechaVenta: { type: Date }
});

module.exports = mongoose.model('Lote', loteSchema);

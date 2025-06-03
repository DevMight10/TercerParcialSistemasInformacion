const Lote = require('../model/lote.model');

const crearLote = async (req, res) => {
  try {
    const { codigo, proyecto, precioContado, precioCredito } = req.body;

    // Verificar que no exista el mismo código
    const existente = await Lote.findOne({ codigo });
    if (existente) {
      return res.status(400).json({ mensaje: 'Ya existe un lote con ese código' });
    }

    const nuevoLote = new Lote({
      codigo,
      proyecto,
      precioContado,
      precioCredito,
      estado: 'disponible'
    });

    await nuevoLote.save();
    res.status(201).json({ mensaje: 'Lote creado correctamente', lote: nuevoLote });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el lote', error });
  }
};

const obtenerLotesDisponibles = async (req, res) => {
  try {
    const lotes = await Lote.find({ estado: 'disponible' });
    res.status(200).json(lotes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener lotes disponibles', error });
  }
};

const registrarVentaContado = async (req, res) => {
  try {
    const { codigoLote, comprador, vendedor } = req.body;

    const lote = await Lote.findOne({ codigo: codigoLote });

    if (!lote) {
      return res.status(404).json({ mensaje: 'Lote no encontrado' });
    }

    if (lote.estado === 'vendido') {
      return res.status(400).json({ mensaje: 'Este lote ya fue vendido' });
    }

    const comision = lote.precioContado * 0.10;

    lote.estado = 'vendido';
    lote.tipoVenta = 'contado';
    lote.comprador = comprador;
    lote.vendedor = vendedor;
    lote.fechaVenta = new Date();

    await lote.save();

    res.status(200).json({
      mensaje: 'Venta registrada con éxito',
      loteVendido: lote,
      comisionVendedor: comision
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar la venta', error });
  }
};

// Obtener todos los lotes vendidos
const obtenerLotesVendidos = async (req, res) => {
  try {
    const lotes = await Lote.find({ estado: 'vendido' });
    res.status(200).json(lotes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener lotes vendidos', error });
  }
};


module.exports = {
  obtenerLotesDisponibles,
  registrarVentaContado,
  crearLote,
  obtenerLotesVendidos
};

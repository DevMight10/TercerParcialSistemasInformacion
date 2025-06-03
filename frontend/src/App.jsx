import { useState, useEffect } from 'react';
import './style.css';
import {
  crearLote,
  getLotesDisponibles,
  registrarVenta,
  getLotesVendidos
} from './services/api';

function App() {
  const [vista, setVista] = useState('crear');
  const [lotesDisponibles, setLotesDisponibles] = useState([]);
  const [lotesVendidos, setLotesVendidos] = useState([]);

  const [nuevoLote, setNuevoLote] = useState({
    codigo: '',
    proyecto: '',
    precioContado: '',
    precioCredito: ''
  });

  const [venta, setVenta] = useState({
    codigoLote: '',
    compradorNombre: '',
    compradorCI: '',
    vendedorNombre: '',
    vendedorCodigo: ''
  });

  const cargarDisponibles = async () => {
    try {
      const res = await getLotesDisponibles();
      setLotesDisponibles(res.data);
    } catch (err) {
      alert('Error al obtener lotes disponibles');
    }
  };

  const cargarVendidos = async () => {
    try {
      const res = await getLotesVendidos();
      setLotesVendidos(res.data);
    } catch (err) {
      alert('Error al obtener lotes vendidos');
    }
  };

  useEffect(() => {
    if (vista === 'disponibles') cargarDisponibles();
    if (vista === 'vendidos') cargarVendidos();
  }, [vista]);

  const handleCrearLote = async (e) => {
    e.preventDefault();
    try {
      await crearLote(nuevoLote);
      alert('Lote creado correctamente');
      setNuevoLote({ codigo: '', proyecto: '', precioContado: '', precioCredito: '' });
    } catch (err) {
      alert('Error al crear lote');
    }
  };

  const handleRegistrarVenta = async (e) => {
    e.preventDefault();
    try {
      await registrarVenta({
        codigoLote: venta.codigoLote,
        comprador: {
          nombre: venta.compradorNombre,
          ci: venta.compradorCI
        },
        vendedor: {
          nombre: venta.vendedorNombre,
          codigo: venta.vendedorCodigo
        }
      });
      alert('Venta registrada con éxito');
      setVenta({ codigoLote: '', compradorNombre: '', compradorCI: '', vendedorNombre: '', vendedorCodigo: '' });
    } catch (err) {
      alert('Error al registrar venta');
    }
  };

  return (
    <div className="container">
      <h1>Sistema de Gestión de Lotes</h1>

      <nav className="tabs">
        <button onClick={() => setVista('crear')} className={vista === 'crear' ? 'active' : ''}>Crear Lote</button>
        <button onClick={() => setVista('disponibles')} className={vista === 'disponibles' ? 'active' : ''}>Ver Lotes Disponibles</button>
        <button onClick={() => setVista('venta')} className={vista === 'venta' ? 'active' : ''}>Registrar Venta</button>
        <button onClick={() => setVista('vendidos')} className={vista === 'vendidos' ? 'active' : ''}>Ver Lotes Vendidos</button>
      </nav>

      <div className="content">
        {vista === 'crear' && (
          <form onSubmit={handleCrearLote}>
            <input placeholder="Código" value={nuevoLote.codigo} onChange={e => setNuevoLote({ ...nuevoLote, codigo: e.target.value })} />
            <input placeholder="Proyecto" value={nuevoLote.proyecto} onChange={e => setNuevoLote({ ...nuevoLote, proyecto: e.target.value })} />
            <input type="number" placeholder="Precio Contado" value={nuevoLote.precioContado} onChange={e => setNuevoLote({ ...nuevoLote, precioContado: e.target.value })} />
            <input type="number" placeholder="Precio Crédito" value={nuevoLote.precioCredito} onChange={e => setNuevoLote({ ...nuevoLote, precioCredito: e.target.value })} />
            <button type="submit">Crear</button>
          </form>
        )}

        {vista === 'disponibles' && (
          <table className="tabla">
            <thead>
              <tr>
                <th>Código</th>
                <th>Proyecto</th>
                <th>Precio Contado</th>
                <th>Precio Crédito</th>
              </tr>
            </thead>
            <tbody>
              {lotesDisponibles.map(l => (
                <tr key={l._id}>
                  <td>{l.codigo}</td>
                  <td>{l.proyecto}</td>
                  <td>${l.precioContado}</td>
                  <td>${l.precioCredito}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {vista === 'venta' && (
          <form onSubmit={handleRegistrarVenta}>
            <select value={venta.codigoLote} onChange={e => setVenta({ ...venta, codigoLote: e.target.value })}>
              <option value="">-- Selecciona un lote --</option>
              {lotesDisponibles.map(l => (
                <option key={l._id} value={l.codigo}>{l.codigo} - {l.proyecto}</option>
              ))}
            </select>
            <input placeholder="Nombre del comprador" value={venta.compradorNombre} onChange={e => setVenta({ ...venta, compradorNombre: e.target.value })} />
            <input placeholder="CI del comprador" value={venta.compradorCI} onChange={e => setVenta({ ...venta, compradorCI: e.target.value })} />
            <input placeholder="Nombre del vendedor" value={venta.vendedorNombre} onChange={e => setVenta({ ...venta, vendedorNombre: e.target.value })} />
            <input placeholder="Código del vendedor" value={venta.vendedorCodigo} onChange={e => setVenta({ ...venta, vendedorCodigo: e.target.value })} />
            <button type="submit">Registrar Venta</button>
          </form>
        )}

        {vista === 'vendidos' && (
          <table className="tabla">
            <thead>
              <tr>
                <th>Código</th>
                <th>Proyecto</th>
                <th>Comprador</th>
                <th>CI</th>
                <th>Vendedor</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {lotesVendidos.map(l => (
                <tr key={l._id}>
                  <td>{l.codigo}</td>
                  <td>{l.proyecto}</td>
                  <td>{l.comprador?.nombre || 'N/A'}</td>
                  <td>{l.comprador?.ci || 'N/A'}</td>
                  <td>{l.vendedor?.nombre || 'N/A'}</td>
                  <td>{new Date(l.fechaVenta).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;

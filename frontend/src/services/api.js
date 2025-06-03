import axios from 'axios';

// URL base del backend (ajústala si cambia el puerto o dominio)
const API = 'http://localhost:3000/api';

// Crear un nuevo lote
export const crearLote = (data) => {
  return axios.post(`${API}/lotes/crear`, data);
};

// Obtener todos los lotes disponibles
export const getLotesDisponibles = () => {
  return axios.get(`${API}/lotes/disponibles`);
};

// Registrar una venta al contado
export const registrarVenta = (data) => {
  return axios.post(`${API}/lotes/venta`, data);
};

// Obtener todos los lotes vendidos
export const getLotesVendidos = () => {
  return axios.get(`${API}/lotes/vendidos`);
};

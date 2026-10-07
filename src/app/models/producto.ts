export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

// Un producto nuevo todavía no tiene id: lo asigna el servidor
export type ProductoNuevo = Omit<Producto, 'id'>;

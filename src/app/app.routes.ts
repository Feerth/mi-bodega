import { Routes } from '@angular/router';
import { ListaProductos } from './pages/lista-productos/lista-productos';
import { FormProducto } from './pages/form-producto/form-producto';
import { NoEncontrado } from './pages/no-encontrado/no-encontrado';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', component: ListaProductos,
    title: 'Inventario | MiBodega' },
  { path: 'productos/nuevo', component: FormProducto,
    title: 'Nuevo producto | MiBodega' },
  { path: 'productos/:id/editar', component: FormProducto,
    title: 'Editar producto | MiBodega' },
  { path: '**', component: NoEncontrado, title: 'No encontrado' }
];

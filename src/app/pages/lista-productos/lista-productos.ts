import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoApi } from '../../services/producto-api';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-lista-productos',
  imports: [RouterLink, CurrencyPipe, TitleCasePipe],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css'
})
export class ListaProductos implements OnInit {
  private api = inject(ProductoApi);

  productos = signal<Producto[]>([]);
  cargando = signal(true);
  error = signal('');

  valorInventario = computed(() =>
    this.productos().reduce((total, p) => total + p.precio * p.stock, 0));

  ngOnInit() {
    this.api.listar().subscribe({
      next: (datos) => {
        this.productos.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con el servidor. ¿Iniciaste json-server?');
        this.cargando.set(false);
      }
    });
  }

  eliminar(producto: Producto) {
    if (!confirm(`¿Eliminar "${producto.nombre}"?`)) return;

    this.api.eliminar(producto.id).subscribe({
      next: () => this.productos.update(lista =>
        lista.filter(p => p.id !== producto.id)),
      error: () => this.error.set('No se pudo eliminar el producto.')
    });
  }
}

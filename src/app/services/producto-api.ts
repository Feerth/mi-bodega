import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, ProductoNuevo } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoApi {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/productos';

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  obtener(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  crear(producto: ProductoNuevo): Observable<Producto> {
    return this.http.post<Producto>(this.url, producto);
  }

  actualizar(id: string, producto: ProductoNuevo): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/${id}`, producto);
  }

  eliminar(id: string): Observable<Producto> {
    return this.http.delete<Producto>(`${this.url}/${id}`);
  }
}

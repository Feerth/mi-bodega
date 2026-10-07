import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductoApi } from '../../services/producto-api';

type Campo = 'nombre' | 'categoria' | 'precio' | 'stock';

@Component({
  selector: 'app-form-producto',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form-producto.html',
  styleUrl: './form-producto.css'
})
export class FormProducto implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ProductoApi);
  private router = inject(Router);

  id = input<string>();          // solo llega al editar: /productos/:id/editar
  error = signal('');
  guardando = signal(false);
  categorias = ['Abarrotes', 'Bebidas', 'Lácteos', 'Limpieza'];

  form = this.fb.nonNullable.group({
    nombre:    ['', [Validators.required, Validators.minLength(3)]],
    categoria: ['', Validators.required],
    precio:    [0, [Validators.required, Validators.min(0.1)]],
    stock:     [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit() {
    const id = this.id();
    if (id) {
      this.api.obtener(id).subscribe({
        next: (producto) => this.form.patchValue(producto),
        error: () => this.error.set('El producto no existe.')
      });
    }
  }

  invalido(campo: Campo): boolean {
    const control = this.form.controls[campo];
    return control.invalid && control.touched;
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardando.set(true);
    const datos = this.form.getRawValue();
    const id = this.id();

    const peticion = id
      ? this.api.actualizar(id, datos)   // PUT
      : this.api.crear(datos);           // POST

    peticion.subscribe({
      next: () => this.router.navigate(['/productos']),
      error: () => {
        this.error.set('No se pudo guardar. Intenta de nuevo.');
        this.guardando.set(false);
      }
    });
  }
}

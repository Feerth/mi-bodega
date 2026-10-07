# MiBodega — Angular 20 + json-server

Inventario de una bodega con CRUD completo (GET, POST, PUT, DELETE) usando
servicios REST con `HttpClient` y un back-end simulado con `json-server`.

## Cómo ejecutarlo (necesitas Node 20.19+, 22.12+ o 24+)

Abre **dos terminales** dentro de la carpeta `mi-bodega`:

```bash
# Terminal 1 (una sola vez: npm install)
npm install
npx ng serve -o        # abre http://localhost:4200

# Terminal 2 (back-end, no la cierres)
npx json-server db.json   # API en http://localhost:3000/productos
```

Atajos: `npm start` (Angular) y `npm run api` (json-server).

## Rutas
| Ruta | Qué hace |
|------|----------|
| `/productos` | Lista (GET) y elimina (DELETE) |
| `/productos/nuevo` | Formulario (POST) |
| `/productos/:id/editar` | Carga (GET) y guarda (PUT) |
| `**` | Página 404 |

Las pruebas de la API están en `api.http` (extensión REST Client de VS Code).

## Preguntas de reflexión

1. **¿Qué cambió para que los datos no se pierdan al recargar?**
   En la semana 8 los datos vivían en un arreglo dentro de Angular (memoria del
   navegador), que se reinicia al recargar. Ahora viven en un back-end
   (`db.json` vía json-server) y la app los pide por HTTP en cada carga.

2. **¿Por qué los componentes usan `ProductoApi` y no `HttpClient` directamente?**
   Para tener la URL y las peticiones en un solo lugar: si la API cambia solo se
   edita el servicio. Los componentes quedan más simples, sin conocer detalles
   HTTP, y es más fácil reutilizar y probar el código.

3. **¿Qué pasaría si `navigate()` estuviera fuera del `subscribe`?**
   La petición es asíncrona: la navegación se ejecutaría de inmediato, antes de
   que el servidor responda. La lista podría cargarse sin el producto nuevo y, si
   el guardado falla, el usuario ya habría salido del formulario sin ver el error.

4. **`filter` sobre la señal vs. volver a llamar a `listar()`**
   - `filter`: es más rápido y evita otra petición, pero si otra persona cambió
     los datos en el servidor, la vista puede quedar desactualizada.
   - `listar()`: muestra el estado real del servidor, pero cuesta una petición
     extra y puede haber un parpadeo de carga.

5. **Validaciones que haría un back-end real y json-server no hace**
   Autenticación y autorización, validar tipos y rangos (precio > 0, stock ≥ 0),
   campos obligatorios y longitudes, nombres duplicados, categorías válidas,
   sanitización contra inyección/XSS, límites de tamaño y de peticiones, y
   reglas de negocio (no vender más de lo que hay en stock).

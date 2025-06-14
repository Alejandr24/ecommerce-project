# 🛒 E-commerce Full Stack - Prueba Técnica

Este proyecto es una tienda en línea desarrollada como parte de una prueba técnica. El sistema permite a usuarios registrados explorar productos, agregarlos a un carrito, y a administradores gestionar el inventario mediante un panel protegido.

## 🚀 Funcionalidades principales

### ✅ Autenticación y roles (JWT)
- Registro e inicio de sesión.
- Autenticación con JWT.
- Control de acceso según rol (`user` / `admin`).
- Acceso restringido a gestión de productos solo para administradores.

### 🛍️ Vista pública
- Listado de productos con nombre, precio, descripción e imagen.
- Filtros por nombre o categoría.
- Paginación a partir de 10 productos.

### ⚙️ Gestión de productos (solo admin)
- Crear, editar y eliminar productos.
- Validaciones completas.
- Acceso protegido por rol.

### 🛒 Carrito de compras (usuarios)
- Agregar productos desde la vista pública.
- Ver productos agregados, cantidad y total.
- Eliminar ítems del carrito.

### 👤 Panel de usuario
- Visualización del usuario logueado.
- Botón para cerrar sesión.
- Navegación segura entre páginas privadas y públicas.

---

## 🧑‍💻 Tecnologías utilizadas

### Frontend
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- Axios
- React Context (manejo de estado global)
- Hooks personalizados
- Routing dinámico y protegido

### Backend
- Node.js
- Express.js
- MySQL (compatible con PostgreSQL)
- JWT para autenticación
- Middleware de roles
- REST API modularizada

---

## ⚙️ Requisitos previos

- Node.js v18 o superior
- MySQL o PostgreSQL
- Git
- Visual Studio Code (opcional, recomendado)

---

## 🔧 Instrucciones para ejecutar el proyecto

1. Clonar este repositorio y ubicarte en la carpeta principal del proyecto.

2. Para el **backend**, entra en la carpeta `backend` e instala las dependencias con `npm install`.  
   Crea un archivo `.env` con las siguientes variables:

   - `PORT`: puerto para el backend (ej. 3001)
   - `DB_HOST`: host de la base de datos (ej. localhost)
   - `DB_USER`: usuario de la base de datos
   - `DB_PASSWORD`: contraseña de la base de datos
   - `DB_NAME`: nombre de la base de datos
   - `JWT_SECRET`: clave secreta para firmar los tokens JWT

   Luego, ejecuta el servidor con `npm run dev`.

3. Para el **frontend**, entra en la carpeta `frontend` e instala las dependencias con `npm install`.  
   Luego ejecuta el frontend con `npm run dev`.

---

## 🗃️ Base de datos

Este proyecto utiliza una base de datos SQL (MySQL o PostgreSQL). Incluye las siguientes tablas:

- `users`: para autenticación, almacenamiento de credenciales y control de roles.
- `products`: lista de productos disponibles para la tienda.
- `carts`: representación del carrito de cada usuario.
- `cart_items`: relación entre carritos y productos.

Se incluye un archivo `database.sql` con los scripts necesarios para crear la estructura completa de la base de datos.  
Recuerda crear al menos un usuario con rol `admin` para probar la gestión de productos.

---

## 🧪 Pruebas API

Puedes probar los endpoints utilizando la extensión **REST Client** para Visual Studio Code.  
Este repositorio incluye un archivo `test.http` con llamadas preconfiguradas para:

- Registro e inicio de sesión
- Obtener y crear productos
- Buscar, eliminar y paginar productos
- Gestión de carrito (agregar, ver, eliminar)

Solo debes reemplazar el token JWT generado en el login para las llamadas protegidas.

---

## 📌 Consideraciones finales

- El backend está construido con una estructura clara, utilizando controladores, rutas y middlewares separados.
- El frontend está dividido en componentes reutilizables, con rutas protegidas y formularios validados.
- Se utiliza Context API para el estado global del usuario y autenticación.
- Todo el flujo está protegido tanto en el backend como en el frontend por rol (`user` / `admin`).

---

## ✨ Autor

- Alejandro Quirós 

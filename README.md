# Sistema de gestión de citas médicas. - Backend

## Descripción
Medical Date es un sistema de gestión de citas médicas desarrollado en Node.js con Express y MongoDB. Permite gestionar pacientes, especialidades médicas y la asignación de citas.

## Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) para autenticación
- Express Validator para validación de datos
- CORS para seguridad de peticiones
- Dotenv para manejo de variables de entorno

## Estructura del Proyecto
```
mtdev2312-medical-date/
├── README.md
├── package.json
├── .env.example
└── src/
    ├── index.js
    ├── server.js
    ├── config/
    │   └── database.js
    ├── controllers/
    │   ├── auth_controller.js
    │   ├── dates_controller.js
    │   ├── patients_controller.js
    │   └── specialities_controller.js
    ├── helpers/
    │   ├── auth_validator.js
    │   ├── date_validator.js
    │   ├── patients_validator.js
    │   ├── specialities_validator.js
    ├── middlewares/
    │   ├── jwt.js
    │   └── middleware_validator.js
    ├── models/
    │   ├── date_model.js
    │   ├── patients_model.js
    │   ├── specialties_model.js
    │   └── user_model.js
    └── routers/
        ├── auth_routes.js
        ├── date_routes.js
        ├── patients_routes.js
        └── specialities_routes.js
```

## Instalación y Configuración
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/MTDEV2312/Medical-Date.git
   ```
2. Instalar dependencias:
   ```sh
   cd medical-date
   npm install
   ```
3. Configurar variables de entorno:
   - Copiar el archivo `.env.example` y renombrarlo como `.env`.
   - Completar la variable `MONGODB_URI` con la URL de conexión a la base de datos.

## Uso
### Iniciar el servidor
Ejecutar en modo desarrollo:
```sh
npm run dev
```
Ejecutar en modo producción:
```sh
npm start
```

## Endpoints Principales
### Autenticación
- `POST /api/login`: Iniciar sesión y obtener un token JWT.

### Pacientes
- `GET /api/patients`: Obtener todos los pacientes.
- `GET /api/patients/:email`: Obtener un paciente por email.
- `POST /api/patients`: Registrar un nuevo paciente.
- `PATCH /api/patients/:id`: Actualizar datos de un paciente.
- `DELETE /api/patients/:id`: Eliminar un paciente.

### Especialidades
- `GET /api/specialities`: Obtener todas las especialidades.
- `GET /api/specialities/:codigo`: Obtener una especialidad por código.
- `POST /api/specialities`: Registrar una nueva especialidad.
- `PATCH /api/specialities/:id`: Actualizar datos de una especialidad.
- `DELETE /api/specialities/:id`: Eliminar una especialidad.

### Citas
- `POST /api/date/register`: Registrar una nueva cita.
- `GET /api/date`: Obtener todas las citas.
- `GET /api/date/:codigo`: Obtener una cita por código.
- `PATCH /api/date/update/:id`: Actualizar datos de una cita.
- `DELETE /api/date/delete/:id`: Eliminar una cita.

## Autenticación
Para acceder a los endpoints protegidos, se requiere un token JWT que debe enviarse en la cabecera de la petición:
```sh
Authorization: Bearer <token>
```

## Contribución
Si deseas contribuir, por favor abre un issue o un pull request en el repositorio.

## Licencia
Este proyecto está bajo la licencia MIT.


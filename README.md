# Task Manager API

Una API REST completa para la gestión de tareas construida con NestJS, TypeScript y PostgreSQL.

##  Descripción

Esta API permite gestionar tareas de usuarios con funcionalidades completas de CRUD, filtrado, paginación y estados de tareas. Implementa arquitectura hexagonal con Domain-Driven Design (DDD) y cuenta con documentación interactiva con Swagger.

##  Características

-  **Gestión completa de tareas** (crear, listar, eliminar)
-  **Gestión de usuarios** (crear, listar, obtener por ID)
-  **Estados de tareas** configurables
-  **Filtrado avanzado** por estado, fecha y texto
-  **Paginación** de resultados
-  **Documentación Swagger** interactiva
-  **Arquitectura Hexagonal** con DDD
-  **AutoMapper** para mapeo de entidades
-  **TypeORM** con PostgreSQL
-  **Migraciones** de base de datos

##  Tecnologías

- **Framework**: NestJS
- **Lenguaje**: TypeScript
- **Base de Datos**: PostgreSQL
- **ORM**: TypeORM
- **Documentación**: Swagger/OpenAPI
- **Validación**: class-validator
- **Mapeo**: AutoMapper

##  Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JeffreyArg/Task-manager-backend.git
cd Task-manager-backend

# Instalar dependencias
npm install

# Configurar base de datos PostgreSQL
# Crear archivo .env con la configuración de la DB

# Ejecutar migraciones
npm run migration:run

# Ejecutar seeds (estados de tareas)
npm run seed:statuses
```

##  Ejecutar la aplicación

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod

# Modo debug
npm run start:debug
```

La aplicación estará disponible en: `http://localhost:3001`

##  Documentación API

###  Swagger UI
Accede a la documentación interactiva en: **http://localhost:3001/api/docs**

###  Endpoints Principales

####  Tareas (Tasks)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/tasks` | Crear nueva tarea |
| `GET` | `/users/:userId/tasks` | Listar tareas de usuario |
| `DELETE` | `/tasks/:taskId` | Eliminar tarea |

####  Usuarios (Users)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/users` | Crear nuevo usuario |
| `GET` | `/users` | Listar todos los usuarios |
| `GET` | `/users/:userId` | Obtener usuario por ID |

####  Estados de Tareas (Task Statuses)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/task-statuses` | Listar estados disponibles |

## 🔧 Ejemplos de Uso

### Crear una tarea

```bash
POST /tasks
Content-Type: application/json

{
  "title": "Completar proyecto",
  "description": "Descripción de la tarea",
  "status_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "user_id": "b47ac10b-58cc-4372-a567-0e02b2c3d480",
  "due_date": "2025-12-31T23:59:59Z"
}
```

### Listar tareas de un usuario con filtros

```bash
GET /users/b47ac10b-58cc-4372-a567-0e02b2c3d480/tasks?status_id=f47ac10b-58cc-4372-a567-0e02b2c3d479&page_number=1&page_size=10&search_text=proyecto
```

### Crear un usuario

```bash
POST /users
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "name": "Harold Arguello"
}
```

##  Estructura del Proyecto

```
src/
├── main.ts                              # Punto de entrada de la aplicación
├── app.module.ts                        # Módulo principal
└── contexts/
    ├── shared/
    │   ├── database/                    # Configuración de base de datos
    │   └── pagination/                  # Utilidades de paginación
    └── tasks-management/
        ├── tasks.module.ts              # Módulo de tareas
        ├── user.module.ts               # Módulo de usuarios
        ├── application/
        │   └── use-cases/               # Casos de uso
        ├── domain/
        │   └── ports/                   # Interfaces del dominio
        └── infrastructure/
            ├── controllers/             # Controladores REST
            ├── mapping/                 # Mapeo AutoMapper
            └── persistence/             # Capa de persistencia
```

##  Base de Datos

### Comandos de Migración

```bash
# Generar nueva migración
npm run migration:generate -- src/migrations/NombreMigracion

# Crear migración vacía
npm run migration:create -- src/migrations/NombreMigracion

# Ejecutar migraciones
npm run migration:run

# Revertir migración
npm run migration:revert

# Ejecutar seeds
npm run seed:statuses
```

##  Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura
npm run test:cov

# Tests en modo watch
npm run test:watch
```

##  Funcionalidades Avanzadas

### Filtrado de Tareas
- **Por estado**: Filtrar tareas por su estado actual
- **Por fecha**: Rango de fechas límite (desde/hasta)
- **Por texto**: Búsqueda en título y descripción
- **Paginación**: Control de página y tamaño

### Validaciones
- Validación automática de DTOs con `class-validator`
- Transformación de tipos con `class-transformer`
- Sanitización de datos de entrada

### Mapeo Automático
- Mapeo entre entidades y DTOs con AutoMapper
- Conversión de convenciones de nombres (camelCase ↔ snake_case)
- Transformación de fechas y tipos

##  Despliegue

### Docker (Próximamente)
```bash
# Construir imagen
docker build -t task-manager-api .

# Ejecutar contenedor
docker run -p 3001:3000 task-manager-api
```

### Variables de Entorno
Crear archivo `.env`:

# Task Manager Backend (NestJS + TypeORM + Postgres)

API para gestionar tareas asignadas a usuarios, con filtros y paginación. Documentada con Swagger.

## Requisitos
- Docker y Docker Compose

## Configuración
1. Copia el archivo de variables:
   ```bash
   cp .env.example .env


##  Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

##  Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**Desarrollado usando NestJS y TypeScript**
# Arquitectura Hexagonal (Ports and Adapters)

Esta aplicación ha sido refactorizada para implementar una arquitectura hexagonal basada en funciones, siguiendo los principios de Clean Architecture.

## Estructura de Directorios

```
src/
├── domain/                    # Capa de Dominio
│   ├── ports/                # Contratos/Interfaces (Puertos)
│   │   ├── user.ports.ts
│   │   └── diary.ports.ts
│   └── use-cases/            # Casos de Uso (Lógica de Negocio)
│       ├── user.use-cases.ts
│       └── diary.use-cases.ts
├── adapters/                 # Capa de Adaptadores
│   ├── repositories/         # Adaptadores de Repositorio
│   │   ├── user.repository.adapter.ts
│   │   └── diary.repository.adapter.ts
│   └── services/             # Adaptadores de Servicios
│       ├── auth.service.adapter.ts
│       ├── json-api.service.adapter.ts
│       ├── diary-json-api.service.adapter.ts
│       └── transaction.service.adapter.ts
├── application/              # Capa de Aplicación
│   └── services/             # Servicios de Aplicación (Orquestación)
│       ├── user.application.service.ts
│       └── diary.application.service.ts
└── controllers/              # Capa de Presentación (HTTP)
    ├── users.controller.ts
    └── diaries.controller.ts
```

## Principios Aplicados

### 1. Inversión de Dependencias
- Los casos de uso dependen de abstracciones (ports), no de implementaciones concretas
- Los adaptadores implementan los ports definidos en el dominio

### 2. Separación de Responsabilidades
- **Domain**: Contiene la lógica de negocio pura
- **Adapters**: Implementaciones concretas de infraestructura
- **Application**: Orquesta los casos de uso
- **Controllers**: Maneja la presentación HTTP

### 3. Testabilidad
- Cada capa puede ser probada independientemente
- Los ports permiten inyectar mocks para testing

## Flujo de Datos

1. **Request** → Controller
2. **Controller** → Application Service
3. **Application Service** → Use Case
4. **Use Case** → Repository Port (via Adapter)
5. **Repository Adapter** → Database/External Service
6. **Response** ← Application Service ← Use Case ← Adapter

## Ventajas de esta Arquitectura

- **Mantenibilidad**: Código organizado y fácil de mantener
- **Testabilidad**: Cada componente puede ser probado aisladamente
- **Flexibilidad**: Fácil intercambio de implementaciones
- **Escalabilidad**: Fácil agregar nuevas funcionalidades
- **Independencia**: El dominio no depende de frameworks externos

## Ejemplo de Uso

```typescript
// Crear un caso de uso
const createUserUseCase = createCreateUserUseCase(
  userRepository,    // Adaptador de repositorio
  jsonApiService,    // Adaptador de servicio JSON API
  transactionService // Adaptador de transacciones
)

// Usar el caso de uso
const result = await createUserUseCase(url, userData)
```

## Migración desde Arquitectura Anterior

Los servicios originales (`src/services/`) han sido reemplazados por:
- **Casos de Uso**: Lógica de negocio pura
- **Servicios de Aplicación**: Orquestación de casos de uso
- **Adaptadores**: Implementaciones concretas

Los controladores ahora usan los servicios de aplicación en lugar de los servicios originales.

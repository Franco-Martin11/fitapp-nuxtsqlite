# FitApp Nuxt SQLite

Este proyecto es un ejemplo de una aplicación web de fitness construida con [Nuxt 3](https://nuxt.com/) que integra una base de datos SQLite usando `better-sqlite3`. Su propósito es demostrar cómo conectar, inicializar, consultar datos y filtrar registros en tiempo real utilizando tecnologías modernas de frontend y backend en un entorno fullstack JavaScript/TypeScript.

## Características principales

- **Nuxt 3 + TypeScript**  
- **Base de datos SQLite (con `better-sqlite3`)**  
- **Inicialización automática de tablas y datos de ejemplo**  
- **Endpoints API para la consulta de ejercicios**  
- **Vista interactiva para mostrar y filtrar ejercicios**  
- **Componentes UI estilizados con Tailwind CSS**

## Estructura del proyecto

- `/server/utils/db.ts` - Utilidades para la conexión y operaciones SQLite  
- `/server/api/ejercicios.get.ts` - Endpoint para obtener ejercicios desde la base de datos  
- `/pages/ejerciciosPage.vue` - Vista principal de ejercicios con filtros  
- `/pages/index.vue` - Landing page del proyecto

## Instalación

Asegúrate de tener instalado [Node.js](https://nodejs.org/):

Instala las dependencias usando el gestor de paquetes de tu preferencia:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Desarrollo

Inicia el servidor de desarrollo en `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Producción

Compila la aplicación para producción:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Previsualiza la build de producción localmente:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Recursos

- [Documentación de Nuxt](https://nuxt.com/docs/getting-started/introduction)
- [Documentación de deployment en Nuxt](https://nuxt.com/docs/getting-started/deployment)

---

> _Proyecto: **fitapp-nuxtsqlite**_  
> _Aplicación ejemplo con Nuxt 3, SQLite y filtros de ejercicios para fitness_


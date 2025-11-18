<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-800 mb-4">
          FitApp - Ejemplo SQLite
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Aplicación de ejemplo con integración de SQLite y Nuxt 3
        </p>
      </div>

      <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">
          ¿Qué incluye este ejemplo?
        </h2>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-start">
            <span class="text-green-500 mr-2">✓</span>
            <span>Conexión a base de datos SQLite usando better-sqlite3</span>
          </li>
          <li class="flex items-start">
            <span class="text-green-500 mr-2">✓</span>
            <span>Inicialización automática de tablas y datos de ejemplo</span>
          </li>
          <li class="flex items-start">
            <span class="text-green-500 mr-2">✓</span>
            <span>API endpoints para consultar datos</span>
          </li>
          <li class="flex items-start">
            <span class="text-green-500 mr-2">✓</span>
            <span>Vista con filtros para mostrar ejercicios</span>
          </li>
        </ul>
      </div>

      <div class="text-center">
        <NuxtLink
          to="/ejerciciosPage"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
        >
          Ver Ejercicios →
        </NuxtLink>
      </div>

      <div class="max-w-2xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">
          Estructura del proyecto
        </h3>
        <div class="space-y-2 text-sm text-gray-600 font-mono">
          <div><span class="text-blue-600">server/utils/db.ts</span> - Utilidad para manejar SQLite</div>
          <div><span class="text-blue-600">server/api/ejercicios.get.ts</span> - Endpoint API para obtener ejercicios</div>
          <div><span class="text-blue-600">pages/ejercicios.vue</span> - Vista para mostrar los datos</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Página de inicio
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>


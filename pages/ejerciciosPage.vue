<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">Ejercicios de Fitness</h1>
      <p class="text-gray-600 mb-4">
        Datos cargados desde la base de datos SQLite
      </p>
      
      <!-- Filtros -->
      <div class="flex gap-4 mb-6">
        <button
          :class="[
            'px-4 py-2 rounded-lg transition-colors',
            filtroTipo === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
          @click="filtrarPorTipo(null)"
        >
          Todos
        </button>
        <button
          v-for="tipo in tiposEjercicios"
          :key="tipo"
          :class="[
            'px-4 py-2 rounded-lg transition-colors',
            filtroTipo === tipo
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
          @click="filtrarPorTipo(tipo)"
        >
          {{ tipo }}
        </button>
      </div>
    </div>

    <!-- Estado de carga -->
    <div v-if="pending" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"/>
      <p class="mt-4 text-gray-600">Cargando ejercicios...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <p class="font-bold">Error al cargar los datos</p>
      <p>{{ error.message }}</p>
    </div>

    <!-- Lista de ejercicios -->
    <div v-else-if="data" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="ejercicio in data.data"
        :key="ejercicio.id"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      >
        <div class="flex justify-between items-start mb-3">
          <h2 class="text-2xl font-semibold text-gray-800">{{ ejercicio.nombre }}</h2>
          <span
            class="px-3 py-1 rounded-full text-sm font-medium"
            :class="getTipoColor(ejercicio.tipo)"
          >
            {{ ejercicio.tipo }}
          </span>
        </div>
        
        <p class="text-gray-600 mb-3">{{ ejercicio.descripcion }}</p>
        
        <div class="space-y-2 mb-4">
          <div class="flex items-center text-sm text-gray-700">
            <span class="font-medium mr-2">Músculos:</span>
            <span>{{ ejercicio.musculos }}</span>
          </div>
          <div class="flex items-center text-sm text-gray-700">
            <span class="font-medium mr-2">Series:</span>
            <span>{{ ejercicio.series }}</span>
          </div>
          <div class="flex items-center text-sm text-gray-700">
            <span class="font-medium mr-2">Repeticiones:</span>
            <span>{{ ejercicio.repeticiones }}</span>
          </div>
        </div>
        
        <div class="text-xs text-gray-500 pt-3 border-t">
          Creado: {{ formatFecha(ejercicio.creado_en) }}
        </div>
      </div>
    </div>

    <!-- Contador total -->
    <div v-if="data" class="mt-8 text-center">
      <p class="text-gray-600">
        Mostrando <span class="font-semibold">{{ data.total }}</span> ejercicio(s)
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Ejercicio {
  id: number
  nombre: string
  tipo: string
  musculos: string
  descripcion: string
  series: number
  repeticiones: number
  creado_en: string
}

interface ApiResponse {
  success: boolean
  data: Ejercicio[]
  total: number
}

const filtroTipo = ref<string | null>(null)
const tiposEjercicios = ['Fuerza', 'Cardio', 'Core']

// Función para construir la URL de la API con filtros
const getApiUrl = () => {
  const baseUrl = '/api/ejercicios'
  if (filtroTipo.value) {
    return `${baseUrl}?tipo=${encodeURIComponent(filtroTipo.value)}`
  }
  return baseUrl
}

// Cargar datos desde la API
const { data, pending, error } = await useFetch<ApiResponse>(getApiUrl(), {
  watch: [filtroTipo]
})

// Función para filtrar por tipo
const filtrarPorTipo = (tipo: string | null) => {
  filtroTipo.value = tipo
}

// Función para obtener el color según el tipo
const getTipoColor = (tipo: string) => {
  const colores: Record<string, string> = {
    'Fuerza': 'bg-blue-100 text-blue-800',
    'Cardio': 'bg-red-100 text-red-800',
    'Core': 'bg-green-100 text-green-800'
  }
  return colores[tipo] || 'bg-gray-100 text-gray-800'
}

// Función para formatear fecha
const formatFecha = (fecha: string) => {
  const date = new Date(fecha)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>


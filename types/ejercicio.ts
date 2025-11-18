export interface Ejercicio {
  id: number
  nombre: string
  tipo: string
  musculos: string
  descripcion: string | null
  series: number
  repeticiones: number
  creado_en: string
}

export interface EjerciciosResponse {
  success: boolean
  data: Ejercicio[]
  total: number
}


import { getDatabase } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID de ejercicio requerido'
      })
    }
    
    const db = getDatabase()
    const ejercicio = db.prepare('SELECT * FROM ejercicios WHERE id = ?').get(id)
    
    if (!ejercicio) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Ejercicio no encontrado'
      })
    }
    
    return {
      success: true,
      data: ejercicio
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al obtener ejercicio: ' + error.message
    })
  }
})


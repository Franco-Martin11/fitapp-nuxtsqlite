import { getDatabase } from '../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const db = getDatabase()
    const query = getQuery(event)
    
    let sql = 'SELECT * FROM ejercicios'
    const params: any[] = []
    
    // Filtro opcional por tipo
    if (query.tipo) {
      sql += ' WHERE tipo = ?'
      params.push(query.tipo)
    }
    
    // Ordenar por fecha de creación (más recientes primero)
    sql += ' ORDER BY creado_en DESC'
    
    const ejercicios = db.prepare(sql).all(...params)
    
    return {
      success: true,
      data: ejercicios,
      total: ejercicios.length
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al obtener ejercicios: ' + error.message
    })
  }
})


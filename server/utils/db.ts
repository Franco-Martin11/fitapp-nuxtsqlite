import Database from 'better-sqlite3'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'

// Ruta donde se guardará la base de datos
const dbPath = join(process.cwd(), '.data', 'fitapp.db')
const dbDir = join(process.cwd(), '.data')

// Asegurar que el directorio existe
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true })
}

// Crear conexión a la base de datos
let db: Database.Database | null = null

export function getDatabase(): Database.Database {
  if (!db) {
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL') // Mejora el rendimiento
    initializeDatabase(db)
  }
  return db
}

// Inicializar la base de datos con tablas y datos de ejemplo
function initializeDatabase(database: Database.Database) {
  // Crear tabla de ejercicios
  database.exec(`
    CREATE TABLE IF NOT EXISTS ejercicios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      tipo TEXT NOT NULL,
      musculos TEXT NOT NULL,
      descripcion TEXT,
      series INTEGER DEFAULT 3,
      repeticiones INTEGER DEFAULT 10,
      creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Verificar si ya hay datos
  const count = database.prepare('SELECT COUNT(*) as count FROM ejercicios').get() as { count: number }
  
  // Si la tabla está vacía, insertar datos de ejemplo
  if (count.count === 0) {
    const insert = database.prepare(`
      INSERT INTO ejercicios (nombre, tipo, musculos, descripcion, series, repeticiones)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    const ejerciciosEjemplo = [
      ['Press de Banca', 'Fuerza', 'Pectorales, Tríceps', 'Ejercicio básico para desarrollar el pecho', 4, 8],
      ['Sentadillas', 'Fuerza', 'Cuádriceps, Glúteos', 'Ejercicio fundamental para piernas', 4, 12],
      ['Peso Muerto', 'Fuerza', 'Espalda, Glúteos, Isquiotibiales', 'Ejercicio completo para tren posterior', 3, 6],
      ['Press Militar', 'Fuerza', 'Hombros, Tríceps', 'Desarrollo de hombros', 3, 10],
      ['Dominadas', 'Fuerza', 'Espalda, Bíceps', 'Ejercicio de peso corporal', 3, 8],
      ['Plancha', 'Core', 'Abdominales, Core', 'Fortalece el core', 3, 60],
      ['Burpees', 'Cardio', 'Todo el cuerpo', 'Ejercicio cardiovascular completo', 3, 10],
      ['Flexiones', 'Fuerza', 'Pectorales, Tríceps, Hombros', 'Ejercicio básico de peso corporal', 3, 15]
    ]

    const insertMany = database.transaction((ejercicios) => {
      for (const ejercicio of ejercicios) {
        insert.run(...ejercicio)
      }
    })

    insertMany(ejerciciosEjemplo)
  }
}

// Cerrar la conexión cuando sea necesario
export function closeDatabase() {
  if (db) {
    db.close()
    db = null
  }
}


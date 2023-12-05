import 'dotenv/config.js'

export const PORT = 3000
export const mongoDBUrl = process.env.DB_CONN
export const JWT_TOKEN = process.env.JWT_SECRET
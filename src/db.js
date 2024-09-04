const mysql = require('mysql2/promise')

async function connectDB() {
    try {
        // Estos base de datos fue congelada porque PlanetScale se volvió de paga
        const connection = await mysql.createConnection({
            // Conexión con mysql de cuenta PlanetScale
            host: '',
            user: '',
            password: '',
            database: 'expressdb',
            ssl: {
                rejectUnauthorized: false
            } //Para que no marque error de solo permite conexiones seguras
        })
        
        const result = await connection.query('SELECT 1+1 AS RESULT') // Solo probando que la conexión ha sido exitosa
        console.log(result)
    } catch (error) {
        console.log('unable to connect to the database')
    }
}

module.exports = connectDB

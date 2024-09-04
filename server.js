const express = require('express')
const morgan = require('morgan')
const path = require('path')
// Inmportar EJS
require('ejs')
// Importa archivo de conexión a DB
const connectDB = require('./src/db')
connectDB()

const app = express()
const port = 3000
let products = [
    {
        id: 1,
        name: 'laptop',
        price: 39
    }
]

// Settings (importante debe estar antes de los middlewares)
// Nombre + valor
app.set('appName','Express Course')
app.set('port',3000)
app.set('case sensitive routing', true)
app.set('view engine', 'ejs'); // Configurar motor de plantillas
app.set('views', path.join(__dirname, 'src/views')) // Ruta absoluta + carpeta 'views'

// Importar rutas
const homeRoutes = require('./src/routes/users');
const aboutRoutes = require('./src/routes/about');

// Middlewares
// Usando middleware morgan para loggear en consola. El parámetro dev imprime logs con cierto formato
app.use(morgan('dev'))
app.use(express.json())

app.use(homeRoutes);
app.use(aboutRoutes);

app.get('/', (req, res) => {

    const title = 'Home page'
    const nombre = 'Heberth David';
    let isActive = true
    const users = [
        {
            'id': 1,
            'name': 'David',
            'age': 34,
        },
        {
            'id': 2,
            'name': 'Heberth',
            'age': 34,
        },
        {
            'id': 3,
            'name': 'Jesus',
            'age': 34,
        },
    ]
    
    res.render('home', { // 'home' hace referencia al nombre del archivo en /views (sin extensión de archivo)
        title,
        nombre,
        isActive,
        users
     }) 
})

// Devuelve todos los productos
app.get('/products', (req, res) => {
    res.json(products)
})

// Agregar producto al arreglo de productos
app.post('/products', (req, res) => {
    const newProduct = {...req.body, id: products.length + 1 }
    products.push(newProduct)
    res.send(newProduct)
})

// Actualizar un producto a través de su id
app.put('/products/:id', (req, res) => {
    const newData = req.body

    const productFound = products.find( prod => prod.id == req.params.id )
    if (!productFound) {
        return res.status(404).json({
            message_error: "Product not found"
        })
    }
    
    products = products.map(prod => prod.id == req.params.id ? {...prod, ...newData} : prod)
    res.json({
        'message': 'Product updated successfully'
    })
})

// Eliminar un producto a través de su id
app.delete('/products/:id', (req, res) => {

    const productFound = products.find( prod => prod.id == req.params.id )

    if (!productFound) {
        return res.status(404).json({
            message_error: "Product not found"
        })
    }
    
    products = products.filter( prod => prod.id != req.params.id)
    res.sendStatus(204)
})

// Obtener un único producto a través de su id
app.get('/products/:id', (req, res) => {
    console.log(req.params.id)
    const productFound = products.find( prod => prod.id == req.params.id )

    if (!productFound) {
        return res.status(404).json({
            message_error: "Product not found"
        })
    }
    res.json(productFound)
})

// Archivos estáticos
app.use('public', express.static('./public')) //pasar directorio de archivos públicos/estáticos, se utiliza un prefijo para indicar que los static files se acceden a través de esta "ruta" + archivo

// Ruta que maneja las peticiones que no existen
app.use((req, res) => {
    res.status(404).send('Page not found')
})

app.listen(port)
// app.listen(app.get('port'))
console.log(`Server ${app.get('appName')} on port ${port}`)

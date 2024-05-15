const express = require('express')
const app = express()
const path = require('path')
const apiRoutes = require('./api-routes')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))
const { MongoClient } = require('mongodb')

const url = process.env.MONGODB_URI || require('./secrets/mongodb.json').url
const client = new MongoClient(url)

app.use(express.json())
app.use(express.static('public'))

app.get('/', (_, response) => {
    response.sendFile('index.html', { root: path.join(__dirname, 'public') })
})

app.use('/api/???', apiRoutes)

app.use((request, response) => {
    response.status(404).sendFile('404.html', { root: path.join(__dirname, 'public') })
})

const getCollection = async (dbName, Food-Truck-API) => {
    await client.connect()
    return client.db('Food-Truck-API').collection(Food-Truck-API)
}

app.locals.getCollection = getCollection

const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))

router.put('/:id', async (req, res) => {
    const collection = await getCollection('Events', 'Food-Truck-API')
    const result = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
    res.json(result)
})

router.delete('/:id', async (req, res) => {
    const collection = await getCollection('Events', 'Food-Truck-API')
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id) })
    res.json(result)
})

router.put('/:id', async (req, res) => {
    const collection = await getCollection('Menu', 'Food-Truck-API')
    const result = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
    res.json(result)
})

router.delete('/:id', async (req, res) => {
    const collection = await getCollection('Menu', 'Food-Truck-API')
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id) })
    res.json(result)
})

app.use('/', apiRoutes)

app.use((request, response) => {
    response.status(404).sendFile('404.html', { root: path.join(__dirname, 'public') })
})

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

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db('dbName').collection(collectionName)
}

app.locals.getCollection = getCollection

const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))

router.get('/api/menu', async (req, res) => {
    const collection = await getCollection('Food-Truck-API', 'Menu')
	const menuitems = await collection.find().toArray()
	const menuId = menuitems.map((menuitem) => { return { ...menuitem, id: menuitem._id }; })
	res.json(menuId)
})

router.get('/api/events', async (req, res) => {
    const collection = await getCollection('Food-Truck-API', 'Events')
	const events = await collection.find().toArray()
	const eventId = events.map((event) => { return { ...event, id: event._id }; })
	res.json(eventId)
})

router.get('/api/events/:id', async (req, res) => {
    const { id } = req.params
    const collection = await getCollection('Food-Truck-API', 'Events')
	const event = await collection.findOne({ "_id": new ObjectId(id) })
	res.json(event)
})

app.post('/api/menu', async (req, res) => {
    const item = req.body
    const collection = await getCollection('Food-Truck-API', 'Menu')
    const result = await collection.insertOne(item)
    res.json(result)
});

app.post('/api/events', async (req, res) => {
    const item = req.body
    const collection = await getCollection('Food-Truck-API', 'Events')
    const result = await collection.insertOne(item)
    res.json(result)
});

router.put('/api/menu/:id', async (req, res) => {
    const collection = await getCollection('Food-Truck-API', 'Menu')
    const result = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
    res.json(result)
})

router.delete('/api/menu/:id', async (req, res) => {
    const collection = await getCollection('Food-Truck-API', 'Menu')
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id) })
    res.json(result)
})

router.put('/api/events/:id', async (req, res) => {
    const collection = await getCollection('Food-Truck-API', 'Events')
    const result = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
    res.json(result)
})

router.delete('/api/events/:id', async (req, res) => {
    const collection = await getCollection('Food-Truck-API', 'Events')
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id) })
    res.json(result)
})

app.use('/', apiRoutes)

app.use((request, response) => {
    response.status(404).sendFile('404.html', { root: path.join(__dirname, 'public') })
})

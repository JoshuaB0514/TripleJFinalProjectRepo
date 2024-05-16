const router = require('express').Router()

const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI || require('./secrets/mongodb.json').url
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

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

router.post('/api/menu', async (req, res) => {
    const item = req.body
    const collection = await getCollection('Food-Truck-API', 'Menu')
    const result = await collection.insertOne(item)
    res.json(result)
});

router.post('/api/events', async (req, res) => {
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

module.exports = router
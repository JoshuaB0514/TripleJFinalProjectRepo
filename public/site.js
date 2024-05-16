app.get('/api/menu', async (req, res) => {
    const collection = await getCollection('Food-Truck-API', 'Menu')
	const menuitems = await collection.find().toArray()
	const menuId = menuitems.map((menuitem) => { return { ...menuitem, id: menuitem._id }; })
	res.json(menuId)
})

app.get('/api/events', async (req, res) => {
    const collection = await getCollection('Food-Truck-API', 'Events')
	const events = await collection.find().toArray()
	const eventId = events.map((event) => { return { ...event, id: event._id }; })
	res.json(eventId)
})

app.get('/api/events/:id', async (req, res) => {
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

app.put('/api/menu/:id', async (req, res) => {
    const collection = await getCollection('Food-Truck-API', 'Menu')
    const result = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
    res.json(result)
})

app.delete('/api/menu/:id', async (req, res) => {
    const collection = await getCollection('Food-Truck-API', 'Menu')
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id) })
    res.json(result)
})

app.put('/api/events/:id', async (req, res) => {
    const collection = await getCollection('Food-Truck-API', 'Events')
    const result = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
    res.json(result)
})

app.delete('/api/events/:id', async (req, res) => {
    const collection = await getCollection('Food-Truck-API', 'Events')
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id) })
    res.json(result)
})

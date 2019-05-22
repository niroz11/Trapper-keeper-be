import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

app.locals.title = 'Trapper Keeper';
app.locals.lists = [];

app.get('/api/v1/lists', (req, res) => {
	const { lists } = app.locals;
	res.status(200).send(lists);
});

app.post('/api/v1/lists', (req, res) => {
	const { title, notes } = req.body;
	if (!title || !notes) {
		return res.status(422).send('Expected format: { title: <String>, notes: <StringArray> }');
	}
	const list = {
		id: Date.now(),
		title,
		notes
	};
	app.locals.lists.push(list);
	res.status(201).send(list);
});

app.get('/api/v1/lists/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const list = app.locals.lists.find(list => list.id === id);
	if (!list) {
		return res.sendStatus(404);
	}
	res.status(200).send(list);
});

app.put('/api/v1/lists/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const { title, notes } = req.body;
	if (!title || !notes) {
		return res.status(422).send('Expected format: { title: <String>, notes: <StringArray> }');
	}
	let listToUpate = app.locals.lists.find(list => list.id === id);
	if (!listToUpate) {
		return res.sendStatus(404);
	}
	listToUpate.title = title;
	listToUpate.notes = notes;
	res.status(200).send(app.locals.lists);
});

app.delete('/api/v1/lists/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = app.locals.lists.findIndex(list => list.id === id);
	if (index === -1) {
		return res.sendStatus(404);
	}
	app.locals.lists.splice(index, 1);
	res.sendStatus(200);
});

export default app;

import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

app.locals.title = 'Trapper Keeper';
app.locals.notes = [];
app.locals.lists = [];

app.get('/api/v1/lists', (req, res) => {
	// const { notes, items } = app.locals;
	// return res.status(200).json({ notes, items });
	res.status(200).send('Lists delivered');
});

app.post('/api/v1/lists', (req, res) => {
	res.status(200).send('List received');
});

app.get('/api/v1/lists/:id', (req, res) => {
	res.status(200).send('Single list delivered');
});

// app.put('/api/v1/lists/:id', (req, res) => {
// 	res.status(200).send('Single list updated');
// });

app.patch('/api/v1/lists/:id', (req, res) => {
	res.status(200).send('Single list updated');
});

app.delete('/api/v1/lists/:id', (req, res) => {
	res.status(200).send('Single list deleted');
});

app.get('/api/v1/notes', (req, res) => {
	res.status(200).send('Note delivered');
});

app.post('/api/v1/notes', (req, res) => {
	res.status(200).send('Note received');
});

app.get('/api/v1/notes/:id', (req, res) => {
	res.status(200).send('Single note delivered');
});

// app.put('/api/v1/notes/:id', (req, res) => {
// 	res.status(200).send('Single note updated');
// });

app.patch('/api/v1/notes/:id', (req, res) => {
	res.status(200).send('Single note updated');
});

app.delete('/api/v1/notes/:id', (req, res) => {
	res.status(200).send('Single note deleted');
});

app.listen(3001, () => console.log('Listening on port 3001'));

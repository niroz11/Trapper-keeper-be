import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

app.set('port', 3001);

app.locals.title = 'Trapper Keeper';
app.locals.notes = [];
app.locals.items = [];

app.get('/api/v1/notes', (req, res) => {
	const notes = app.locals.notes;
	const items = app.locals.items;
	return res.status(200).json({ notes, items });
});

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));

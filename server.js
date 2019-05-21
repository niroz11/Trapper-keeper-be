import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

app.locals.title = 'Trapper Keeper';
app.locals.notes = [];
app.locals.items = [];

app.get('/api/v1/notes', (req, res) => {
	const { notes, items } = app.locals;
	return res.status(200).json({ notes, items });
});

app.listen(3001, () => console.log('Listening on port 3001'));

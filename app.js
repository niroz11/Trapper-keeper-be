import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors())
app.use(express.json())

app.locals.title = 'Trapper Keeper';
app.locals.notes = [];
app.locals.items = [];

app.get('/api/v1/notes', (request, response) => {
  const notes = app.locals.notes;
  const items = app.locals.items;
  return response.status(200).json({ notes, items })
});

export default app;
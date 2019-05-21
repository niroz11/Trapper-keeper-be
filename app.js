import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors())
app.use(express.json())

app.locals.title = 'Trapper Keeper';
app.locals.notes = [];
app.locals.items = [];

export default app;
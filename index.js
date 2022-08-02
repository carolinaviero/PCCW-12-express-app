const express = require('express')
const app = express();
const port = 8000;
const low = require("lowdb");
const fs = require("lowdb/adapters/FileSync");
const adapter = new fs("db.json");
const db = low(adapter);
const itemsRouter = require('./routes/items-routes');
const authRouter = require('./routes/auth-routes');
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json());

db.defaults({ items: [], users: [] })
  .write()

app.use('/items', itemsRouter)

app.use('/auth', authRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
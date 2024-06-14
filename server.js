import express from 'express';
import path from 'node:path';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();
const server = express();
const port = process.env.PORT || 8000;

const __dirname = path.resolve();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

server.set('view engine', 'pug');
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));

server.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));

server.use('/', routes)

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
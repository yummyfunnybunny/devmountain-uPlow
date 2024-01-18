// ANCHOR -- Imports
import express from 'express';
import ViteExpress from 'vite-express';
import dotenv from 'dotenv';

// ANCHOR -- Initializers
const app = express();
// const port = '8000';
dotenv.config();
const { PORT } = process.env;
// ViteExpress.config({ printViteDevServerHost: true });

// ANCHOR -- Middle-Ware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ANCHOR -- Route Handlers

// ANCHOR -- Run Server
ViteExpress.listen(app, PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));

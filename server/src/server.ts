import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
app.use (express.static('../client/dist'));
// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use (express.json());
app.use (express.urlencoded({extended: true}));
// TODO: Implement middleware to connect the routes
app.use(routes);

app.get('/weather', (_req: Request, res: Response) => res.sendFile(path.join('../client/server/src/routes/api/weatherRoutes.ts')));
app.get('/html', (_req: Request, res: Response) => res.sendFile(path.join('../client/server/src/src/routes/htmlRoutes.ts'))
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

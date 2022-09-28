import express, { Application } from 'express';
import routes from './routes/api';
import morgan from 'morgan';

// Boot express
const app: Application = express();
const port = 3000;

app.use(morgan('dev'));
app.use('/api', routes);

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));

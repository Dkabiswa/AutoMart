import express from 'express';
import bodyParser from 'body-parser';
import car from './src/routes/carRoutes';
import user from './src/routes/userRoutes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', car);
app.use('/api/v1/auth', user);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

export default server;

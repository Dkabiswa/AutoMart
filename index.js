import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import car from './src/routes/carRoutes';
import user from './src/routes/userRoutes';
import order from './src/routes/orderRoutes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/api/v1', car);
app.use('/api/v1/auth', user);
app.use('/api/v1', order);

app.use((req, res, next) => {
  const err = new Error('Invalid URL');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).send({
    status,
    message: err.message,
  });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

export default server;
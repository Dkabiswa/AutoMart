import express from 'express';
import bodyParser from 'body-parser';
import car from './src/routes/carRoutes';


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', car);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('App running on port 3000');
});

export default server;


import express from 'express';
import bodyParser from 'body-parser';


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('ci with travis');
});

const server = app.listen(3000, () => {
  console.log('App running on port 3000');
});

export default server;


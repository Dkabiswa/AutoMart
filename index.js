import express from 'express';
import bodyParser from 'body-parser';


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`magic happens on port ${port}`));

export default app;
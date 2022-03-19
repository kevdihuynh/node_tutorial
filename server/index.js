import express from "express";
import routes from '../routes/index.js';
import cors from 'cors';
import bodyParser  from 'body-parser';

const PORT = process.env.PORT || 3001;

const app = express();


app.options('*', cors()) // include before other routes 
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
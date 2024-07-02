const express = require('express');
const router = require('./routes/index');
const app = express();
const cors = require('cors');
const port = 4000;
app.use(cors());
app.use(express.json());
app.use('/api/v1', router);



app.get('/', (req, res) => {
    res.send('Working!');
});


app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}/`);
});
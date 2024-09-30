require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});


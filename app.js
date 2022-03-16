const express = require("express");
const app = express();
const cors = require('cors');
const dbConnection = require('./config/db');
const usersRoutes = require('./src/users/routes/user.routes');
const upload = require("./common/services/uploadFile");
require("dotenv").config();
const port = process.env.PORT || 8080;


dbConnection();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(usersRoutes);


app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


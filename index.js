const express = require('express');
const db = require('./connection.js');
const authRouter = require('./routes/auth_routes.js');
const app = express();
const PORT = 3500;
db.connectDB('mongodb://127.0.0.1:27017').then(() => console.log('DB Connected')).catch((e) => console.log("Connection Failed: ", e));
app.use(express.urlencoded({extended: true}));
app.use('/auth',authRouter);
app.listen( PORT,()=>console.log('Server listening on port: ',PORT));
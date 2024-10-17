const express = require('express');
const db = require('./connection.js');
const authRouter = require('./routes/auth_routes.js');
const app = express();
db.connectDB(process.env.MONGO_URL).then(() => console.log('DB Connected')).catch((e) => console.log("Connection Failed: ", e));
app.use(express.urlencoded({extended: true}));
app.use('/auth',authRouter);
app.listen( process.env.PORT,()=>console.log('Server listening on port: ',PORT));
require('dotenv').config()
const express = require('express');
const db = require('./connection.js');
const verifyToken = require('./middlewares/auth.js');
const authRouter = require('./routes/auth_routes.js');
const app = express();
db.connectDB(process.env.MONGO_URL).then(() => console.log('DB Connected')).catch((e) => console.log("Connection Failed: ", e));
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);
// route for checking that the user token is valid or not and give access according to that
app.get('/isValidOne', verifyToken, (req, res) => {
    res.status(200).json({ msg: 'This is a protected route' });
});
app.listen(process.env.PORT, () => console.log('Server listening on port: ', process.env.PORT));
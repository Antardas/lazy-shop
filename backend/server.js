const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: "backend/config/config.env" });
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.json('Your Server Working')
})

app.listen(port, (req, res) => {
    console.log("Server is Runing On", port);
})
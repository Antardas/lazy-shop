const dotenv = require('dotenv');
const app = require('./app');
// Config
dotenv.config({ path: 'backend/config/config.env' });
const port = process.env.PORT || 5000;

// Connect Database
const connectDatabse = require('./config/database');

connectDatabse();
// Server Listen
app.get('/', (req, res) => {
    res.json('Your Server Working');
});

app.listen(port, (req, res) => {
    console.log('Server is Runing On', port);
});

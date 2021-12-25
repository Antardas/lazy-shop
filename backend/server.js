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

const server = app.listen(port, (req, res) => {
    console.log('Server is Runing On', port);
});

// unhandeled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting Down the Server due to unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    });
});

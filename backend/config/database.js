const mongoose = require('mongoose');

const connectDatabse = () => {
    mongoose.connect(process.env.DB_URI).then((data) => {
        console.log(`Database Connect Successfully with HOST:${data.connection.host}`);
    });
};
module.exports = connectDatabse;

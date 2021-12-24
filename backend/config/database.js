const mongoose = require('mongoose');

const connectDatabse = () => {
    mongoose
        .connect(process.env.DB_URI)
        .then((data) => {
            console.log(`Database Connect Successfully with HOST:${data.connection.host}`);
        })
        .catch((err) => console.log(err));
};
module.exports = connectDatabse;

const mongoose = require("mongoose");

const ConnectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log("connection DONE...",
            connect.connection.host,
            connect.connection.name
        );
    }
    catch (err) {
        console.log("Connection Faild..", err);
        process.exit(1);

    }
}

module.exports = ConnectDb;

const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ramjlet:dbresult@cluster.xpkfekb.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('МонгоДБ поключен');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;
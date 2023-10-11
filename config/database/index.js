const mongoose = require('mongoose');

async function connect() {

    let env = 'mongodb://127.0.0.1:27017/Bai1'
    try {
        await mongoose.connect(env, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect to DB successfully')
    } catch (error) {
        console.log("Connect failed " + error)
    }
}

module.exports = { connect };
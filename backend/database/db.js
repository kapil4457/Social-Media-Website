const mongoose = require('mongoose')

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI , {
        useUnifiedTopology : true,
    }).then((data)=>{
        console.log(`Mongodb Connected with server  : ${data.connection.host}`)
    }).catch((err)=>{
        console.log(err.messge)
    })

}


module.exports = connectDatabase
const app = require('./app')
 const connectDatabase = require('./database/db.js')


process.on('uncaughtException' , (err)=>{
    console.log(err.message);
	console.log("Shutting down due to unhandled Promise Rejection ");
    process.exit(1)
})


connectDatabase();

const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})


process.on('unhandledRejection' , (err)=>{
    console.log(err.message)
    console.log("Shutting down server due to Unhandeled Rejection")
    server.close(()=>{

        process.exit(1)
    })   
})
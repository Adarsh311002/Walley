import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 5001;

dotenv.config()


connectDB()
.then(() => {
    app.listen(PORT, ()=> {
         console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err) => {
     console.error(`Error connecting to database: ${err.message}`)
})
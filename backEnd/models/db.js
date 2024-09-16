import mongoose from "mongoose"

const connect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("server is connected to db")
    } catch (error) {
        console.log("something went wrong while conecting to the db", error)
    }
}

export default connect
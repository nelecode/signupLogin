import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import connect from "./models/db.js"
import AuthRouter from "./routes/AuthRouter.js"
import ProductsRouter from "./routes/ProductsRouter.js"

connect()
const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/auth", AuthRouter)
app.use("/products", ProductsRouter)

app.get("/", (req, res) => {
    res.send("running")
})

app.listen(PORT, () => {
    console.log("server is runnign on port 3000")
})
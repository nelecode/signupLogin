import { UserModel } from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const User = await UserModel.findOne({ email })
        if (User) {
            return res.status(409).json({ message: "user is already exist", success: false })
        }

        const userModel = new UserModel({ name, email, password })
        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save()

        res.status(201).json({ message: "signup successfully", success: true })

    } catch (error) {
        res.status(500).json({ message: "enternal server error", success: false })
    }
}
const logIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const errorMsg = "Auth failed email or password is wrong"

        const User = await UserModel.findOne({ email })

        if (!User) {
            return res.status(409).json({ message: errorMsg, success: false })
        }

        const isEqualPass = await bcrypt.compare(password, User.password)

        if (!isEqualPass) {
            return res.status(409).json({ message: errorMsg, success: false })
        }

        const jwtToken = jwt.sign(
            { email: User.email, _id: User._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.status(200).json(
            {
                message: "login successfully",
                success: true,
                jwtToken,
                email,
                name: User.name
            }
        )

    } catch (error) {
        res.status(500).json({ message: "enternal server error", success: false })
    }
}


export {
    signUp,
    logIn
}
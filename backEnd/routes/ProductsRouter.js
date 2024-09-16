import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/Auth.js";

const router = Router()

router.get("/", ensureAuthenticated, (req, res) => {
    res.status(200).json(
        [
            { Name: "mobile", rate: 10000 },
            { Name: "laptop", rate: 30000 }
        ]
    )
})

export default router
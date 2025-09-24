const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const { createQuery, sendQueryResponse } = require("../controllers/query.controller")
const roleMiddleware = require("../middleware/roleMiddleware")

const queryRouter = express.Router()

queryRouter.use(authMiddleware)

queryRouter.post("/create-query", createQuery)
queryRouter.post("/response-query/:id", roleMiddleware(["admin"]),  sendQueryResponse)


module.exports = queryRouter;
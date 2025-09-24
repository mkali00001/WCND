const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const { createQuery, sendQueryResponse, allQueries } = require("../controllers/query.controller")
const roleMiddleware = require("../middleware/roleMiddleware")

const queryRouter = express.Router()

queryRouter.use(authMiddleware)

queryRouter.post("/create-query", createQuery)
queryRouter.patch("/response-query/:id", roleMiddleware(["admin"]),  sendQueryResponse)
queryRouter.get("/all-queries", authMiddleware, roleMiddleware(["admin"]), allQueries);


module.exports = queryRouter;
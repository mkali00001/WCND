const express = require('express');
const paymentRouter = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { 
    createPayment, 
    getPayments, 
    createOrder, 
    recordPayment, 
    get_payment_status 
} = require('../controllers/payment.controller');


paymentRouter.post("/create-order",authMiddleware,createOrder)
paymentRouter.post("/record-payment",authMiddleware,recordPayment)
paymentRouter.post('/create-payment', authMiddleware, createPayment)
paymentRouter.get('/get-payment', authMiddleware,  getPayments)


module.exports = paymentRouter;
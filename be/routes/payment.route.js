const express = require('express');
const paymentRouter = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { 
    createPayment, 
    getPayments, 
    createOrder, 
    recordPayment, 
    get_payment_status, 
    getPaymentCategorie
} = require('../controllers/payment.controller');

paymentRouter.post("/paymentcategory", getPaymentCategorie)

paymentRouter.post("/create-order", createOrder)
paymentRouter.post("/record-payment", recordPayment)
paymentRouter.post('/create-payment',  createPayment)
paymentRouter.get('/get-payment',  getPayments)
paymentRouter.get("/paymentcategory",getPaymentCategories)

module.exports = paymentRouter;
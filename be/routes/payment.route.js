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
const { getPaymentCategories } = require('../controllers/admin.controller');

paymentRouter.use(authMiddleware);

paymentRouter.post("/create-order", createOrder)
paymentRouter.post("/record-payment", recordPayment)
paymentRouter.post('/create-payment',  createPayment)
paymentRouter.get('/get-payment',  getPayments)
paymentRouter.get("/paymentcategory",getPaymentCategories)

module.exports = paymentRouter;
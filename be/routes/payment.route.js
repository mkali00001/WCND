const express = require('express');
const paymentRouter = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createPayment,
  getPayments,
  createOrder,
  recordPayment,
  getPaymentCategorie,
  getMyPayment,
  generateInvoice,
  downloadInvoice,
} = require('../controllers/payment.controller');


paymentRouter.use(authMiddleware);


paymentRouter.post('/create-order', createOrder);
paymentRouter.post('/record-payment', recordPayment);
paymentRouter.post('/create-payment', createPayment);
paymentRouter.get('/get-payment', getPayments);
paymentRouter.get('/my-payment', getMyPayment);
paymentRouter.post('/invoice', generateInvoice);
paymentRouter.get('/download-invoice', downloadInvoice);

module.exports = paymentRouter;

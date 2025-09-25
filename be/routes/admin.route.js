const express = require('express');
const adminRouter = express.Router();

const {
  users,
  deleteUser,
  editUser,
  get_payment_status,
  createPaymentCategory,
  getPaymentCategories,
  deletePaymentCategory,
  updatePaymentCategory,
} = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

adminRouter.use(authMiddleware, roleMiddleware(['admin']));

adminRouter.patch('/edit-user/:id', editUser);
adminRouter.get('/users', users);
adminRouter.delete('/delete-user/:id', deleteUser);
adminRouter.get('/paymentstatus', get_payment_status);

adminRouter.get('/paymentcategory', getPaymentCategories);
adminRouter.patch('/updatepaymentcategory/:id', updatePaymentCategory);
adminRouter.delete('/deletepaymentcategory/:id', deletePaymentCategory);
adminRouter.post('/createpaymentcategory', createPaymentCategory);

module.exports = adminRouter;

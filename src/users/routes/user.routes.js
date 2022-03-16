const router = require('express').Router();
const isAuthoraized = require('../../../common/middelware/isAuthoraized');
const validateRequest = require('../../../common/middelware/validateRequest');
const upload = require('../../../common/services/uploadFile');
const { getUsersHandelr, getAdminsHandelr, signUpHandelr, signInHandelr, updateUserHandelr, deleteAdminHandelr, deactAccount, verifyHandlr, getUsersByIdHandelr, getAllUsersHandelr, updatePassHandelr, forgetPassHandelr, deletHandelr, blockUserHandelr, addAdminHandelr, updateImageHandelr } = require('../controller/user.controller');
const { ADD_ADMIN, GET_ALL_USERS, DELETE_ADMIN, GET_ALL_ADMINS, BLOCK_USER } = require('../endPoints');
const { signUpSchema, signInSchema, updateUserSchema, updatePassSchema, updateImageSchema } = require('../joi/userValidation');

router.get('/users', isAuthoraized(GET_ALL_USERS), getUsersHandelr);
router.get('/users/:_id', isAuthoraized(GET_ALL_USERS), getUsersByIdHandelr);
router.get('/admins', isAuthoraized(GET_ALL_ADMINS), getAdminsHandelr);
router.get('/verify/:token', verifyHandlr);
router.post('/signUp', validateRequest(signUpSchema), signUpHandelr);
router.post('/auth', validateRequest(signInSchema), signInHandelr);
router.put('/users', validateRequest(updateUserSchema), updateUserHandelr);
router.delete('/admin/:_id', isAuthoraized(DELETE_ADMIN), deleteAdminHandelr);
router.patch('/users/deactAccount', deactAccount);
router.get('/getUsers', getAllUsersHandelr);
router.patch('/passowrd', validateRequest(updatePassSchema), updatePassHandelr);
router.post('/users/forgetPassword', forgetPassHandelr);
router.post('/users/delete', deletHandelr);
router.patch('/users/blockUser', isAuthoraized(BLOCK_USER), blockUserHandelr);
router.post('/addAdmin', isAuthoraized(ADD_ADMIN), validateRequest(signUpSchema), addAdminHandelr);
router.patch('/userImage', upload.single("userImage"), validateRequest(updateImageSchema), updateImageHandelr);

module.exports = router;
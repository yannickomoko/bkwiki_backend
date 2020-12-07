const express = require('express');
const router = express.Router(); 
const {loggedIn, adminOnly} = require("../helpers/auth.middleware");
const {checkToken} = require('../helpers/token_validation');
const userController = require('../controllers/user.controller');
const agenController = require('../controllers/agence.controller');
 
// Register a new User
router.post('/register',checkToken, userController.register);
router.post('/login', checkToken,  userController.login);
router.get('/authuseronly', loggedIn, userController.authuseronly);
router.get('/adminonly', loggedIn, adminOnly, userController.adminonly);
router.get('/get-all-agences', checkToken,  agenController.getAllagences);
router.get('/getIdAgence/:id', checkToken,  agenController.getID);
router.get('/getAllTypeCredit', checkToken,  agenController.getAllTypeCredit);
router.get('/getTypeCredit/:id', checkToken, agenController.getTypeCredit);
router.get('/getAllTypeCompte', checkToken, agenController.getAllTypeCompte);
router.get('/getTypeCompte/:id', checkToken, agenController.getTypeCompte);

router.get('/getAllClients', checkToken, agenController.getClients);
router.get('/getClients/:phone', checkToken,  agenController.getCltInfo);

module.exports = router;